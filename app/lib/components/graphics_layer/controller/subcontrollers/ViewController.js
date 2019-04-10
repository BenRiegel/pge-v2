export default function GraphicsLayerViewController(view){

  var { nodes } = view;
  var { root } = nodes;

  //public api -----------------------------------------------------------------

  this.addGraphics = function(graphics){
    view.subcomponents.graphics = graphics;
  };

  this.removeAllGraphics = function(){
    view.subcomponents.graphics = [];
  };

}
