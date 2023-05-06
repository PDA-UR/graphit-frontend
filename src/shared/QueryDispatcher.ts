
import { WBK } from 'wikibase-sdk'

// Dont use this class directly, use the SparqlClient class instead

export default class QueryDispatcher {
	instance = 'https://graphit.ur.de'
    endpoint = 'https://query.graphit.ur.de/proxy/wdqs/bigdata/namespace/wdq/sparql'

    wbk = WBK({
        sparqlEndpoint: this.endpoint,
        instance: this.instance
    });

	async query(sparql: string) {
		const url = this.wbk.sparqlQuery(sparql);
        const headers = {}; 
        
        const response = await fetch(url, { headers });
        const data = await response.json();
        return data;
    }
}
