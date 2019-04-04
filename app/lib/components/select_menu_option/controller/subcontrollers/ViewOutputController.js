export default function SelectMenuOptionViewOutputController(view){

  var { nodes } = view;
  var { root, iconContainer, icon, labelName } = nodes;

  //define view rections -------------------------------------------------------

  var updateIconVisibility = function(isSelected){
    if (isSelected){
      icon.setStyle('visibility', 'visible');
    } else {
      icon.setStyle('visibility', 'hidden');
    }
  }

  var updateLabelIndent = function(isOpen){
    if (isOpen){
      labelName.setIndentStyle('visible');
    } else {
      labelName.setIndentStyle('hidden');
    }
  }

  var updateIconChar = function(isOpen){
    if (isOpen){
      icon.setChar('check');
    } else {
      icon.setChar('arrow');
    }
  }

  var updateIconBorderVisibility = function(isOpen){
    if (isOpen){
      iconContainer.setBorderVisibility('hidden');
    } else {
      iconContainer.setBorderVisibility('visible');
    }
  }

  var updateRootBorderRadius = function(isSelected, isOpen){
    if (isSelected && !isOpen){
      root.setBorderRadius('rounded');
    } else {
      root.setBorderRadius('default');
    }
  }

  var updateRootVisibility = function(isSelected, isOpen){
    if (isSelected || isOpen){
      root.setStyle('visibility', 'visible');
    } else {
      root.setStyle('visibility', 'hidden');
    }
  }

  var updateRootHeight = function(isSelected, isOpen, isTransitioning = true){
    if (isSelected || isOpen){
      return root.setHeight('expanded', isTransitioning);
    } else {
      return root.setHeight('contracted', isTransitioning);
    }
  }

  var updateRootOpacity = function(isSelected, isOpen, isTransitioning = true){
    if (isSelected || isOpen){
      return root.setOpacity('1', isTransitioning);
    } else {
      return root.setOpacity('0', isTransitioning);
    }
  }

  //public api -----------------------------------------------------------------

  this.updateSelectedStyling = function(isSelected, isOpen){
    updateIconVisibility(isSelected);
    updateRootBorderRadius(isSelected, isOpen);
    updateRootVisibility(isSelected, isOpen);
    updateRootHeight(isSelected, isOpen, false);
    updateRootOpacity(isSelected, isOpen, false);
  };

  this.updateLabelIndent = updateLabelIndent;

  this.updateIconChar = updateIconChar;

  this.updateIconBorderVisibility = updateIconBorderVisibility;

  this.updateRootBorderRadius = updateRootBorderRadius;

  this.updateRootVisibility = updateRootVisibility;

  this.updateRootHeight = function(isSelected, isOpen){
    if (!isSelected){
      return updateRootHeight(isSelected, isOpen, true);
    }
  };

  this.updateRootOpacity = function(isSelected, isOpen){
    if (!isSelected){
      return updateRootOpacity(isSelected, isOpen, true);
    };
  };
}
