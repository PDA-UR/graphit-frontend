import "./style.css";
import cytoscape from "cytoscape";

console.log("Hello World!");

const app = document.getElementById("app");

const elements = [
	// List of graph-elements to start with (json)
	// NODES
	{ data: { id: "a" } }, // node a
	{ data: { id: "b" } }, // node b
	// EDGES
	{ data: { id: "ab", source: "a", target: "b" } }, // edge ab
];

cytoscape({ elements: elements, container: app });
