import { Action } from "./Action";
import { CompositeAction } from "./CompositeAction";

export abstract class WikibaseAction extends Action {
	abstract getWikibaseAction(): any;
	abstract merge(
		action: Action
	): CompositeAction<WikibaseAction> | WikibaseAction;
}
