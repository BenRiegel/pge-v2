export default function ViewController(state, view){

  //define state change reactions ----------------------------------------------

  var updateContainerChildren = function(){
    view.nodes.container.removeAllChildNodes();
    var childNodes = state.graphics.map( graphic => graphic.rootNode );
    view.nodes.container.appendChildNodes(childNodes);
  }

  var broadcastPublic = function(...args){
    if (view.props.inputEnabled){
      view.emitter.public.broadcast(...args);
    }
  }

  //load reactions -------------------------------------------------------------

  state.addListener('graphics', updateContainerChildren);

  view.nodes.container.setEventListener('click', broadcastPublic);

}
