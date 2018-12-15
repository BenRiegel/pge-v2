//imports ----------------------------------------------------------------------

import NodeInstance from '../lib/NodeInstance.js';
import '../../stylesheets/select_menu_option_container.scss';


//exports ----------------------------------------------------------------------

export default function NewSelectMenuOptionContainer(key){

  // view ----------------------------------------------------------------------

  var container = new NodeInstance('div');
  container.className = 'option';
  container.dataset = {key};

  var updateBorderRadius = function(isOpen, isSelected){
    var newClassName = (!isOpen && isSelected) ? 'rounded' : '';
    container.updateClassList('borderRadius', newClassName);
  };

  var updateVisibility = function(isOpen, isSelected){
    var newVisibilityValue = (isOpen || isSelected) ? 'visible' : 'hidden';
    container.setStyle('visibility', newVisibilityValue);
  };

  var updateHeight = async function(isOpen, isSelected){
    var expandedHeight = container.getComputedStyle('line-height');
    var newHeightValue = (isOpen || isSelected) ? expandedHeight : '0';
    await container.transitionSetStyle('height', newHeightValue);
  };

  var updateOpacity = async function(isOpen, isSelected){
    var newOpacityValue = (isOpen || isSelected) ? '1' : '0';
    await container.transitionSetStyle('opacity', newOpacityValue);
  };

  var pause = async function(isNeeded){
    await container.animateAddClass('paused');
    container.removeClassName('paused');
  };

  // public api ----------------------------------------------------------------

  return {
    rootNode: container.rootNode,

    onIsOpenChange: async function(isOpen, isSelected, isAnimating){
      if (isOpen){
        updateBorderRadius(isOpen, isSelected);
        updateVisibility(isOpen, isSelected);
        await updateHeight(isOpen, isSelected);
        await updateOpacity(isOpen, isSelected);
        if (isSelected && isAnimating){
          await pause();
        }
      } else {
        if (isSelected && isAnimating){
          await pause();
        }
        await updateOpacity(isOpen, isSelected);
        await updateHeight(isOpen, isSelected);
        updateVisibility(isOpen, isSelected);
        updateBorderRadius(isOpen, isSelected);
      }
    }
  }

}
