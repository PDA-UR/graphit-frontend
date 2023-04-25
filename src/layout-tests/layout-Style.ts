import { NodeSingular } from "cytoscape";

// FUNCTIONS

function mapColor(node:NodeSingular) {
  // Map color from blue [<connected] to orange [>connected]
  let numIncome = node.connectedEdges().size();
  let allEdges = node.cy().nodes().size()
  let percent = Math.round(numIncome/allEdges * 100);
  //Blau = 0 -> Orange = 100 -> HSL: Blue = 250, Orange = 30
  //console.log(numIncome + " from " + allEdges);
  return 'hsl(' + numIncome*3 + ', 90%, 70%)';
  //TODO -> Use the same metric as for size
  //Change color mapping
}

// --------------------------------------

// STYLESHEET
export default [
  // NODE
  { selector: 'node',
      style: {
        'background-color': mapColor.bind(this),
        'label': 'data(label)',
        'text-wrap' : 'wrap',
        'text-max-width': '100px',
        'width': function(ele){ return Math.max(1, Math.ceil(ele.connectedEdges().size()/2)) * 10; },
        'height': function(ele){ return Math.max(1, Math.ceil(ele.connectedEdges().size()/2)) * 10; }
        // INITIALLY: return Math.max(1, Math.ceil(ele.degree()/2)) * 10;
        //'text-outline-color': 'red', -> geht nicht?
      }
  },

  // EDGE
  { selector: 'edge',
    style: {
      //'curve-style': 'taxi', // test for breadthfirst/hierarchy
      //'curve-style': 'segmented',
    }
  },

  // STATES
  {selector: ':active',
    style: {
      'overlay-color': 'red',
    }
  }

  /*Overlays/Underlays: https://js.cytoscape.org/#style/overlay*/

]