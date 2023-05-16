import cytoscape from "cytoscape";
//import fcose from "cytoscape-fcose";
import { GraphViewOptions } from "../../propertyEditor/ui/graph/GraphView";
import { ElementDefinition } from "cytoscape";
import fcose from "cytoscape-fcose";
import * as layoutOps from "../design/gLayout";

cytoscape.use(fcose);

// Bundles all changes to the Graph + Layout

const nodeSize = (ele: any) => {
	const degree = ele.degree();
	return 7 + degree * 7;
};

const DEFAULT_OPTIONS: GraphViewOptions = {
    layout: layoutOps.fcoseOptions,
    style: [
        { selector: 'node',
        style: { // Show node with label
            'label': 'data(label)',
            'text-wrap': 'wrap',
            'text-max-width': '100',
            'border-color': "#666",
            'width': nodeSize,
            'height': nodeSize,
        }
    },
    // Colors nodes based on the nodeClassLabel inside node
    // Short attempt at Clustering Node
        { selector: 'node[nodeClassLabel = "Colors"]',
        style: {
            'background-color': 'blue',
        }
    }
    ]
};

export class MainGraph {
    private readonly cy: any;
    private readonly $container: HTMLElement;
    
    constructor(
        model: ElementDefinition[],
        $container: HTMLElement,
    ) {
        this.$container = $container;
        this.cy = cytoscape({
            container: this.$container,
            elements: model,
            ...DEFAULT_OPTIONS,
        });
    };

    public switchLayout = (option: string) => {
        console.log("switch Layout: ", option);
        switch (option) {
            case "fcose":
                this.cy.layout(layoutOps.fcoseOptions).run();
                break;
            case "breadth":
                this.cy.layout(layoutOps.breadthOptions).run();
                break;
            case "concentric":
                this.cy.layout(layoutOps.concOptions).run();
                break;
            default:
                this.cy.layout(DEFAULT_OPTIONS).run();
        }
    };

}
