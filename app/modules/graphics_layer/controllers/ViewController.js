export default function ViewController(state, view){

  var { nodes } = view;
  var { container } = nodes;

  //define state change reactions ----------------------------------------------

  var updateContainerChildren = function(){
    var childNodes = state.graphics.map( graphic => graphic.rootNode );
    container.props.children.set(childNodes);
  }

  //load reactions -------------------------------------------------------------

  state.addListener('graphics', updateContainerChildren);

}
