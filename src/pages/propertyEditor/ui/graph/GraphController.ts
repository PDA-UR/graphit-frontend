import { ElementDefinition } from "cytoscape";
import { GraphModel } from "./GraphModel";
import { GraphView, GraphViewEvents } from "./GraphView";
import { eventBus } from "../../global/EventBus";
import { ToolbarViewControllerEvents } from "../toolbar/ToolbarController";
import { DEFAULT_TOOL, Tool } from "../toolbar/ToolbarModel";

import dagre from "cytoscape-dagre";
import nodeHtmlLabel from "cytoscape-node-html-label";
import {
	PropertyEditAction,
	PropertyModalControllerEvents,
} from "../propertyModal/PropertyModalController";
import lasso from "../../../../shared/extensions/lasso-rectangle/lasso";
import undo from "../../../../shared/extensions/undo/undo";
import { EditPropertyAction } from "../../../../shared/extensions/undo/actions/EditPropertyAction";
import { CompositeAction } from "../../../../shared/extensions/undo/actions/CompositeAction";
import { TogglePropertyAction } from "../../../../shared/extensions/undo/actions/TogglePropertyAction";

export class GraphController {
	private readonly graphView: GraphView;
	private readonly graphModel: GraphModel;

	constructor(elements: ElementDefinition[]) {
		console.log("GraphController");
		this.graphModel = elements;
		this.graphView = new GraphView(
			this.graphModel,
			document.getElementById("app")!,
			{
				extensions: [dagre, nodeHtmlLabel, lasso, undo],
			}
		);

		console.log("GraphController done view");
		this.switchTool(DEFAULT_TOOL);

		this.graphView.addListener(
			GraphViewEvents.SELECTION_CHANGED,
			this.onSelectionChanged
		);

		eventBus.addListener(
			ToolbarViewControllerEvents.SWITCH_TOOL,
			this.switchTool
		);

		eventBus.addListener(
			PropertyModalControllerEvents.EDIT_PROPERTY_ACTION_CLICKED,
			this.onEditPropertyActionClicked
		);
		console.log("GraphController done");

		// listen to z key
		document.addEventListener("keydown", (event) => {
			if (event.key === "z") {
				console.log("undo");
				this.graphView.undo();
			}
			if (event.key === "y") {
				console.log("redo");
				this.graphView.redo();
			}
		});
	}

	private switchTool = (tool: string) => {
		switch (tool) {
			case Tool.GRAB:
				this.graphView.setGrabMode();
				break;
			case Tool.MOUSE:
				this.graphView.setMouseMode();
				break;
		}
	};

	private onEditPropertyActionClicked = (action: PropertyEditAction) => {
		console.log(action);
		if (action === PropertyEditAction.COMPLETE) {
			const selectedNodes = this.graphView.getSelectedNodes(),
				selectedNodeIds = selectedNodes.map((node) => node.id()),
				propertyName = "completed",
				cy = this.graphView.getCy(),
				actions = selectedNodeIds.map((nodeId) => {
					return new TogglePropertyAction(cy, nodeId, propertyName, [
						"true",
						"false",
					]);
				}),
				compositeAction = new CompositeAction(actions);

			this.graphView.do(compositeAction);
		}
	};

	private onSelectionChanged = (selectionCount: number) => {
		console.log("CHANGED to ", selectionCount);
		if (selectionCount === 0)
			eventBus.emit(
				PropertyModalControllerEvents.SET_PROPERTY_MODAL_VISIBILITY,
				false
			);
		else
			eventBus.emit(
				PropertyModalControllerEvents.SET_PROPERTY_MODAL_VISIBILITY,
				true
			);
	};
}
