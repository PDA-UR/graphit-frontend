// .ts wegen Kommentaren
// .json besser?
export default [
    //LAYOUT
    {
        name: "grid",
        rows: 10,
        nodeDimensionsIncludeLabels: true, // Includes label in node bounding boxes
        //spacingFactor: 1.50, // pos = more space btw nodes
        avoidOverlap2: true
    }
    // Interesting layouts: "cose", "breadthfirst", "random", "circle", "concentric"
    // Prolems: Lables may overlap
    // Extensions: Cola.js (physics), avsdf (min. edge cross)
]

// Run multiple layouts on within on layout: 
//https://stackoverflow.com/questions/52200858/cytoscape-js-multiple-layouts-different-layout-within-compound-nodes

// https://blog.js.cytoscape.org/2020/05/11/layouts/