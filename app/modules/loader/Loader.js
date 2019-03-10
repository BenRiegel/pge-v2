//imports ----------------------------------------------------------------------

import View from './view/View.js';
import ViewController from './controller/ViewController.js';
import State from './state/State.js';


//exports ----------------------------------------------------------------------

export default function Loader(){

  //private code block ---------------------------------------------------------

  var state = new State();
  var view = new View();
  var controller = {
    view: new ViewController(view, state),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.show = function(){
    state.set('isActive', true);
  };

  this.hide = function(){
    view.isFading = false;
    state.set('isActive', false);
  };

  this.fadeAndHide = function(){
    view.isFading = true;
    return state.setAsync('isActive', false);
  };

}
