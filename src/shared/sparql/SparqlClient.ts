import QueryDispatcher from "./QueryDispatcher";
import type { SparqlResults } from "wikibase-sdk";
import { dependentsAndDependenciesQuery } from "./SparqlQueries";

export class SparqlClient {
	private readonly queryDispatcher: QueryDispatcher;

	constructor() {
		this.queryDispatcher = new QueryDispatcher();
	}

	async query(query: string): Promise<SparqlResults> {
		return this.queryDispatcher.query(query);
	}

	// ~~~~~~~~~~ Pre built queries: ~~~~~~~~~ //

	async getDependentsAndDependencies(): Promise<SparqlResults> {
		const query = dependentsAndDependenciesQuery();
		return this.query(query);
	}
}
