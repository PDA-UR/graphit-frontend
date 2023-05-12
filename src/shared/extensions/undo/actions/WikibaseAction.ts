import { Action } from "./Action";

export abstract class WikibaseAction extends Action {
	abstract getWikibaseAction(): any;
}
