export default function ZoomControlsViewDomController(view){

  var { nodes} = view;
  var { root, homeButtonContainer, inOutButtonContainer} = nodes;
  var { homeButton, inButton, outButton } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(homeButtonContainer.node);
  root.appendChildNode(inOutButtonContainer.node);
  homeButtonContainer.appendChildNode(homeButton.node);
  inOutButtonContainer.appendChildNode(inButton.node);
  inOutButtonContainer.appendChildNode(outButton.node);

}
