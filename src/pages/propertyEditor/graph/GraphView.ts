import { GraphModel } from "./GraphModel";
import cytoscape from "cytoscape";

export interface GraphViewOptions extends cytoscape.CytoscapeOptions {
	extensions?: any[];
}

const DEFAULT_OPTIONS: GraphViewOptions = {
	layout: {
		name: "dagre",
	},
	style: [
		{
			selector: "node",
			style: {
				"background-color": "#666",
				label: "data(label)",
			},
		},
		{
			selector: "edge",
			style: {
				width: 3,
				"line-color": "#ccc",
				"target-arrow-color": "#ccc",
				"target-arrow-shape": "triangle",
				"curve-style": "bezier",
			},
		},
	],
};

export class GraphView {
	private readonly graph: GraphModel;
	private readonly graphContainer: HTMLElement;
	private readonly cy: any;

	constructor(
		graph: GraphModel,
		container: HTMLElement,
		options: GraphViewOptions
	) {
		this.graph = graph;
		this.graphContainer = container;

		if (options.extensions) {
			this.loadExtensions(options.extensions);
		}

		this.cy = cytoscape({
			container: this.graphContainer,
			elements: this.graph,
			...DEFAULT_OPTIONS,
			...options,
		});
	}

	private loadExtensions(extensions: any[]) {
		extensions.forEach((extension) => {
			cytoscape.use(extension);
		});
	}
}
