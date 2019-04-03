export default function LoaderViewDomController(view){

  var { nodes } = view;
  var { root, animation } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(animation.node);

}
