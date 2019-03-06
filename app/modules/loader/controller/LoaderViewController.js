export default function LoaderViewController(view){

  //configure dom --------------------------------------------------------------

  view.nodes.animationContainer.appendChildNode(view.nodes.animation.node);

  //define state change reactions ----------------------------------------------

  var show = function(){
    view.nodes.animationContainer.setOpaque();
    view.nodes.animationContainer.setVisible();
    view.nodes.animation.setVisible();
  }

  var hide = async function(){
    view.nodes.animation.setHidden();
    view.nodes.animationContainer.setTransparent();
    view.nodes.animationContainer.setHidden();
  }

  var hideAndFade = async function(){
    view.nodes.animation.setHidden();
    await view.nodes.animationContainer.transitionToTransparent();
    view.nodes.animationContainer.setHidden();
  }

  //init -----------------------------------------------------------------------

  hide();

  //public api -----------------------------------------------------------------

  this.show = show;

  this.hide = hide;

  this.hideAndFade = hideAndFade;

}
