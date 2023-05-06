import { ElementDefinition } from "cytoscape";
import type { SparqlResults } from "wikibase-sdk";

import { SparqlClient } from "./SparqlClient";
import { SparqlParser } from "./SparqlParser";

export default class WikibaseClient {
	private readonly sparqlClient: SparqlClient;
	private readonly sparqlParser: SparqlParser;

	constructor() {
		this.sparqlClient = new SparqlClient();
		this.sparqlParser = new SparqlParser();
	}

	async query(query: string): Promise<ElementDefinition[]> {
		const results = await this.sparqlClient.query(query);
		const graph = this.sparqlParser.parsePairs(
			["source", "dependency"],
			"depends on",
			results
		);
		return graph;
	}
}
