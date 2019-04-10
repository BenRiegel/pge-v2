//imports ----------------------------------------------------------------------

import Dispatcher from './services/Dispatcher.js';
import Model from './model/Model.js';
import View from './view/View.js';
import Controller from './controller/Controller.js';


//exports ----------------------------------------------------------------------

export default function WebMap(config){

  //private code block ---------------------------------------------------------

  var dispatcher = new Dispatcher();
  var model = new Model();
  var view = new View(config, model);
  var controller = new Controller(config, dispatcher, model, view);

  //public api -----------------------------------------------------------------

  return {
    rootNode: view.nodes.root.node,
    hasRendered: dispatcher.doAction('configure'),
    get scale(){
      return model.scale;
    },
    get graphicsLayer(){
      return view.subcomponents.graphicsLayer;
    },
    get selectMenu(){
      return view.subcomponents.selectMenu;
    },
    get popup(){
      return view.subcomponents.popup;
    }
  };

}
