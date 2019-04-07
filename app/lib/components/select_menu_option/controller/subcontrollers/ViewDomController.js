export default function SelectMenuOptionViewDomController(view, props){

  var { nodes } = view;
  var { root, icon } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(icon.node);
  root.appendChildNode(props.labelNode);

}
