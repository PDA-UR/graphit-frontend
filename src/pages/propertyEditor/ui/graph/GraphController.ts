import { ElementDefinition } from "cytoscape";
import { GraphModel } from "./GraphModel";
import { GraphView } from "./GraphView";
import dagre from "cytoscape-dagre";
import { eventBus } from "../../events/EventBus";
import { ToolbarViewControllerEvents } from "../toolbar/ToolbarController";

export class GraphController {
	private readonly graphView: GraphView;
	private readonly graphModel: GraphModel;

	constructor(elements: ElementDefinition[]) {
		this.graphModel = elements;
		this.graphView = new GraphView(
			this.graphModel,
			document.getElementById("app")!,
			{
				extensions: [dagre],
			}
		);

		eventBus.addListener(
			ToolbarViewControllerEvents.SWITCH_TOOL,
			this.switchTool
		);
	}

	private switchTool = (tool: string) => {
		console.log("switch to:", tool);
	};
}
