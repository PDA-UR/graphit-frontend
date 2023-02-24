// .ts wegen Kommentaren
// .json besser?

export const fcoseOptions = {
    //https://github.com/iVis-at-Bilkent/cytoscape.js-fcose
    name: 'fcose',
    quality: 'proof',
    radomize: false,
    animate: false,
    fit: true, 
    nodeDimensionsIncludeLabels: true,
    uniformNodeDimensions: true, // for simple nodes (non-compound)
    gravity: 5,
    // packComponents: true, // needs: layout-utilities (test)
};

export const concOptions = {
    name: 'concentric',
    fit: true,
    minNodeSpacing: 10,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: true,

};

export const breadthOptions = {
    name: "breadthfirst",
    padding: 0,
    nodeDimensionsIncludeLabels: true,
    avoidOverlap: true,
    spacingFactor: 0.6,
};

/*export default [
    //LAYOUT
    {
        name: "grid",
        rows: 5,
        nodeDimensionsIncludeLabels: true, // Includes label in node bounding boxes
        //spacingFactor: 1.50, // pos = more space btw nodes
        avoidOverlap2: true
    }
    // Interesting layouts: "cose", "breadthfirst", "random", "circle", "concentric"
    // Prolems: Lables may overlap
    // Extensions: Cola.js (physics), avsdf (min. edge cross)
]*/

// Run multiple layouts within one layout: 
//https://stackoverflow.com/questions/52200858/cytoscape-js-multiple-layouts-different-layout-within-compound-nodes

// https://blog.js.cytoscape.org/2020/05/11/layouts/
// https://stackoverflow.com/questions/51073254/cytoscape-js-how-to-use-one-layout-for-compound-nodes-and-another-for-children 