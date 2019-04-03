export default function SelectMenuOptionViewDomController(view){

  var { nodes } = view;
  var { root, iconContainer, icon } = nodes;
  var { labelContainer, labelName, labelCount } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(iconContainer.node);
  root.appendChildNode(labelContainer.node);
  iconContainer.appendChildNode(icon.node);
  labelContainer.appendChildNode(labelName.node);
  labelContainer.appendChildNode(labelCount.node);

}
