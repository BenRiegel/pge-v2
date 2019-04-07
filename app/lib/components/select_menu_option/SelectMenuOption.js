//imports ----------------------------------------------------------------------

import { capitalize } from '../../utils/Utils.js';
import Controller from './controller/Controller.js';
import View from './view/View.js';
import Model from './model/Model.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOption(props){

  //private code block ---------------------------------------------------------

  var model = new Model();
  var view = new View(props);
  var controller = new Controller(props, model, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.updateModel = function(selectedOptionKey, isOpen){
    controller.updateModel(selectedOptionKey, isOpen);
  };

  this.updateView = function(propName, ...args){
    var methodName = 'update' + capitalize(propName);
    return controller[methodName](...args);
  };

}
