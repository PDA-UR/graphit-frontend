import "./style.css";
import WikibaseClient from "../../shared/WikibaseClient";
import { MainViz } from "./vis/MainViz";

async function main() {
	const wikibase = new WikibaseClient();
	const elements = await wikibase.getDependentsAndDependencies();
	const parents = await wikibase.getCategories();
	// TODO: make more dynamic for different layouts
	const graph = parents.concat(elements);
	
	//console.log(graph);

	// PROBLEM: cy setzt parent-value auf undefined, wenn ein solcher id nicht existiert
	// -> SOLVED
    const mainViz = new MainViz(graph);
	
}

main();

function sleep(milis:any) {
	return new Promise(resolve => setTimeout(resolve, milis))	
}