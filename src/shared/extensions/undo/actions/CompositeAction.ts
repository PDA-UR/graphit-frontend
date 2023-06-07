import { Action } from "./Action";
import { WikibaseAction } from "./WikibaseAction";

export class CompositeAction<T extends Action> extends Action {
	private readonly actions: T[];

	constructor(actions: T[]) {
		super();
		this.actions = actions;
	}

	do(): void {
		this.actions.forEach((a) => a.do());
	}

	undo(): void {
		this.actions.forEach((a) => a.undo());
	}

	merge<A extends Action>(
		action: A
	): A extends WikibaseAction
		? CompositeAction<WikibaseAction> | Action
		: never {
		if (this.canMerge(action)) {
			const actions =
				action instanceof CompositeAction
					? [...action.actions, ...this.actions]
					: [action, ...this.actions];
			return actions.reduce(
				(acc, a) => acc.merge(a),
				new CompositeAction([])
			) as any;
		}
		throw new Error("Cannot merge this action");
	}

	private canMerge<A extends Action>(
		action: A
	): action is A extends WikibaseAction ? A : never {
		return action instanceof WikibaseAction;
	}
}
