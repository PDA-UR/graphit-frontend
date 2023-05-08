export enum Tool {
	GRAB = "grab",
	MOUSE = "mouse",
	RECTANGLE = "rectangle",
}

export class ToolbarModel {
	activeTool: Tool = Tool.MOUSE;
}
