import "./style.css";
import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import expandCollapse from "cytoscape-expand-collapse";
// source: https://github.com/iVis-at-Bilkent/cytoscape.js-expand-collapse

// import out.json from public folder
import EIMI from "./data/eimi.json";
import * as gLayout from "./design/gLayout";
import gStyle from "./design/gStyle";

// Register extensions
cytoscape.use(fcose);
expandCollapse(cytoscape);


const app = document.getElementById("app");

// Init graph
var cy = cytoscape ({
    container: app, 
    elements: EIMI,

    // initial viewport state:
    zoom: 1,
    pan: { x: 0, y: 0 },

    // STYLESHEET -> ausgelagert in gStyle.ts
    style: gStyle,

    // called on layoutready
    ready: function(){
        //Init default-Layout
        var defaultL = this.layout({
            name: "grid",
            fit: true,
            padding: 0,
            avoidOverlap: true,
            nodeDimensionsIncludeLabels: true,
            spacingFactor: 0.7,
        });
        defaultL.run();
    },

});


// Init Expand/Collapse
//EDGES DON'T WORK + Highlights all edges/nodes on expand
var api = cy.expandCollapse({
    layoutBy: { // to rearange into after expand/collapse
      name: "fcose",
      animate: true,
      animationDuration: 500,
      randomize: false,
      fit: true
    },
    fisheye: true,
    undoable: false,
    groupEdgesOfSameTypeOnCollapse: true,
    allowNestedEdgeCollapse: true,
    //groupEdgesOfSameTypeOnCollapse : true, // does not work yet
    // groups by type -> contained in .json-object "type": "VL1"
});

// Applies size of parent by amount of elements containt
// -> Num of childs of collapse parent affects size (more kids = bigger body)
cy.nodes().on("expandcollapse.beforecollapse", function(event) { 
    const parent = this;
    let numOfChilds = parent.descendants().size();
    let size = numOfChilds * 5; // evtl. change + auslagern [MAGIC NUMBER!!]
    console.log(parent.id() + " has " + numOfChilds + " childs");
    parent.style({
        'shape': 'round-rectangle',
        'width': size,
        'height': size,
        'background-blacken': "-0.3", // to keep color the same
    });
});
//Add event (evtl. oncollapse) where it collapses edges between two collapsed nodes


//Expand/Collapse Parent + highight edges
cy.unbind("click");
cy.bind("click", e => {
    var el = e.target;
    if(el.isNode()) { //TODO -> Auslagern
        //Toggle multiple classes at once?
        // Highlight only edges from currently selected node
        cy.elements().edges().toggleClass("highlight-edge-out", false);
        cy.elements().edges().toggleClass("highlight-edge-in", false);
        cy.elements().nodes().toggleClass("highlight-node-out", false);
        cy.elements().nodes().toggleClass("highlight-node-in", false);
        //HIGHLIGHT EDGES
        el.outgoers().edges().toggleClass("highlight-edge-out", true);
        el.incomers().edges().toggleClass("highlight-edge-in", true);
       //HIGHLIGHT NODES
        el.outgoers().nodes().toggleClass("highlight-node-out", true);
        el.incomers().nodes().toggleClass("highlight-node-in", true);
    }
});


// Switch between different layouts
var btns: HTMLElement | null = document.getElementById("parent-btns")
btns.addEventListener("click", e => {
    var el = e.target as HTMLElement;
    switch (el.id){
         case "fcoseL":
            cy.layout(gLayout.fcoseOptions).run();
            break;
        case "concentricL":
            cy.layout(gLayout.concOptions).run();
            break;
        case "concentricL2":
            cy.layout(gLayout.concOptions2).run();
            break;
        case "breadthfirstL":
            cy.layout(gLayout.breadthOptions).run();
            break;
        //TEST -> only works if all edges between only two nodes
        //Collapse selected Edges
        case "collapseEdges":
            const edges = cy.edges(":selected");
            if(edges.length >= 2){
                api.collapseEdges(edges, {
                    groupEdgesOfSameTypeOnCollapse: true,
                    allowNestedEdgeCollapse: true,
                });
            }
            break;
        default:
            console.log("no Button");
    }
});


// Navigate to searched Node
var searchBtn = document.getElementById("searchBtn");
searchBtn?.addEventListener("click", function(){
    let search = document.getElementById("searchNode").value;
    if(!search){
        console.log("nothing entered");
        return;
    }
    let filter = cy.filter("node[label = '" + search + "']");
    let ele = cy.getElementById(filter.id());
    if(ele.id() == undefined){
        console.log("Node doesn't exist");
        return;
    }
    // zoom to position of node
    cy.zoom({
        level: 1.5,
        position: ele.position(),
    });
    ele.flashClass("searched", 2000); // hightlight node for 2000ms
});

//TEST: Mouse-over (hover) event:
cy.on('mouseover', 'node', e => {
    var node = e.target;
    //console.log("Mouse on node" + node.data('label'));
});


// TEST for add node -> right click on Background
cy.on('cxttap', e => {
    if (e.target === cy){
        console.log("right clicked bg");
        //Adds one node to graph
        var label:String = "TEST";
        // Needs same format as other data
        cy.add([
            { group: 'nodes', data: { id: 't0', label: "test1", parent : "VL1" } },
            { group: 'nodes', data: { id: 't1', label: "test2", parent : "VL1" } },
            { group: 'edges', data: { id: 'te0', source: 't0', target: 't1' } }
          ]);
        // Run layout again
    } else {
        console.log("right clicked " + e.target.id());
    }
});