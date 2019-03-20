//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Model from './model/Model.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOption(config, menuModel){

  //private code block ---------------------------------------------------------

  var optionModel = new Model();
  var view = new View(config);
  var controller = new Controller(config, optionModel, menuModel, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.select = function(){
    optionModel.set('isSelected', true);
  }

  this.unselect = function(){
    optionModel.set('isSelected', false);
  }

}
