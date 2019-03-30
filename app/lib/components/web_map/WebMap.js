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
  var view = new View(config, model);
  var controller = new Controller(config, dispatcher, model, view);

  //public api -----------------------------------------------------------------

  return {
    rootNode: view.nodes.root.node,
    hasRendered: dispatcher.newAsyncAction('configure'),
    get graphicsLayer(){
      return view.subcomponents.graphicsLayer;
    },
    get selectMenu(){
      return view.subcomponents.selectMenu;
    },
  };

}
