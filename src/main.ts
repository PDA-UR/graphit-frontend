import "./style.css";
import cytoscape from "cytoscape";
import { WBK } from "wikibase-sdk"; //query wikibase instance and simplify results
	// siehe: https://github.com/maxlath/wikibase-sdk#wikibase-query

//import testData from "./data/query-test-streets.json"
import testData from "./data/data.json";
import {parseWikiData} from "./wikiParser";


// ---------- FETCH DATA FROM WIKIBASE USING WIKIBASE-SDK ---------------------------
// TODO: -> try with wikibase-sdk -> can simplify results

// init wbk with sparql-endpoint
const wbk = WBK({
	instance:'https://graphit.ur.de',
	//sparqlEndpoint: 'https://query.graphit.ur.de/proxy/wdqs/bigdata/namespace/wdq/sparql'
	sparqlEndpoint: 'https://query.graphit.ur.de/sparql'
});

// https://github.com/maxlath/wikibase-sdk/blob/main/docs/sparql_query.md
const sparql = ` PREFIX grt: <https://graphit.ur.de/prop/direct/>
SELECT ?item ?itemLabel ?class ?classLabel ?image ?dependency ?dependencyLabel WHERE {
	?item grt:P1 ?dependency.
	?item grt:P2 ?class
	OPTIONAL{ ?item grt:P9 ?image.}
	OPTIONAL{ ?class grt:P9 ?image.}
	SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}`;
// USER-AGENT: https://meta.wikimedia.org/wiki/User-Agent_policy
const url = wbk.sparqlQuery(sparql);
/*const headers = {"User-Agent"; "<User-Agernt INFO"};
request({method: 'GET', url, headers});*/
//SIMPLIYFY RESULTS:
//const simpleRes = wbk.simplify.sparqlResults(results);

// https://github.com/maxlath/wikibase-sdk/blob/main/docs/simplify_sparql_results.md 
/*const simplifiedResults = await fetch(url)
	.then(res => res.text())
	.then(wbk.simplify.sparqlResults);
console.log(simplifiedResults); */


// -------------------------------------------

//FUNKTIONIERT
class SPARQLQueryDispatcher {
	constructor( endpoint ) {
		this.endpoint = endpoint;
	}

	query( sparqlQuery ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
	}
}

const endpointUrl = 'https://query.graphit.ur.de/proxy/wdqs/bigdata/namespace/wdq/sparql';
const sparqlQuery = `#defaultView:Graph
PREFIX grt: <https://graphit.ur.de/prop/direct/>
SELECT ?item ?itemLabel ?class ?classLabel ?image ?dependency ?dependencyLabel WHERE {
  ?item grt:P1 ?dependency.
  ?item grt:P2 ?class
  OPTIONAL{ ?item grt:P9 ?image.}
  OPTIONAL{ ?class grt:P9 ?image.}
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}`;

// For Testing -> https://stackoverflow.com/questions/34156282/how-do-i-save-json-to-local-text-file
function saveDataAsJson(data){
	const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {
    type: "json"
  }));
  a.setAttribute("download", "data.json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// CHECK IF GETTING DATA IS NECESSARY
var needUpdate = false; // get new DataUpdate from Wikibase
var saveAsJson = false; // save Wikibase Data as JSON
var parsedData;
const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
if(saveAsJson) {
	queryDispatcher.query( sparqlQuery ).then(saveDataAsJson); 
} else if (needUpdate) {
	parsedData = queryDispatcher.query( sparqlQuery ).then(parseWikiData);
} else {
	console.log("Data is up to date :)");
	// Use Data from json-File
	parsedData = parseWikiData(testData);
}




// ------------- CYTOSCAPE --------------

const app = document.getElementById("app");
console.log("parsedData:", parsedData);

cytoscape({ 
	elements: parsedData, 
	container: app,
	style: [{
			selector: 'node',
			style: {
				'label': 'data(id)',
				'text-background-color': 'white',
				'text-background-shape': 'rectangle',
				'text-background-opacity': '1',
				'padding': '10px',
				'width': function(el){
					return Math.max(1, Math.ceil(el.connectedEdges().size()/2)) *10;
				},
				'height': function(el){
					return Math.max(1, Math.ceil(el.connectedEdges().size()/2)) *10;
				}
			}
		}, {
			selector: 'edge',
			style: {
				'target-arrow-shape': 'triangle',
				'curve-style': 'straight',
			}
		}
	],
	layout: {
		name: 'cose',
		nodeRepulsion: 4500,
		idealEdgeLength: 50,

	}
});
