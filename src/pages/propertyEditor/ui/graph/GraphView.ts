import { GraphModel } from "./GraphModel";
import cytoscape from "cytoscape";
import { View } from "../../../../shared/ui/View";

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

export class GraphView extends View {
	private readonly cy: any;

	private readonly $container: HTMLElement;

	constructor(
		model: GraphModel,
		$container: HTMLElement,
		options: GraphViewOptions
	) {
		super();

		if (options.extensions) {
			this.loadExtensions(options.extensions);
		}
		this.$container = $container;
		this.cy = cytoscape({
			container: this.$container,
			elements: model,
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
