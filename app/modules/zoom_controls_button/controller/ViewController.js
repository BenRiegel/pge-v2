export default function ZoomControlsButtonViewController(view){

  var { nodes } = view;
  var { root, icon } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(icon.node);

  //define reactions -----------------------------------------------------------

  var updateDomListener = function(isListening){
    root.isListening = isListening;
  }

  //init -----------------------------------------------------------------------

  updateDomListener(true);

  //public api -----------------------------------------------------------------

  this.updateDomListener = updateDomListener;

}
