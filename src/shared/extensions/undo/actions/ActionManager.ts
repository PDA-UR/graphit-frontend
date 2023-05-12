import { Action } from "./Action";

export class ActionManager {
	private readonly undoStack: Action[] = [];
	private readonly redoStack: Action[] = [];

	do(action: Action): void {
		action.do();
		this.undoStack.push(action);
		this.redoStack.length = 0;
	}

	undo(): Action | null {
		if (this.undoStack.length === 0) return null;
		const action = this.undoStack.pop() as Action;
		action.undo();
		this.redoStack.push(action);
		return action;
	}

	redo(): Action | null {
		if (this.redoStack.length === 0) return null;
		const action = this.redoStack.pop() as Action;
		action.do();
		this.undoStack.push(action);
		return action;
	}

	compressUndoStack(): void {
		const sumWithInitial = this.undoStack
			.reverse()
			.reduce(this.compressReducer, []);
	}

	private compressReducer(acc: Action[], action: Action): Action[] {
		// only add an action if it is not overridden by any of the previous actions
		if (!acc.some((a) => a.isOverriddenBy(action))) {
			acc.push(action);
		}
		return acc;
	}

	getUndoStack(): Action[] {
		return this.undoStack;
	}

	getRedoStack(): Action[] {
		return this.redoStack;
	}
}
