import { Core } from "cytoscape";
import { Action } from "./Action";
import { WikibaseAction } from "./WikibaseAction";

export class EditPropertyAction extends WikibaseAction {
	private readonly cy: Core;
	private readonly elementId: string;
	private readonly propertyName: string;
	private readonly newValue: any;
	private readonly oldValue: any;

	constructor(cy: any, elementId: string, propertyName: string, newValue: any) {
		super();
		this.cy = cy;
		this.elementId = elementId;
		this.propertyName = propertyName;
		this.newValue = newValue;
		this.oldValue = cy.$id(elementId).data(propertyName);
	}

	do(): void {
		this.cy.$id(this.elementId).data(this.propertyName, this.newValue);
	}
	undo(): void {
		this.cy.$id(this.elementId).data(this.propertyName, this.oldValue);
	}
	isOverriddenBy(action: Action): boolean {
		if (!(action instanceof EditPropertyAction)) return false;
		const otherAction = action as EditPropertyAction;
		return (
			this.elementId === otherAction.elementId &&
			this.propertyName === otherAction.propertyName
		);
	}

	getWikibaseAction() {
		throw new Error("Method not implemented.");
	}
}
