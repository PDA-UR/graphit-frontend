import { CompositeAction } from "./CompositeAction";

export abstract class Action {
	abstract do(): void;

	abstract undo(): void;

	abstract merge(action: Action): CompositeAction | Action;
}
