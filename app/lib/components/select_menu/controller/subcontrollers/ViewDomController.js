export default function SelectMenuViewDomController(view){

  var { nodes } = view;
  var { root } = nodes;

  //public api -----------------------------------------------------------------

  this.addOptionNode = function(optionNode){
    root.appendChildNode(optionNode);
  };

}
