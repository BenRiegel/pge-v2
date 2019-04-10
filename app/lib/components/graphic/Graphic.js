//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Model from './model/Model.js';
import View from './view/View.js';

//exports ----------------------------------------------------------------------

export default function Graphic(props){

  //private code block ---------------------------------------------------------

  var model = new Model();
  var view = new View(props);
  var controller = new Controller(props, model, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.attributes = props.attributes;

  this.updateModel = function(selectedGraphicId){
    controller.updateModel(selectedGraphicId);
  };

  this.renderView = function(webMapModel, webMapDimensions){
    controller.renderView(webMapModel, webMapDimensions);
  };

  this.updateOnPan = function(viewpoint, webMapDimensions){
    controller.updateOnPan(viewpoint, webMapDimensions);
  };

  this.updateOnZoom = function(viewpoint, scaleFactor, webMapDimensions){
    controller.updateOnZoom(viewpoint, scaleFactor, webMapDimensions);
  };

}
