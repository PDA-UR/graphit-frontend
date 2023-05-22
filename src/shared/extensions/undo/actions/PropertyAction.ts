import { Core } from "cytoscape";
import { Action } from "./Action";
import { WikibaseAction } from "./WikibaseAction";
import { CompositeAction } from "./CompositeAction";
import { EditPropertyAction } from "./EditPropertyAction";

export abstract class PropertyAction extends WikibaseAction {
	protected readonly cy: Core;
	protected readonly elementId: string;
	protected readonly propertyName: string;

	constructor(cy: any, elementId: string, propertyName: string) {
		super();
		this.cy = cy;
		this.elementId = elementId;
		this.propertyName = propertyName;
	}

	isOverriddenBy(action: Action): boolean {
		if (!(action instanceof PropertyAction)) {
			return false;
		}
		return (
			this.elementId === action.elementId &&
			this.propertyName === action.propertyName
		);
	}

	getWikibaseAction() {
		throw new Error("Method not implemented.");
	}

	merge(action: Action): CompositeAction | Action {
		if (this.isOverriddenBy(action)) {
			return action;
		}
		return new CompositeAction([this, action]);
	}
}