export default function GraphicsLayerViewDomController(view){

  var { nodes } = view;
  var { root } = nodes;

  //public api -----------------------------------------------------------------

  this.addGraphics = function(graphics){
    var graphicNodes = graphics.map(graphic => graphic.rootNode);
    root.appendChildNodes(graphicNodes);
  };

  this.removeAllGraphics = function(){
    root.removeAllChildNodes();
  };

}
