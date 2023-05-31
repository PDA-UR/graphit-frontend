import "./style.css";
import WikibaseClient from "../../shared/WikibaseClient";
import { MainViz } from "./vis/MainViz";

async function main() {
	const wikibase = new WikibaseClient();
	const elements = await wikibase.getDependentsAndDependencies();

	//await sleep(3000);

	console.log("elements;", elements[0]);

	//console.log(typeof(elements[0].data.nodeClassLabel));

	if(elements){
		elements.forEach((element:any) => {
			//element.data.parent = element.data.parent.value
			console.log("PP", element.data.nodeClassLabel);
			element.data.parent = "Test";
			console.log("PARENT:", element.data.parent);
			element.data.parent1 = "Test1";
			element.data.parent = "Test3";

			//element.data.parent = "Category";
			element.data.test = "Test";
			//element.data.category = element.data.nodeClassLabel
			//console.log(element.data.parent);

			//delete Object.assign(element.data, {parent: element.data.nodeClassLabel})['nodeClassLabel'];
			//Funktioniert für element (= parent ist außerhalb data)
			//console.log("parent:", element.data.parent);

		});
	}
	
	console.log(elements[0]);

    const mainViz = new MainViz(elements);
	
}

main();

function sleep(milis:any) {
	return new Promise(resolve => setTimeout(resolve, milis))	
}

// NOTE: evtl. wird parent später überschrieben? -> in cy?