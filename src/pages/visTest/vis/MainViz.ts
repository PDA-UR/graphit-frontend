import { ElementDefinition } from "cytoscape";
import { GraphModel } from "../../propertyEditor/ui/graph/GraphModel";
import { MainGraph } from "./MainGraph";
import { MenuController } from "../ui/MenuController";
import { eventBus } from "../../propertyEditor/global/EventBus";

// MainViz is bundles all viz-tests

export class MainViz {
    private mainGraph;
    private graphModel: GraphModel;
    private menuController: MenuController;

    constructor(elements:ElementDefinition[]) {
        this.graphModel = elements;
        this.mainGraph = new MainGraph(
            this.graphModel,
            document.getElementById("app")!,
        );
        this.menuController = new MenuController();

        eventBus.on(
            "layoutChange", this.mainGraph.switchLayout
        )
    }
    
}