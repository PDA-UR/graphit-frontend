import WikibaseClient from "../../shared/WikibaseClient";
import { GraphController } from "./ui/graph/GraphController";

import "./style.css";
import { ToolbarViewController } from "./ui/toolbar/ToolbarController";
import { PropertyModalController } from "./ui/propertyModal/PropertyModalController";

async function main() {
	console.log("main");
	const wikibase = new WikibaseClient();
	const elements = await wikibase.getDependentsAndDependencies();
	console.log(elements);
	const propertyModalController = new PropertyModalController();
	const toolbarController = new ToolbarViewController();
	const graphController = new GraphController(elements);
}

main();
