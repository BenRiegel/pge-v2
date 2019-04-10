export default function SelectMenuOptionViewOutputController(view, model){

  var { nodes } = view;
  var { root, icon } = nodes;

  //public api -----------------------------------------------------------------

  this.updateIconVisibility = function(){
    if (model.isSelected){
      icon.setStyle('visibility', 'visible');
    } else {
      icon.setStyle('visibility', 'hidden');
    }
  };

  this.updateIconChar = function(isOpen){
    if (isOpen){
      icon.setChar('check');
    } else {
      icon.setChar('arrow');
    }
  };

  this.updateIconBorderVisibility = function(isOpen){
    if (isOpen){
      icon.setBorderVisibility('hidden');
    } else {
      icon.setBorderVisibility('visible');
    }
  };

  this.updateRootBorderRadius = function(isOpen){
    if (model.isSelected && !isOpen){
      root.setBorderRadius('rounded');
    } else {
      root.setBorderRadius('default');
    }
  };

  this.updateRootVisibility = function(isOpen){
    if (model.isSelected || isOpen){
      root.setStyle('visibility', 'visible');
    } else {
      root.setStyle('visibility', 'hidden');
    }
  };

  this.updateRootHeight = function(isOpen, isTransitioning = true){
    if (model.isSelected || isOpen){
      if (!isTransitioning || model.isSelected){
        root.setHeight('expanded');
      } else {
        return root.transitionHeight('expanded');
      }
    //  return root.setHeight('expanded', isTransitioning && !model.isSelected);
    } else {
      if (!isTransitioning || model.isSelected){
        root.setHeight('contracted');
      } else {
        return root.transitionHeight('contracted');
      }

    //  return root.setHeight('contracted', isTransitioning && !model.isSelected);
    }
  };

  this.updateRootOpacity = function(isOpen, isTransitioning = true){
    if (model.isSelected || isOpen){
      if (!isTransitioning || model.isSelected){
        root.setStyle('opacity', '1');
      } else {
        return root.transitionStyle('opacity', '1');
      }
    } else {
      if (!isTransitioning || model.isSelected){
        root.setStyle('opacity', '0');
      } else {
        return root.transitionStyle('opacity', '0');
      }
    }
  };

  this.updateSelectedStyling = function(isOpen){
    if (model.props.isSelected.hasChanged){
      this.updateIconVisibility();
      this.updateRootBorderRadius(isOpen);
      this.updateRootVisibility(isOpen);
      this.updateRootHeight(isOpen, false);
      this.updateRootOpacity(isOpen, false);
    }
  };

  this.renderView = function(isOpen){
    this.updateIconVisibility();
    this.updateIconChar(isOpen);
    this.updateIconBorderVisibility(isOpen);
    this.updateRootVisibility(isOpen);
    this.updateRootVisibility(isOpen);
    this.updateRootHeight(isOpen, false);
    this.updateRootOpacity(isOpen, false);
  };

}
