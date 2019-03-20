export default function LoaderViewController(view){

  var { nodes } = view;
  var { root, animation } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(animation.node);

  //public api -----------------------------------------------------------------

  this.show = function(){
    animation.setVisibility('visible');
    root.setOpacity('1');
    root.setVisibility('visible');
  };

  this.hide = function(){
    animation.setVisibility('hidden');
    root.setOpacity('0');
    root.setVisibility('hidden');
  };

  this.fadeAndHide = async function(){
    animation.setVisibility('hidden');
    await root.transitionOpacity('0');
    root.setVisibility('hidden');
  };

}
