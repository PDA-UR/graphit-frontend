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
    nodeRepulsion: node => 50,
    idealEdgeLength: edge => 40,
    edgeElasticity: edge => 0.50,
    nestingFactor: 0.12,
    gravity: 5,
    gravityRangeCompound: 1.0, //-> makes parents bigger/smaller
    gravityCompound: 10.0,
    // packComponents: true, // needs: layout-utilities (test)
    // Constraints: -> gehen ?? (nur für atomare Knoten)
    //fixedNodeConstraint: [{nodeId: 'Concept/Binärzahlen', position: {x: 100, y: 200}}], 
    relativePlacementConstraint: [{top: "Concept/Binärzahlen", bottom: "Concept/Zahlensysteme"}],
};

// Needs el: "level" in json-object
export const concOptions = {
    name: 'concentric',
    fit: true,
    minNodeSpacing: 60,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false,
    concentric: function(node){
        return node.parent().data("level");
        //return node.data("parent");
    },
    levelWidth: function(nodes){ 
        return nodes.maxDegree() / 10;
    },
};

export const concOptions2 = {
    name: 'concentric',
    fit: true,
    minNodeSpacing: 50,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false,
    concentric: function(node){
        return node.data("parent");
    },
}

export const breadthOptions = {
    name: "breadthfirst",
    padding: 0,
    nodeDimensionsIncludeLabels: true,
    avoidOverlap: true,
    spacingFactor: 0.6,
};

// Run multiple layouts within one layout: 
//https://stackoverflow.com/questions/52200858/cytoscape-js-multiple-layouts-different-layout-within-compound-nodes

// https://blog.js.cytoscape.org/2020/05/11/layouts/
// https://stackoverflow.com/questions/51073254/cytoscape-js-how-to-use-one-layout-for-compound-nodes-and-another-for-children 