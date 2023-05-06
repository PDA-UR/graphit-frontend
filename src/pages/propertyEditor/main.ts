import cytoscape from "cytoscape";
import QueryDispatcher from "../../shared/sparql/QueryDispatcher";
// import WikibaseClient from "../../shared/WikibaseClient";

import "./style.css";

async function main() {
	console.log("main");
	// const wikibase = new WikibaseClient();
	const q = new QueryDispatcher();
	// const elements = await wikibase.getDependentsAndDependencies();
	// console.log(elements);
	// const cy = cytoscape({
	// 	container: document.getElementById("app"),
	// 	elements: elements,
	// });
}

main();
