import { Wbk, WBK } from "wikibase-sdk";
import type { SparqlResults } from "wikibase-sdk";

// Dont use this class directly, use the SparqlClient class instead

export default class QueryDispatcher {
	private readonly instance = "https://graphit.ur.de";
	private readonly endpoint =
		"https://query.graphit.ur.de/proxy/wdqs/bigdata/namespace/wdq/sparql";

	private readonly wbk: Wbk;

	constructor() {
		console.log("QueryDispatcher constructor");
		this.wbk = WBK({
			sparqlEndpoint: this.endpoint,
			instance: this.instance,
		});
	}

	async query(sparql: string): Promise<SparqlResults> {
		const url = this.wbk.sparqlQuery(sparql);
		const headers = {};

		const response = await fetch(url, { headers });
		const data = await response.json();
		return data;
	}
}
