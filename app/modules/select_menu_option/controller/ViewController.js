export default function ViewController(labelIsIndented, menuState, optionState, view){

  //configure dom --------------------------------------------------------------

  view.nodes.container.appendChildNode(view.nodes.iconContainer.node);
  view.nodes.container.appendChildNode(view.nodes.labelContainer.node);
  view.nodes.iconContainer.appendChildNode(view.nodes.icon.node);
  view.nodes.labelContainer.appendChildNode(view.nodes.labelName.node);
  view.nodes.labelContainer.appendChildNode(view.nodes.labelCount.node);

  //define state change rections -----------------------------------------------

  var updateIconVisibility = function(){
    if (optionState.isSelected){
      view.nodes.icon.setVisible();
    } else {
      view.nodes.icon.setHidden();
    }
  }

  var updateLabelIndent = function(){
    if (labelIsIndented){
      if (menuState.isOpen){
        view.nodes.labelName.showIndent();
      } else {
        view.nodes.labelName.hideIndent();
      }
    }
  }

  var updateIconChar = function(){
    if (menuState.isOpen){
      view.nodes.icon.setChar('check');
    } else {
      view.nodes.icon.setChar('arrow');
    }
  }

  var updateIconBorderVisibility = function(){
    if (menuState.isOpen){
      view.nodes.iconContainer.hideBorder();
    } else {
      view.nodes.iconContainer.showBorder();
    }
  }

  var updateContainerBorderRadius = function(){
    if (optionState.isSelected && !menuState.isOpen){
      view.nodes.container.setRoundedBorderRadius();
    } else {
      view.nodes.container.setDefaultBorderRadius();
    }
  }

  var updateContainerVisibility = function(){
    if (optionState.isSelected || menuState.isOpen){
      view.nodes.container.setVisible();
    } else {
      view.nodes.container.setHidden();
    }
  }

  var updateContainerHeight = function(){
    if (optionState.isSelected || menuState.isOpen){
      view.nodes.container.setExpanded();
    } else {
      view.nodes.container.setContracted();
    }
  }

  var transitionContainerHeight = function(){
    if (optionState.isSelected || menuState.isOpen){
      return view.nodes.container.transitionToExpanded();
    } else {
      return view.nodes.container.transitionToContracted();
    }
  }

  var updateContainerOpacity = function(){
    if (optionState.isSelected || menuState.isOpen){
      view.nodes.container.setOpaque();
    } else {
      view.nodes.container.setTransparent();
    }
  }

  var transitionContainerOpacity = function(){
    if (optionState.isSelected || menuState.isOpen){
      return view.nodes.container.transitionToOpaque();
    } else {
      return view.nodes.container.transitionToTransparent();
    }
  }

  //load reactions -------------------------------------------------------------

  optionState.addListener('isSelected', updateIconVisibility);
  optionState.addListener('isSelected', updateContainerBorderRadius);
  optionState.addListener('isSelected', updateContainerVisibility);
  optionState.addListener('isSelected', updateContainerHeight);
  optionState.addListener('isSelected', updateContainerOpacity);
  menuState.addListenerByType('isOpen', 'optionLabelIndent', updateLabelIndent);
  menuState.addListenerByType('isOpen', 'optionIconChar', updateIconChar);
  menuState.addListenerByType('isOpen', 'optionIconBorderVisibility', updateIconBorderVisibility);
  menuState.addListenerByType('isOpen', 'optionContainerBorderRadius', updateContainerBorderRadius);
  menuState.addListenerByType('isOpen', 'optionContainerVisibility', updateContainerVisibility);
  menuState.addListenerByType('isOpen', 'optionContainerHeight', transitionContainerHeight);
  menuState.addListenerByType('isOpen', 'optionContainerOpacity', transitionContainerOpacity);

  //init -----------------------------------------------------------------------

  updateIconVisibility();
  updateLabelIndent();
  updateIconChar();
  updateIconBorderVisibility();
  updateContainerBorderRadius();
  updateContainerVisibility();
  updateContainerHeight();
  updateContainerOpacity();

}
