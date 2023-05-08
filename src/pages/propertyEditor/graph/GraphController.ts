import { ElementDefinition } from "cytoscape";
import { GraphModel } from "./GraphModel";
import { GraphView } from "./GraphView";
import dagre from "cytoscape-dagre";

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
	}
}
