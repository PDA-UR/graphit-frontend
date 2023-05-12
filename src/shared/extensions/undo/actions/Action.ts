export abstract class Action {
	abstract do(): void;

	abstract undo(): void;

	abstract isOverriddenBy(action: Action): boolean;
}
