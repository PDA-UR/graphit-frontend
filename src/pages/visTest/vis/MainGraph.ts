import cytoscape, { Collection } from "cytoscape";
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
        { selector: 'edge',
        style: {
            'target-arrow-shape': 'triangle',
            'curve-style': 'straight'
            }
        },
        // Parents:
        { selector: ':parent',
        style: {
            'background-opacity': 0.333,
            'border-color': 'blue',
            'label': 'data(id)'
            }
        },
        { selector: '.hide',
        style: {
            'background-opacity': 0,
            'border-width': 0,
            'label': ''
            }
        },

    ]
};

export class MainGraph {
    private readonly cy: any;
    private readonly $container: HTMLElement;
    private readonly collection: Collection;
    
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
        this.cy.$("edge").unselectify(); // Make edges immutable
        this.collection = this.cy.collection(this.cy.$("*")); // Full graph
    };

    public switchLayout = (option: string) => {
        console.log("switch Layout: ", option);
        switch (option) {
            case "fcose":
                this.toggleParentVisibility(true)
                this.cy.layout(layoutOps.fcoseOptions).run();
                break;
            case "breadth":
                this.toggleParentVisibility(false);
                this.cy.layout(layoutOps.breadthOptions).run();
                break;
            case "concentric":
                this.toggleParentVisibility(false);
                this.cy.layout(layoutOps.concOptions).run();
                break;
            default:
                this.cy.layout(DEFAULT_OPTIONS).run();
        }
    };

    // Geht -> Lässt sich nicht/schwierig umkehren
    // Evtl. interessant
    private removeParents() {
        const parents = this.cy.$(":parent");
        // Move all nodes outside of parents
        this.cy.elements().nodes().descendants().move({parent:null});
        parents.toggleClass("hide", true);
    }

    private toggleParentVisibility(show:Boolean) {
        const parents = this.cy.$(":parent");
        if(show) { // move childs back into parents + remove hide class
            this.cy.$(":parent").toggleClass("hide", false);
        } else if (!show) {
            this.cy.$(":parent").toggleClass("hide", true);
        }
    }

}
