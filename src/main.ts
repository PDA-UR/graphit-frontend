import "./style.css";
import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
// Test-Lib for expanding/collapsing nodes :source: https://github.com/iVis-at-Bilkent/cytoscape.js-expand-collapse
// -> evtl. import geht nur über require?

// import out.json from public folder
import EIMI from "./data/eimi.json";
//import gLayout from "./design/gLayout";
import gStyle from "./design/gStyle";

// Register extensions
cytoscape.use(fcose);

const app = document.getElementById("app");

var cy = cytoscape ({
    container: app, 
    elements: EIMI,

    // initial viewport state:
    zoom: 1,
    pan: { x: 0, y: 0 },

    // STYLESHEET -> ausgelagert in gStyle.ts
    style: gStyle,

    // LAYOUT -> ausgelagert in gLayout.ts (TODO)
    layout: {
        name: 'fcose',
        qaulity: 'proof',
        radomize: false,
        animate: false,
        fit: true, 
        nodeDimensionsIncludeLabels: false,
        uniformNodeDimensions: true, // for simple nodes (non-compound)
        //packComponents: true, //extension: cytoscape-layout-utilities
       /* name: "breadthfirst",
        fit: true,
        circle: false,
        avoidOverlap: true,
        spacingFactor: 0.6,
        nodeDimensionsIncludeLabels: true,
        //Try: mod. weight sort procedures for levels*/
        //Oder cose-bilkent: https://github.com/cytoscape/cytoscape.js-cose-bilkent
    }

});

//WORKS -> Expand/Collapse Parent + highight edges
cy.unbind("click");
cy.bind("click", e => {
    var el = e.target;
    // Collapse/Expand Parent (NO EDGE)
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
        // show collapse/expand button
        // Evtl. move childs to same pos as parents (eles.move()) + have opacity:0
    // Highlight Edges
    } else if(el.isNode()){
        console.log("is node");
        // hightlight node (via style :selected)
        // Highlight only edges from currently selected node
        cy.elements().edges().toggleClass("highlight-edge", false);
        el.connectedEdges().edges().toggleClass("highlight-edge", true);
    }
})

//WORKS
// Nodes of selected element hightlighted
// -> doesn't work with grab, yet
/*cy.unbind("click"); // Unbind event to prevent double execution
cy.bind("click", "node", e => {

    cy.elements().edges().toggleClass("highlight-edge", false);
    if(!e.target.hasClass('highlight-edge')){
        console.log("not yet selected")
        e.target.connectedEdges().edges().toggleClass("highlight-edge", true);
    }
})*/
// check if(target == "node") oder ":parent"


// TESTS:
// Changes style of node on click
/*cy.unbind("click");
cy.bind("click", "node", e => {
    cy.elements().removeClass("hightlight");
    e.target.addClass("hightlight");
}); //https://stackoverflow.com/questions/58686166/cytoscape-js-compound-child-node-addclass-not-displaying-style
*/


// Collapses all child nodes on click - no edge to it
/*
cy.unbind("click");
cy.bind("click", ":parent", e => {
    console.log(e.target.id());
    //console.log(e.target.descendants());
    //e.target.descendants().removeClass('collapsed-child');
    if(e.target.hasClass('collapsed-child')){
        // doesn't work -> collapsed parent not parent-class
        console.log("is collapsed");
        e.target.descendants().removeClass('collapsed-child');
    } else {
        e.target.descendants().addClass('collapsed-child');
    }

});*/



// Event for clicking parent/node
/*cy.$('node').on('tap', function(e) {
    var ele = e.target;
    console.log('tapped ' + ele.id());
    /*ele.style({
        'background-color': 'red',
    });
});*/

// Also works on parent (is also node)
/*
cy.on('mouseover', 'node', function(e){
    console.log("mouseover");
    var el = e.target;
    el.style('background-color', "blue");
});

cy.on('mouseout', 'node', function(e){
    console.log("mouseout");
    var el = e.target;
    el.style('background-color', '#666');
}); */


/* Interesting function:
function addParentNode(idSuffix, parent = undefined) {
  const id = 'c' + idSuffix;
  const parentNode = { data: { id: id } };
  cy.add(parentNode);
  cy.$('#' + id).move({ parent: parent });
  return id;
}
*/