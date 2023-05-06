import QueryDispatcher from "./QueryDispatcher";
import type {SparqlResults} from 'wikibase-sdk';

export class SparqlClient {
    private readonly queryDispatcher: QueryDispatcher

    constructor() {
        this.queryDispatcher = new QueryDispatcher();
    }

    async query(query: string): Promise<SparqlResults> {
        return this.queryDispatcher.query(query);
    }

    // ~~~~~~~~~~ Pre built queries: ~~~~~~~~~ //

    async getAll(): Promise<SparqlResults> {
        const query = `#defaultView:Graph
            PREFIX wdt: <https://graphit.ur.de/prop/direct/>
            SELECT ?item ?itemLabel ?class ?classLabel ?image ?dependency ?dependencyLabel WHERE {
            ?item wdt:P1 ?dependency.
            ?item wdt:P2 ?class
            OPTIONAL{ ?item wdt:P9 ?image.}
            OPTIONAL{ ?class wdt:P9 ?image.}
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
            }`;
        return this.query(query);
    }
}