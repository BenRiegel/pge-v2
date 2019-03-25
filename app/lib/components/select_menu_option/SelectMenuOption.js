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

  this.onNewSelectedOption = function(){
    dispatcher.newAction('newSelectedOption');
  }

  this.updateIconVisibility = controller.view.updateIconVisibility;
  this.updateLabelIndent = controller.view.updateLabelIndent;
  this.updateIconChar = controller.view.updateIconChar;
  this.updateIconBorderVisibility = controller.view.updateIconBorderVisibility;
  this.updateRootBorderRadius = controller.view.updateRootBorderRadius ;
  this.updateRootVisibility = controller.view.updateRootVisibility;
  this.transitionRootHeight = controller.view.transitionRootHeight;
  this.transitionRootOpacity = controller.view.transitionRootOpacity;
}
