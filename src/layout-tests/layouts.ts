//IMPORTS
import "./layouts-style.css";
import cytoscape from "cytoscape";
import EIMI from "../data/eimi-noParent.json"; // data
import stylesheet from "./layout-Style" // Stylesheet
import fcose from "cytoscape-fcose"; //fCoSE-Layout

// ADD: Node-clustering

//INIT EXTENSIONS
cytoscape.use(fcose);
//INIT MAIN CYTO-INSTANCE
const main = document.getElementById("cy")

var cy2 = cytoscape ({
    container: main, 
    elements: EIMI,

    // initial viewport state:
    zoom: 1,
    pan: { x: 0, y: 0 },

    // STYLESHEET -> ausgelagert in gStyle.ts
    style: stylesheet,
    //FOR Quick-test
    layout: {
        name: "breadthfirst",
        directed: false,
        grid: false,
        avoidOverlap: true,
        spacingFactor: 1,
        maximal: true,
    },
});
// -> No initial layout

//TEST -> Clustering https://js.cytoscape.org/#collection/clustering 
var clusters = cy2.elements().kMeans({
    k: 2, 
    attributes: [
        function(node){
            return node.outgoers(); 
        }
    ]
});


//LAYOUT-OPTIONS
const gridOps = {
    name: "grid",
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: true,
    condense: true,
    spacingFactor: 0.8,
};

const breadthOps = {
    name: "breadthfirst",
    directed: false,
    grid: false,
    avoidOverlap: true,
    spacingFactor: 1,
    maximal: true,
}

const fCoSEOps = {
    name: 'fcose',
    quality: 'proof',
    radomize: false,
    animate: false,
    fit: true, 
    nodeDimensionsIncludeLabels: true,
    uniformNodeDimensions: true, // for simple nodes (non-compound)
    nodeRepulsion: node => 60,
    idealEdgeLength: edge => 70,
    edgeElasticity: edge => 0.60,
    nestingFactor: 0.5,
    gravity: 10,
    //gravityRangeCompound: 1.0, //-> makes parents bigger/smaller
    //gravityCompound: 10.0,
}


//LAYOUT-BUTTONS
var btns: HTMLElement | null = document.getElementById("parent-btns")
btns.addEventListener("click", e => {
    var el = e.target as HTMLElement;
    switch (el.id){
        case "grid":
            console.log("Grid");
            cy2.layout(gridOps).run();
            break;
        case "fCoSE":
            console.log("fCoSE");
            cy2.layout(fCoSEOps).run();
            break;
        case "breadth":
            console.log("Breadthfirst");
            cy2.edges().addClass(".breadthfirst");
            cy2.layout(breadthOps).run();
            break;
        default:
            console.log("no Button");
    }
});