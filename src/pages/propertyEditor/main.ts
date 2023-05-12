import { GraphController } from "./ui/graph/GraphController";

import "./style.css";
import { ToolbarViewController } from "./ui/toolbar/ToolbarController";
import { PropertyModalController } from "./ui/propertyModal/PropertyModalController";
import WikibaseClient from "../../shared/WikibaseClient";
import { state } from "./global/State";

async function main() {
	const wikibase = new WikibaseClient();
	const elements = await wikibase.getDependentsAndDependencies();
	console.log("property modal controller!");
	const propertyModalController = new PropertyModalController();
	console.log("toolbar controller!");
	const toolbarController = new ToolbarViewController();
	console.log("graph controller!");
	const graphController = new GraphController(elements);
}

state.init();
main();
