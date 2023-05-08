import { eventBus } from "../../events/EventBus";
import { Tool, ToolbarModel } from "./ToolbarModel";
import { ToolbarView, ToolbarViewEvents } from "./ToolbarView";

export enum ToolbarViewControllerEvents {
	SWITCH_TOOL = "switchTool",
}

export class ToolbarViewController {
	private readonly toolbarView: ToolbarView;
	private readonly toolbarModel: ToolbarModel;

	constructor() {
		this.toolbarModel = new ToolbarModel();
		this.toolbarView = new ToolbarView();

		this.toolbarView.on(
			ToolbarViewEvents.GRAB_TOOL_CLICK,
			this.onGrabToolClick
		);
		this.toolbarView.on(
			ToolbarViewEvents.MOUSE_TOOL_CLICK,
			this.onMouseToolClick
		);
		this.toolbarView.on(
			ToolbarViewEvents.RECTANGLE_TOOL_CLICK,
			this.onRectangleToolClick
		);
	}

	private onGrabToolClick = () => {
		this.toolbarModel.activeTool = Tool.GRAB;
		this.toolbarView.setTool(Tool.GRAB, true);
		eventBus.emit(ToolbarViewControllerEvents.SWITCH_TOOL, Tool.GRAB);
	};

	private onMouseToolClick = () => {
		this.toolbarModel.activeTool = Tool.MOUSE;
		this.toolbarView.setTool(Tool.MOUSE, true);
		eventBus.emit(ToolbarViewControllerEvents.SWITCH_TOOL, Tool.MOUSE);
	};

	private onRectangleToolClick = () => {
		this.toolbarModel.activeTool = Tool.RECTANGLE;
		this.toolbarView.setTool(Tool.RECTANGLE, true);
		eventBus.emit(ToolbarViewControllerEvents.SWITCH_TOOL, Tool.RECTANGLE);
	};
}
