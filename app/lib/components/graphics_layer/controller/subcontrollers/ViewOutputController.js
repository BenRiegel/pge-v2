export default function GraphicsLayerViewOutputController(view, model, webMapModel, webMapDimensions){

  var { nodes, subcomponents } = view;
  var { root } = nodes;

  //public api -----------------------------------------------------------------

  this.renderGraphics = function(graphics){
    for (var graphic of graphics){
      graphic.renderView(webMapModel, webMapDimensions);
    }
  };

  this.updateOnGraphicSelection = function(){
    if (model.props.selectedGraphicId.hasChanged){
      for (var graphic of view.subcomponents.graphics){
        graphic.updateModel(model.selectedGraphicId);
      }
    }
  };

  this.updateOnPan = function(newViewpoint){
    for (var graphic of subcomponents.graphics){
      graphic.updateOnPan(newViewpoint, webMapDimensions);
    }
  };

  this.updateOnZoom = function(newViewpoint, zoomFactor){
    for (var graphic of subcomponents.graphics){
      graphic.updateOnZoom(newViewpoint, zoomFactor, webMapDimensions);
    }
  };

  this.fadeDown = function(){
    return root.setOpacity('0', true);
  };

  this.fadeUp = function(){
    return root.setOpacity('1', true);
  };

}
