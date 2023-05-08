import cytoscape from "cytoscape";
import QueryDispatcher from "../../shared/sparql/QueryDispatcher";
import WikibaseClient from "../../shared/WikibaseClient";
import { GraphController } from "./graph/GraphController";

import "./style.css";

async function main() {
	console.log("main");
	const wikibase = new WikibaseClient();
	const elements = await wikibase.getDependentsAndDependencies();
	console.log(elements);

	const graphController = new GraphController(elements);
}

main();
