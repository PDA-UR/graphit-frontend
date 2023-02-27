import "./style.css";
import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
//import expandCollapse from "cytoscape-expand-collapse";
// Test-Lib for expanding/collapsing nodes
// source: https://github.com/iVis-at-Bilkent/cytoscape.js-expand-collapse

// import out.json from public folder
import EIMI from "./data/eimi.json";
import * as gLayout from "./design/gLayout";
import gStyle from "./design/gStyle";

// Register extensions
cytoscape.use(fcose);
//expandCollapse(cytoscape);

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
        });
        defaultL.run();
    },

});

//Expand/Collapse Parent + highight edges
cy.unbind("click");
cy.bind("click", e => {
    var el = e.target;
    // Collapse/Expand Parent (NO EDGE)
    // Evtl. move childs to parent-pos. (eles.move()) + have opacity:0
    if(el.isNode() && el.hasClass("parent")){
        console.log("is parent");
        // Check if children are collapsed
        // Evtl: add collapse/expand button
        if(el.descendants().hasClass("collapsed-child")){
            console.log("is collapsed");
            e.target.descendants().removeClass('collapsed-child');
        } else {
            console.log("is expanded");
            el.descendants().addClass('collapsed-child');
        }
        // evtl. show collapse/expand button
    // Highlight Edges
    } else if(el.isNode()) {
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
})
// @TODO: test extension expand-collapse


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
        default:
            console.log("no Button");
    }
});