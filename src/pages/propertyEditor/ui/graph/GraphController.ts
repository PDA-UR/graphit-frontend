import { ElementDefinition } from "cytoscape";
import { GraphModel } from "./GraphModel";
import { GraphView, GraphViewEvents } from "./GraphView";
import { eventBus } from "../../events/EventBus";
import { ToolbarViewControllerEvents } from "../toolbar/ToolbarController";
import { DEFAULT_TOOL, Tool } from "../toolbar/ToolbarModel";

import dagre from "cytoscape-dagre";
import nodeHtmlLabel from "cytoscape-node-html-label";
import {
	PropertyEditAction,
	PropertyModalControllerEvents,
} from "../propertyModal/PropertyModalController";

export class GraphController {
	private readonly graphView: GraphView;
	private readonly graphModel: GraphModel;

	constructor(elements: ElementDefinition[]) {
		this.graphModel = elements;
		this.graphView = new GraphView(
			this.graphModel,
			document.getElementById("app")!,
			{
				extensions: [dagre, nodeHtmlLabel],
			}
		);

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
