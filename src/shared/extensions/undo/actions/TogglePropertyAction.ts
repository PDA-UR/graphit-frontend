import { PropertyAction } from "./PropertyAction";

export class TogglePropertyAction extends PropertyAction {
	private readonly possibleValues: [any, any];

	constructor(
		cy: any,
		elementId: string,
		propertyName: string,
		possibleValues: [any, any]
	) {
		super(cy, elementId, propertyName);
		this.possibleValues = possibleValues;
	}

	do(): void {
		const currentValue = this.cy.$id(this.elementId).data(this.propertyName),
			newValue =
				currentValue === this.possibleValues[0]
					? this.possibleValues[1]
					: this.possibleValues[0];
		this.cy.$id(this.elementId).data(this.propertyName, newValue);
	}
	undo(): void {
		const currentValue = this.cy.$id(this.elementId).data(this.propertyName),
			newValue =
				currentValue === this.possibleValues[0]
					? this.possibleValues[1]
					: this.possibleValues[0];
		this.cy.$id(this.elementId).data(this.propertyName, newValue);
	}

	getWikibaseAction() {
		throw new Error("Method not implemented.");
	}
}
