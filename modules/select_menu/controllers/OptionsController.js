export default function NewOptionsController(state, options){

  //private code block ---------------------------------------------------------

  var setIconVisibility = function(option, isOpen, isSelected){
    if (isSelected){
      option.icon.show();
    } else {
      option.icon.hide();
    }
  };

  var setLabelIndent = function(option, isOpen){
    if (isOpen){
      option.labelContainer.showIndent();
    } else {
      option.labelContainer.hideIndent();
    }
  };

  var setIconBorder = function(option, isOpen){
    if (isOpen){
      option.iconContainer.hideBorder();
    } else {
      option.iconContainer.showBorder();
    }
  };

  var setIconChar = function(option, isOpen){
    if (isOpen){
      option.icon.displayCheck();
      } else {
      option.icon.displayArrow();
    }
  };

  var setOptionContainerVisibility = function(option, isOpen, isSelected){
    if (isOpen || isSelected){
      option.container.show();
    } else {
      option.container.hide();
    }
  };

  var setOptionContainerBorder = function(option, isOpen, isSelected){
    if (!isOpen && isSelected){
      option.container.setRoundedBorder();
    } else {
      option.container.setDefaultBorder();
    }
  };

  var setContainerHeight = function(option, isOpen, isSelected){
    if (isOpen || isSelected){
      option.container.setExpanded();
    } else {
      option.container.setContracted();
    }
  };

  var animateContainerHeight = function(option, isOpen, isSelected){
    if (isOpen){
      return option.container.animateExpand();
    } else {
      return option.container.animateContract();
    }
  };

  var setContainerOpacity = function(option, isOpen, isSelected){
    if (isOpen || isSelected){
      option.container.setOpaque();
    } else {
      option.container.setTransparent();
    }
  };

  var transitionContainerOpacity = function(option, isOpen, isSelected){
    if (isOpen){
      return option.container.transitionToOpaque();
    } else {
      return option.container.transitionToTransparent();
    }
  };

  var doForAllOptions = function(cb){
    var optionEntires =  Object.entries(options);
    for (var [key, option] of optionEntires){
      var isOpen = state.isOpen.value;
      var isSelected = (key === state.selectedOptionKey.value);
      cb(option, isOpen, isSelected)
    }
  };

  var doForAllUnselectedOptions = async function(cb){
    var promises = [];
    var optionEntires =  Object.entries(options);
    for (var [key, option] of optionEntires){
      var isOpen = state.isOpen.value;
      var isSelected = (key === state.selectedOptionKey.value);
      if (!isSelected){
        var p = cb(option, isOpen, isSelected)
        promises.push(p);
      }
    }
    await Promise.all(promises);
  };

  state.isOpen.addListener('option-label', () => {
    doForAllOptions(setLabelIndent);
  });

  state.isOpen.addListener('option-icon-border', () => {
    doForAllOptions(setIconBorder);
  });

  state.isOpen.addListener('option-icon-char', () => {
    doForAllOptions(setIconChar);
  });

  state.isOpen.addListener('option-container-border', () => {
    doForAllOptions(setOptionContainerBorder);
  });

  state.isOpen.addListener('option-container-visibility', () => {
    doForAllOptions(setOptionContainerVisibility);
  });

  state.isOpen.addListener('option-container-height', async (currentValue, previousValue) => {
    var isAnimating = (previousValue !== undefined);
    if (isAnimating){
      await doForAllUnselectedOptions(animateContainerHeight);
    } else {
      doForAllOptions(setContainerHeight);
    }
  });

  state.isOpen.addListener('option-container-opacity', async (currentValue, previousValue) => {
    var isAnimating = (previousValue !== undefined);
    if (isAnimating){
      await doForAllUnselectedOptions(transitionContainerOpacity);
    } else {
      doForAllOptions(setContainerOpacity);
    }
  });

  state.selectedOptionKey.addListener('option', () => {
    doForAllOptions(setIconVisibility);
  });

}
