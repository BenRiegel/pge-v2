//imports ----------------------------------------------------------------------

import Dispatcher from '../../utils/Dispatcher.js';
import Model from './model/Model.js';
import View from './view/View.js';
import Controller from './controller/Controller.js';


//exports ----------------------------------------------------------------------

export default function WebMap(config){

  //private code block ---------------------------------------------------------

  var dispatcher = new Dispatcher();
  var model = new Model(config);
  var view = new View(model);
  var controller = new Controller(config, dispatcher, model, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.render = async function(){
    //controller.view.configure();
  };

  this.graphicsLayer = view.subcomponents.graphicsLayer;

  this.selectMenu = view.subcomponents.selectMenu;

}
