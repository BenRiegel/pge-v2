export default function LoaderViewController(view, model, dispatcher){

  var { nodes } = view;
  var { root, animation } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(animation.node);

  //define view reactions ------------------------------------------------------

  var updateAnimationVisibility = function(){
    if (model.isActive){
      animation.setVisibility('visible');
    } else {
      animation.setVisibility('hidden');
    }
  };

  var updateRootOpacity = function(){
    if (model.isActive){
      root.setOpacity('1');
    } else {
      root.setOpacity('0');
    }
  };

  var updateRootOpacityAsync = function(){
    if (model.isActive){
      return root.setOpacity('1', true);
    } else {
      return root.setOpacity('0', true);
    }
  };

  var updateRootVisibility = function(){
    if (model.isActive){
      root.setVisibility('visible');
    } else {
      root.setVisibility('hidden');
    }
  };

  var updateViewProps = function(){
    updateAnimationVisibility();
    updateRootOpacity();
    updateRootVisibility();
  };

  var updateViewPropsAsync = async function(){
    updateAnimationVisibility();
    await updateRootOpacityAsync();
    updateRootVisibility();
  };

  //define event reactions -----------------------------------------------------

  var onUpdateIsActive = function(){
    if (model.props.isActive.hasChanged){
      if (dispatcher.isAsync){
        return updateViewPropsAsync();
      } else {
        updateViewProps();
      }
    }
  };

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('view', 'updateIsActive', onUpdateIsActive);

  //init -----------------------------------------------------------------------

  updateAnimationVisibility();
  updateRootOpacity();
  updateRootVisibility();

}
