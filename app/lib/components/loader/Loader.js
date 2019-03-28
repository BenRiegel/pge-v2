//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Dispatcher from '../../utils/Dispatcher.js';
import Model from './model/Model.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function Loader(){

  //private code block ---------------------------------------------------------

  var dispatcher = new Dispatcher();
  var model = new Model();
  var view = new View();
  var controller = new Controller(dispatcher, model, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.activate = function(){
    dispatcher.newAction('updateIsActive', true);
  };

  this.terminate = function(fadeOut = false){
    if (fadeOut){
      return dispatcher.newAsyncAction('updateIsActive', false);
    } else {
      dispatcher.newAction('updateIsActive', false);
    }
  };

}
