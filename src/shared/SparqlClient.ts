import QueryDispatcher from "./QueryDispatcher";

export class SparqlClient {
    queryDispatcher: QueryDispatcher

    constructor() {
        this.queryDispatcher = new QueryDispatcher();
    }

    async query(query: string) {
        return this.queryDispatcher.query(query);
    }

}