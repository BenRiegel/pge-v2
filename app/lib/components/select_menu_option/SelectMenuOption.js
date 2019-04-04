//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import View from './view/View.js';
import Model from './model/Model.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOption(config){

  //private code block ---------------------------------------------------------

  var model = new Model();
  var view = new View(config);
  var controller = new Controller(config, model, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.updateIsSelected = function(selectedOptionKey, isOpen){
    controller.updateIsSelected(selectedOptionKey, isOpen);
  };

  this.updateLabelIndent = function(isOpen){
    controller.updateLabelIndent(isOpen);
  };

  this.updateIconChar = function(isOpen){
    controller.updateIconChar(isOpen);
  };

  this.updateIconBorderVisibility = function(isOpen){
    controller.updateIconBorderVisibility(isOpen);
  };

  this.updateRootBorderRadius = function(isOpen){
    controller.updateRootBorderRadius(isOpen);
  };

  this.updateRootVisibility = function(isOpen){
    controller.updateRootVisibility(isOpen);
  };

  this.updateRootHeight = function(isOpen){
    return controller.updateRootHeight(isOpen);
  };

  this.updateRootOpacity = function(isOpen){
    return controller.updateRootOpacity(isOpen);
  };

}
