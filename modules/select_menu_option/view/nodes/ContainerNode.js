//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ContainerNode(menuState, optionState, key){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', 'option');
  container.dataset = { key };

  container.setRoundedBorder = function(){
    this.addClass('rounded');
  };

  container.setDefaultBorder = function(){
    this.removeClass('rounded');
  };

  container.setExpanded = function(){
    this.addClass('expanded');
  };

  container.setContracted = function(){
    this.removeClass('expanded');
  };

  container.animateExpand = async function(){
    await this.animateAddClass('animate-expand');
  };

  container.animateContract = async function(){
    await this.animateAddClass('animate-contract');
  };

  //define state change reactions ----------------------------------------------

  var updateVisibility = function(){
    if (menuState.isOpen || optionState.isSelected){
      container.show();
    } else {
      container.hide();
    }
  };

  var updateBorderRadius = function(){
    if (!menuState.isOpen && optionState.isSelected){
      container.setRoundedBorder();
    } else {
      container.setDefaultBorder();
    }
  };

  var updateHeight = async function(isAnimating){
    if (menuState.isOpen || optionState.isSelected){
      container.setExpanded();
      if (isAnimating && !optionState.isSelected){
        await container.animateExpand();
      }
    } else {
      container.setContracted();
      if (isAnimating && !optionState.isSelected){
        await container.animateContract();
      }
    }
  };

  var updateOpacity = async function(isAnimating){
    if (menuState.isOpen || optionState.isSelected){
      container.setOpaque();
      if (isAnimating && !optionState.isSelected){
        await container.fadeIn();
      }
    } else {
      container.setTransparent();
      if (isAnimating && !optionState.isSelected){
        await container.fadeOut();
      }
    }
  };

  //load reactions -------------------------------------------------------------

  optionState.addListener('isSelected', 'optionContainer', 'allProps', () => {
    updateVisibility();
    updateBorderRadius();
    updateHeight(false);
    updateOpacity(false);
  });

  menuState.addListener('isOpen', 'optionContainer', 'visibility', updateVisibility);

  menuState.addListener('isOpen', 'optionContainer', 'borderRadius', updateBorderRadius);

  menuState.addListener('isOpen', 'optionContainer', 'height', async () => {
    await updateHeight(true);
  });

  menuState.addListener('isOpen', 'optionContainer', 'opacity', async () => {
    await updateOpacity(true);
  });

  //public api -----------------------------------------------------------------

  this.node = container.node;

  this.render = function(){
    updateVisibility();
    updateBorderRadius();
    updateHeight(false);
    updateOpacity(false);
  }
}
