import { ElementDefinition } from "cytoscape";
import { GraphModel } from "./GraphModel";
import { GraphView } from "./GraphView";
import { eventBus } from "../../events/EventBus";
import { ToolbarViewControllerEvents } from "../toolbar/ToolbarController";
import { DEFAULT_TOOL, Tool } from "../toolbar/ToolbarModel";

import dagre from "cytoscape-dagre";
import nodeHtmlLabel from "cytoscape-node-html-label";

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

		eventBus.addListener(
			ToolbarViewControllerEvents.SWITCH_TOOL,
			this.switchTool
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
}
