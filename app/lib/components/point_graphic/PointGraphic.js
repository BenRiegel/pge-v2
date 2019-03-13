//imports ----------------------------------------------------------------------

import State from './state/State.js';
import View from './view/View.js';
import StateController from './controllers/StateController.js';
import ViewController from './controllers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function PointGraphic(props, layerState, mapDimensions, webMapState){

  //private code block ---------------------------------------------------------

  var state = new State();
  var view = new View(props);
  var controller = {
    state: new StateController(state, props, layerState, webMapState),
    view: new ViewController(view, props, state, mapDimensions, webMapState),
  };

  //public api -----------------------------------------------------------------

  return {
    rootNode: view.nodes.root.node,

    worldCoords: props.worldCoords,

    attributes: props.attributes,

    get hasSelectedTag(){
      return state.hasSelectedTag;
    },

    get isObscured(){
      return state.isObscured;
    },

    updateIsObscured: function(isObscured){
      state.set('isObscured', isObscured);
    },

    //get rid of this eventually
    update: controller.view.update,
  }

}
