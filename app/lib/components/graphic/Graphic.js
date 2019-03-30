//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Dispatcher from '../../utils/Dispatcher.js';
import Model from './model/Model.js';
import View from './view/View.js';

//exports ----------------------------------------------------------------------

export default function Graphic(props, layerModel, webMapModel, webMapDimensions){

  //private code block ---------------------------------------------------------

  var dispatcher = new Dispatcher();
  var model = new Model();
  var view = new View(props);
  var controller = new Controller(props, dispatcher, model, view, layerModel, webMapModel, webMapDimensions);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.update = function(actionName, ...args){
    dispatcher.newAction(actionName, ...args);
  };

}
