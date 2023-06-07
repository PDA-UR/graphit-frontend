import { ElementDefinition } from "cytoscape";
import type { SparqlResults } from "wikibase-sdk";
import wbEdit from "wikibase-edit-browser";

import { SparqlClient } from "./sparql/SparqlClient";
import { SparqlParser } from "./sparql/SparqlParser";
import { Credentials, wikibaseEditConfig } from "./WikibaseEditConfig";

export default class WikibaseClient {
	private readonly sparqlClient: SparqlClient;
	private readonly sparqlParser: SparqlParser;

	readonly edit: any;

	constructor(credentials: Credentials) {
		this.sparqlClient = new SparqlClient();
		this.sparqlParser = new SparqlParser();
		const config = wikibaseEditConfig(credentials);
		this.edit = wbEdit(config);
	}

	async query(query: string): Promise<SparqlResults> {
		const results = await this.sparqlClient.query(query);
		return results;
	}

	async getDependentsAndDependencies(): Promise<ElementDefinition[]> {
		const results = await this.sparqlClient.getDependentsAndDependencies();
		const graph = this.sparqlParser.parsePairs(
			["source", "dependency"],
			"depends on",
			results
		);
		return graph;
	}
}
