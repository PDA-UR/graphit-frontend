import { eventBus } from "../../events/EventBus";
import {
	PropertyModalView,
	PropertyModalViewEvents,
} from "./PropertyModalView";

export enum PropertyModalControllerEvents {
	EDIT_PROPERTY_ACTION_CLICKED = "editPropertyAction",
	SET_PROPERTY_MODAL_VISIBILITY = "setPropertyModalVisibility",
}

export enum PropertyEditAction {
	COMPLETE = "complete",
	INTEREST = "interest",
	RATE = "rate",
}

export class PropertyModalController {
	private readonly propertyModalView;

	constructor() {
		this.propertyModalView = new PropertyModalView();

		this.propertyModalView.addListener(
			PropertyModalViewEvents.COMPLETE_BUTTON_CLICK,
			eventBus.emit.bind(
				eventBus,
				PropertyModalControllerEvents.EDIT_PROPERTY_ACTION_CLICKED,
				PropertyEditAction.COMPLETE
			)
		);
		this.propertyModalView.addListener(
			PropertyModalViewEvents.INTEREST_BUTTON_CLICK,
			eventBus.emit.bind(
				eventBus,
				PropertyModalControllerEvents.EDIT_PROPERTY_ACTION_CLICKED,
				PropertyEditAction.INTEREST
			)
		);
		this.propertyModalView.addListener(
			PropertyModalViewEvents.RATE_BUTTON_CLICK,
			eventBus.emit.bind(
				eventBus,
				PropertyModalControllerEvents.EDIT_PROPERTY_ACTION_CLICKED,
				PropertyEditAction.RATE
			)
		);

		eventBus.addListener(
			PropertyModalControllerEvents.SET_PROPERTY_MODAL_VISIBILITY,
			this.onSetPropertyModalVisibility
		);
	}

	private onSetPropertyModalVisibility = (isVisible: boolean) => {
		if (isVisible) this.propertyModalView.show();
		else this.propertyModalView.hide();
	};
}
