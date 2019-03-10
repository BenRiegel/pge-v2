export default function ZoomControlsViewController(view){

  var { nodes, subcomponents } = view;
  var { root, homeButtonContainer, inOutButtonContainer} = nodes;
  var { zoomHomeButton, zoomInButton, zoomOutButton } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(homeButtonContainer.node);
  root.appendChildNode(inOutButtonContainer.node);
  homeButtonContainer.appendChildNode(zoomHomeButton.rootNode);
  inOutButtonContainer.appendChildNode(zoomInButton.rootNode);
  inOutButtonContainer.appendChildNode(zoomOutButton.rootNode);

  //public api -----------------------------------------------------------------

  this.enableButtons = function(){
    zoomHomeButton.enable();
    zoomInButton.enable();
    zoomOutButton.enable();
  };

  this.disableButtons = function(){
    zoomHomeButton.disable();
    zoomInButton.disable();
    zoomOutButton.disable();
  };

}
