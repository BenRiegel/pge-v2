//imports ----------------------------------------------------------------------

import Emitter from './services/Emitter.js';
import Model from './model/Model.js';
import View from './view/View.js';
import Controller from './controller/Controller.js';


//exports ----------------------------------------------------------------------

export default function WebMap(config){

  //private code block ---------------------------------------------------------

  var emitter = new Emitter();
  var model = new Model();
  var view = new View(config, model);
  var controller = new Controller(config, emitter, model, view);

  //public api -----------------------------------------------------------------

  return {
    rootNode: view.nodes.root.node,
    hasRendered: controller.configure,

    setListener: function(eventName, listener){
      emitter.setListener(eventName, listener);
    },


    enable: function(){
      controller.enable();
    },

    disable: function(){
      controller.disable();
    },

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
