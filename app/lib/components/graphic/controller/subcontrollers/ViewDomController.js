export default function GraphicViewDomController(view){

  var { nodes } = view;
  var { root, location, label } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(location.node);
  root.appendChildNode(label.node);

}
