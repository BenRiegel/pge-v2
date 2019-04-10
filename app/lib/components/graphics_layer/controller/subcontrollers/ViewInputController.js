export default function GraphicsLayerViewInputController(view){

  var { nodes } = view;
  var { root } = nodes;

  //public api -----------------------------------------------------------------

  this.enable = function(){
    root.isListening = true;
  };

  this.disable = function(){
    root.isListening = false;
  };

}
