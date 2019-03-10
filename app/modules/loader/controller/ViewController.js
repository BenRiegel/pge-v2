export default function LoaderViewController(view, state){

  var { nodes } = view;
  var { root, animation } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(animation.node);

  //define state change reactions ----------------------------------------------

  var updateAnimationVisibility = function(){
    if (state.isActive){
      animation.setVisibility('visible');
    } else {
      animation.setVisibility('hidden');
    }
  }

  var updateRootVisibility = function(){
    if (state.isActive){
      root.setVisibility('visible');
    } else {
      root.setVisibility('hidden');
    }
  }

  var updateRootOpacity = function(){
    if (state.isActive){
      root.setOpacity('1');
    } else {
      if (view.isFading){
        return root.transitionOpacity('0');
      } else {
        root.setOpacity('0');
      }
    }
  }

  //load reactions -------------------------------------------------------------

  state.addListenerByType('isActive', 'animationVisibility', updateAnimationVisibility);
  state.addListenerByType('isActive', 'rootVisibility', updateRootVisibility);
  state.addListenerByType('isActive', 'rootOpacity', updateRootOpacity);

  //init -----------------------------------------------------------------------

  updateAnimationVisibility();
  updateRootVisibility();
  updateRootOpacity();

}
