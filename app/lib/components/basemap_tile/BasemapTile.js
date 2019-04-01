//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Dispatcher from '../../utils/Dispatcher.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function BasemapTile(props){

  //private code block ---------------------------------------------------------

  var dispatcher = new Dispatcher();
  var view = new View();
  var controller = new Controller(props, dispatcher, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.update = function(actionName, ...args){
    dispatcher.newAction(actionName, ...args);
  };

  this.updateAsync = function(actionName, ...args){
    return dispatcher.newAsyncAction(actionName, ...args);
  };

}
