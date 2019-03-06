export default function ViewController(view){

  //configure dom --------------------------------------------------------------

  view.nodes.container.appendChildNode(view.nodes.icon.node);

  //define reactions -----------------------------------------------------------

  var broadcastPublic = function(...args){
    view.emitter.public.broadcast(...args);
  }

  //load reactions -------------------------------------------------------------

  view.nodes.container.setEventListener('click', broadcastPublic);

}
