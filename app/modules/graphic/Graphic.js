//imports ----------------------------------------------------------------------

import State from './state/State.js';
import View from './view/View.js';
import ViewController from './controllers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function Graphic(props, mapViewpoint, layerState, mapDimensions){

  //private code block ---------------------------------------------------------

  var state = new State();
  var view = new View(props);
  var controller = {
    view: new ViewController(view, props, mapViewpoint, layerState, state, mapDimensions),
  };

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.updateIsHighlighted = function(highlightedGraphicId){
    state.set('isHighlighted', props.id === highlightedGraphicId);
  }

}
