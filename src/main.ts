import "./style.css";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
// import the data

cytoscape.use(dagre);

import concepts from "./data/concepts-merged.json";
import relations0 from "./data/relations-merged-0.json";
import relations1 from "./data/relations-merged-1.json";
import relations2 from "./data/relations-merged-2.json";

const mergedRelations = [...relations0, ...relations1, ...relations2];
// remove all the duplicates
const relations = mergedRelations.filter(
	(item, index) => mergedRelations.indexOf(item) === index
);

console.log("concepts", concepts);
console.log("relations", relations);

const nodes = Object.keys(concepts).map((key) => {
	const id = key,
		labels = concepts[key]! as string[],
		label = labels.join(", ");
	return {
		data: {
			id,
			label,
		},
	};
});

const edges = relations.map((relation) => {
	const source = relation.concept,
		target = relation.requires,
		type = "requires";

	return {
		data: {
			source,
			target,
			type,
		},
	};
});

const graph = [...nodes, ...edges];

const app = document.getElementById("app");
const style = [
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
];

// create a hierarchical graph that shows the labels of nodes
const cy = cytoscape({
	container: app,
	elements: graph,
	style,
	layout: {
		name: "dagre",
	},
});
