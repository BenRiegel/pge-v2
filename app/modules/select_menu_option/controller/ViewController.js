export default function ViewController(labelIsIndented, menuState, optionState, view){

  var { nodes } = view;
  var { container, iconContainer, icon } = nodes;
  var { labelContainer, labelName, labelCount } = nodes;

  //configure dom --------------------------------------------------------------

  container.node.appendChild(iconContainer.node);
  container.node.appendChild(labelContainer.node);
  iconContainer.node.appendChild(icon.node);
  labelContainer.node.appendChild(labelName.node);
  labelContainer.node.appendChild(labelCount.node);

  //define state change rections -----------------------------------------------

  var updateIconVisibility = function(){
    if (optionState.isSelected){
      icon.props.visibility.set('visible');
    } else {
      icon.props.visibility.set('hidden');
    }
  }

  var updateLabelIndent = function(){
    if (labelIsIndented){
      if (menuState.isOpen){
        labelName.props.indent.set('indent-visible');
      } else {
        labelName.props.indent.set('indent-hidden');
      }
    }
  }

  var updateIconChar = function(){
    if (menuState.isOpen){
      icon.props.char.set('check');
    } else {
      icon.props.char.set('arrow');
    }
  }

  var updateIconBorderVisibility = function(){
    if (menuState.isOpen){
      iconContainer.props.border.set('no-border');
    } else {
      iconContainer.props.border.set('border');
    }
  }

  var updateContainerBorderRadius = function(){
    if (optionState.isSelected && !menuState.isOpen){
      container.props.borderRadiusStyle.set('rounded');
    } else {
      container.props.borderRadiusStyle.set('default');
    }
  }

  var updateContainerVisibility = function(){
    if (optionState.isSelected || menuState.isOpen){
      container.props.visibility.set('visible');
    } else {
      container.props.visibility.set('hidden');
    }
  }

  var updateContainerHeight = function(){
    if (optionState.isSelected || menuState.isOpen){
      container.props.height.set('expanded');
    } else {
      container.props.height.set('contracted');
    }
  }

  var transitionContainerHeight = function(){
    if (optionState.isSelected || menuState.isOpen){
      return container.props.height.transition('expanded');
    } else {
      return container.props.height.transition('contracted');
    }
  }

  var updateContainerOpacity = function(){
    if (optionState.isSelected || menuState.isOpen){
      container.props.opacity.set('1');
    } else {
      container.props.opacity.set('0');
    }
  }

  var transitionContainerOpacity = function(){
    if (optionState.isSelected || menuState.isOpen){
      return container.props.opacity.transition('1');
    } else {
      return container.props.opacity.transition('0');
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
