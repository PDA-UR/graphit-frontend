import { Action } from "./Action";

export class CompositeAction extends Action {
	private readonly actions: Action[];

	constructor(actions: Action[]) {
		super();
		this.actions = actions;
	}

	do(): void {
		this.actions.forEach((a) => a.do());
	}

	undo(): void {
		this.actions.forEach((a) => a.undo());
	}

	merge(action: Action): CompositeAction | Action {
		const actions =
			action instanceof CompositeAction
				? [...action.actions, ...this.actions]
				: [action, ...this.actions];
		return actions.reduce((acc, a) => acc.merge(a), new CompositeAction([]));
	}
}
