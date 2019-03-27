//imports ----------------------------------------------------------------------

import Dispatcher from '../../utils/Dispatcher.js';
import Controller from './controller/Controller.js';
import View from './view/View.js';
import Model from './model/Model.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOption(config, menuModel){

  //private code block ---------------------------------------------------------

  var dispatcher = new Dispatcher();
  var model = new Model();
  var view = new View(config);
  var controller = new Controller(config, dispatcher, model, view, menuModel);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.update = function(actionName, ...args){
    dispatcher.newAction(actionName, ...args);
  };

  this.updateAsync = function(actionName, ...args){
    return dispatcher.newAsyncAction(actionName, ...args);
  };

}
