import { PropertyAction } from "./PropertyAction";

export class EditPropertyAction extends PropertyAction {
	private readonly newValue: any;
	private readonly oldValue: any;

	constructor(cy: any, elementId: string, propertyName: string, newValue: any) {
		super(cy, elementId, propertyName);
		this.newValue = newValue;
		this.oldValue = cy.$id(elementId).data(propertyName);
	}

	do(): void {
		this.cy.$id(this.elementId).data(this.propertyName, this.newValue);
	}
	undo(): void {
		this.cy.$id(this.elementId).data(this.propertyName, this.oldValue);
	}

	getWikibaseAction() {
		throw new Error("Method not implemented.");
	}
}
