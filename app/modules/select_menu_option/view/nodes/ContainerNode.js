//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/option_container.scss';


//exports ----------------------------------------------------------------------

export default function ContainerNode(menuState, optionState, key){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', 'option');
  container.dataset = { key };

  container.setBorderStyle = function(value){
    if (value === 'rounded'){
      this.addClass('rounded');
    } else if (value === 'default'){
      this.removeClass('rounded');
    }
  }

  container.setHeight = function(value){
    if (value === 'expanded'){
      this.addClass('expanded');
    } else if (value === 'contracted'){
      this.removeClass('expanded');
    }
  }

  container.animateHeight = async function(value){
    if (value === 'expanded'){
      this.addClass('expanded');
      await this.animateAddClass('animate-expand');
    } else if (value === 'contracted'){
      this.removeClass('expanded');
      await this.animateAddClass('animate-contract');
    }
  }

  //define state change reactions ----------------------------------------------

  var updateVisibility = function(){
    if (menuState.isOpen || optionState.isSelected){
      container.setVisibility('visible');
    } else {
      container.setVisibility('hidden');
    }
  };

  var updateBorderRadius = function(){
    if (!menuState.isOpen && optionState.isSelected){
      container.setBorderStyle('rounded');
    } else {
      container.setBorderStyle('default');
    }
  };

  var updateHeight = async function(){
    if (menuState.isOpen || optionState.isSelected){
      if (optionState.isAnimating){
        await container.animateHeight('expanded');
      } else {
        container.setHeight('expanded');
      }
    } else {
      if (optionState.isAnimating){
        await container.animateHeight('contracted');
      } else {
        container.setHeight('contracted');
      }
    }
  };

  var updateOpacity = async function(){
    if (menuState.isOpen || optionState.isSelected){
      if (optionState.isAnimating){
        await container.animateOpacity('opaque');
      } else {
        container.setOpacity('opaque');
      }
    } else {
      if (optionState.isAnimating){
        await container.animateOpacity('transparent');
      } else {
        container.setOpacity('transparent');
      }
    }
  };

  //load reactions -------------------------------------------------------------

  optionState.addListener('isSelected', 'optionContainer', 'visibility', updateVisibility);
  optionState.addListener('isSelected', 'optionContainer', 'borderRadius', updateBorderRadius);
  optionState.addListener('isSelected', 'optionContainer', 'height', updateHeight);
  optionState.addListener('isSelected', 'optionContainer', 'opacity', updateOpacity);
  menuState.addListener('isOpen', 'optionContainer', 'visibility', updateVisibility);
  menuState.addListener('isOpen', 'optionContainer', 'borderRadius', updateBorderRadius);
  menuState.addListener('isOpen', 'optionContainer', 'height', updateHeight);
  menuState.addListener('isOpen', 'optionContainer', 'opacity', updateOpacity);

  //init dom element -----------------------------------------------------------

  updateVisibility();
  updateBorderRadius();
  updateHeight();
  updateOpacity();

  //public api -----------------------------------------------------------------

  this.node = container.node;

  }
