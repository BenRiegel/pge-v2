export default function ViewController(view){

  //configure dom --------------------------------------------------------------

  view.nodes.container.appendChildNode(view.nodes.homeButtonContainer.node);
  view.nodes.container.appendChildNode(view.nodes.inOutButtonContainer.node);
  view.nodes.zoomHomeButton.appendChildNode(view.nodes.zoomHomeIcon.node);
  view.nodes.zoomInButton.appendChildNode(view.nodes.zoomInIcon.node);
  view.nodes.zoomOutButton.appendChildNode(view.nodes.zoomOutIcon.node);
  view.nodes.homeButtonContainer.appendChildNode(view.nodes.zoomHomeButton.node);
  view.nodes.inOutButtonContainer.appendChildNode(view.nodes.zoomInButton.node);
  view.nodes.inOutButtonContainer.appendChildNode(view.nodes.zoomOutButton.node);

  //define reactions -----------------------------------------------------------

  var broadcastPublic = function(...args){
    if (view.props.inputEnabled){
      view.emitter.public.broadcast(...args);
    }
  }

  //load reactions -------------------------------------------------------------

  view.nodes.zoomHomeButton.setEventListener('click', broadcastPublic);
  view.nodes.zoomInButton.setEventListener('click', broadcastPublic);
  view.nodes.zoomOutButton.setEventListener('click', broadcastPublic);

}
