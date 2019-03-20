export default function SelectMenuOptionViewController(view, labelIsIndented, menuState, optionState){

  var { nodes } = view;
  var { root, iconContainer, icon } = nodes;
  var { labelContainer, labelName, labelCount } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(iconContainer.node);
  root.appendChildNode(labelContainer.node);
  iconContainer.appendChildNode(icon.node);
  labelContainer.appendChildNode(labelName.node);
  labelContainer.appendChildNode(labelCount.node);

  //define state change rections -----------------------------------------------

  var updateIconVisibility = function(){
    if (optionState.isSelected){
      icon.setVisibility('visible');
    } else {
      icon.setVisibility('hidden');
    }
  }

  var updateLabelIndent = function(){
    if (labelIsIndented){
      if (menuState.isOpen){
        labelName.setIndentVisibility('visible');
      } else {
        labelName.setIndentVisibility('hidden');
      }
    }
  }

  var updateIconChar = function(){
    if (menuState.isOpen){
      icon.setChar('check');
    } else {
      icon.setChar('arrow');
    }
  }

  var updateIconBorderVisibility = function(){
    if (menuState.isOpen){
      iconContainer.setBorderVisibility('hidden');
    } else {
      iconContainer.setBorderVisibility('visible');
    }
  }

  var updateRootBorderRadius = function(){
    if (optionState.isSelected && !menuState.isOpen){
      root.setBorderRadius('rounded');
    } else {
      root.setBorderRadius('default');
    }
  }

  var updateRootVisibility = function(){
    if (optionState.isSelected || menuState.isOpen){
      root.setVisibility('visible');
    } else {
      root.setVisibility('hidden');
    }
  }

  var updateRootHeight = function(){
    if (optionState.isSelected || menuState.isOpen){
      root.setHeight('expanded');
    } else {
      root.setHeight('contracted');
    }
  }

  var transitionRootHeight = function(){
    if (!optionState.isSelected){
      if (menuState.isOpen){
        return root.transitionHeight('expanded');
      } else {
        return root.transitionHeight('contracted');
      }
    }
  }

  var updateRootOpacity = function(){
    if (optionState.isSelected || menuState.isOpen){
      root.setOpacity('1');
    } else {
      root.setOpacity('0');
    }
  }

  var transitionRootOpacity = function(){
    if (!optionState.isSelected){
      if (menuState.isOpen){
        return root.transitionOpacity('1');
      } else {
        return root.transitionOpacity('0');
      }
    }
  }

  //load reactions -------------------------------------------------------------

  optionState.addListener('isSelected', updateIconVisibility);
  optionState.addListener('isSelected', updateRootBorderRadius);
  optionState.addListener('isSelected', updateRootVisibility);
  optionState.addListener('isSelected', updateRootHeight);
  optionState.addListener('isSelected', updateRootOpacity);
  menuState.addListenerByType('isOpen', 'optionLabelIndent', updateLabelIndent);
  menuState.addListenerByType('isOpen', 'optionIconChar', updateIconChar);
  menuState.addListenerByType('isOpen', 'optionIconBorderVisibility', updateIconBorderVisibility);
  menuState.addListenerByType('isOpen', 'optionRootBorderRadius', updateRootBorderRadius);
  menuState.addListenerByType('isOpen', 'optionRootVisibility', updateRootVisibility);
  menuState.addListenerByType('isOpen', 'optionRootHeight', transitionRootHeight);
  menuState.addListenerByType('isOpen', 'optionRootOpacity', transitionRootOpacity);

  //init -----------------------------------------------------------------------

  updateIconVisibility();
  updateLabelIndent();
  updateIconChar();
  updateIconBorderVisibility();
  updateRootBorderRadius();
  updateRootVisibility();
  updateRootHeight();
  updateRootOpacity();

}
