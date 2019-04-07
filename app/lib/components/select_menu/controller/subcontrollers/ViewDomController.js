export default function SelectMenuViewDomController(view){

  var { nodes } = view;
  var { root } = nodes;

  //public api -----------------------------------------------------------------

  this.addOption = function(option){
    root.appendChildNode(option.rootNode);
  };

}
