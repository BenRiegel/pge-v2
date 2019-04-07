export default function SelectMenuOptionViewDomController(view){

  var { nodes } = view;
  var { root, name, count } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(name.node);
  root.appendChildNode(count.node);
  
}
