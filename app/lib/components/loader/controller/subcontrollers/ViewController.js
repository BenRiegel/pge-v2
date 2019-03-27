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
  }

  var updateRootOpacity = function(isTransitioning = false){
    if (model.isActive){
      root.setOpacity('1', false);
    } else {
      return root.setOpacity('0', isTransitioning);
    }
  }

  var updateRootVisibility = function(){
    if (model.isActive){
      root.setVisibility('visible');
    } else {
      root.setVisibility('hidden');
    }
  }

  var updateProps = function(isFading){
    updateAnimationVisibility();
    updateRootOpacity(isFading);
    updateRootVisibility();
  }

  var updatePropsAsync = async function(isFading){
    updateAnimationVisibility();
    await updateRootOpacity(isFading);
    updateRootVisibility();
  }

  //define event reactions -----------------------------------------------------

  var onActivate = function(){
    if (model.props.isActive.hasChanged){
      updateProps(false);
    }
  };

  var onTerminate = function(isFading){
    if (model.props.isActive.hasChanged){
      if (isFading){
        return updatePropsAsync(isFading);
      } else {
        updateProps(isFading);
      }
    }
  };

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('view', 'activate', onActivate);
  dispatcher.setListener('view', 'terminate', onTerminate);

  //init -----------------------------------------------------------------------

  updateAnimationVisibility();
  updateRootOpacity(false);
  updateRootVisibility();

}
