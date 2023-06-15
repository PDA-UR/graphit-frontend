import { ElementDefinition } from "cytoscape";
import type { SparqlResults } from "wikibase-sdk";

import { SparqlClient } from "./sparql/SparqlClient";
import { SparqlParser } from "./sparql/SparqlParser";

export default class WikibaseClient {
	private readonly sparqlClient: SparqlClient;
	private readonly sparqlParser: SparqlParser;

	constructor() {
		this.sparqlClient = new SparqlClient();
		this.sparqlParser = new SparqlParser();
	}

	async query(query: string): Promise<SparqlResults> {
		const results = await this.sparqlClient.query(query);
		return results;
	}

	async getDependentsAndDependencies(): Promise<ElementDefinition[]> {
		const results = await this.sparqlClient.getDependentsAndDependencies();
		// get categories
		//const categories = await this.sparqlClient.getCategories();
		// console.log("Client-results ", results);
		const graph = this.sparqlParser.parsePairs(
			["source", "dependency"],
			"depends on",
			results
		);
		// console.log("graph", graph);
		// HIER: categorys parsen + zu graph hinzufügen
		// hier: checken, dass parent gesetzt wird, bevor es weitergeht?

		return graph;
	}

	async getCategories(): Promise<ElementDefinition[]> {
		const results = await this.sparqlClient.getCategories();
		const parents = this.sparqlParser.parseParents(results);
		return parents;
	}

}
