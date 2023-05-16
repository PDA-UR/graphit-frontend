import "./style.css";
import WikibaseClient from "../../shared/WikibaseClient";
import { MainViz } from "./vis/MainViz";


async function main() {
	const wikibase = new WikibaseClient();
	const elements = await wikibase.getDependentsAndDependencies();
    const mainViz = new MainViz(elements);
	
}

main();

