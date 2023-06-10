import WikibaseClient from "../../../WikibaseClient";
import { EditAction } from "../other/EditAction";
import { Action } from "./Action";
import { CompositeAction } from "./CompositeAction";

export abstract class WikibaseAction extends Action {
	abstract getEditAction(client: WikibaseClient): EditAction;
	abstract merge(
		action: Action
	): CompositeAction<WikibaseAction> | WikibaseAction;
}
