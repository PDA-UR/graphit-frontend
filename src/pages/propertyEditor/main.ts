import { GraphController } from "./ui/graph/GraphController";

import "./style.css";
import { ToolbarViewController } from "./ui/toolbar/ToolbarController";
import { PropertyModalController } from "./ui/propertyModal/PropertyModalController";
import WikibaseClient from "../../shared/WikibaseClient";
import { state } from "./global/State";
import { getCredentials } from "../../shared/util/GetCredentials";

async function main() {
	const credentials = getCredentials();
	console.log(credentials);
	const wikibase = new WikibaseClient(credentials);
	const hasValidCredentials = await wikibase.hasValidCredentials();
	if (!hasValidCredentials) {
		console.error("no valid credentials!");
		return;
	}
	const elements = await wikibase.getDependentsAndDependencies();
	const propertyModalController = new PropertyModalController();
	const toolbarController = new ToolbarViewController();
	const graphController = new GraphController(elements);

	wikibase.getUserInfo().then((userInfo) => {
		console.log("userInfo", userInfo);
	});
}

state.init();
main();
