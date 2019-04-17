export default function GraphicsLayerViewController(view){

  //public api -----------------------------------------------------------------

  this.addGraphics = function(graphics){
    view.subcomponents.graphics = graphics;
  };

  this.removeAllGraphics = function(){
    view.subcomponents.graphics = [];
  };

}
