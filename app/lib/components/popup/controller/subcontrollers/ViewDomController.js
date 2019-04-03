export default function PopupViewDomController(view){

  var { nodes, subcomponents } = view;
  var { root } = nodes;
  var { summary, report } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(summary.rootNode);
  root.appendChildNode(report.rootNode);

}
