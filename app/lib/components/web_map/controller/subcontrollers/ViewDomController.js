export default function WebMapViewDomController(view){

  var { nodes, subcomponents } = view;
  var { root } = nodes;
  var { selectMenu, zoomControls, popup, graphicsLayer, basemapLayer} = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(selectMenu.rootNode);
  root.appendChildNode(zoomControls.rootNode);
  root.appendChildNode(popup.rootNode);
  root.appendChildNode(graphicsLayer.rootNode);
  root.appendChildNode(basemapLayer.rootNode);

}
