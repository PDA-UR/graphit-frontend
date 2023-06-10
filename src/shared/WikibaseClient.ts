import { ElementDefinition } from "cytoscape";
import type { SparqlResults } from "wikibase-sdk";
import wbEdit from "wikibase-edit-browser";

import { SparqlClient } from "./sparql/SparqlClient";
import { SparqlParser } from "./sparql/SparqlParser";
import { Credentials, wikibaseEditConfig } from "./WikibaseEditConfig";
import { getEnvVar } from "./util/Env";

export default class WikibaseClient {
	private readonly sparqlClient: SparqlClient;
	private readonly sparqlParser: SparqlParser;
	private readonly credentials: Credentials;

	readonly edit: any;

	constructor(credentials: Credentials) {
		this.credentials = credentials;
		this.sparqlClient = new SparqlClient();
		this.sparqlParser = new SparqlParser();
		this.edit = wbEdit(wikibaseEditConfig(this.credentials));
	}

	async hasValidCredentials(): Promise<boolean> {
		try {
			const getAuthData = await this.edit.getAuthData(),
				authData = await getAuthData();
			console.log("getAuthData", getAuthData);
			return true;
		} catch (error) {
			console.log("error", error);
			return false;
		}
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

	async getWikibasePageContent(title: string): Promise<string> {
		const wikibaseInstanceUrl = getEnvVar("VITE_WIKIBASE_INSTANCE");

		const urlParams = new URLSearchParams({
			action: "parse",
			page: title,
			prop: "wikitext",
			formatversion: "2",
			origin: window.location.origin,
			format: "json",
		});

		const url = `${wikibaseInstanceUrl}/api.php?${urlParams.toString()}`;

		try {
			const response = await fetch(url);
			const json = await response.json();
			return json.parse.wikitext;
		} catch (error) {
			console.log("error", error);
			return Promise.reject(error);
		}
	}

	async parseUserItemId(userPageContent: string): Promise<string> {
		const regex = /\[\[Item:Q\d+(\|.*)?\]\]/g;

		console.log("htmlUserPage", userPageContent);
		const matches = userPageContent.match(regex);
		if (matches) {
			console.log("matches", matches);
			const userId = matches[0]
				.replace("[[Item:", "")
				.replace("]]", "")
				// remove alias if present
				.split("|")[0];
			return userId;
		}

		return "";
	}

	async getUserInfo(): Promise<any> {
		const htmlUserPage = await this.getWikibasePageContent(
			"User:" + this.credentials.username
		);
		const userItemId = await this.parseUserItemId(htmlUserPage);
		return {
			...this.credentials,
			userItemId,
		};
	}
}
