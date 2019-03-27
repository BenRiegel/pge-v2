export default function SelectMenuOptionViewController(view, config, model, menuModel, dispatcher){

  var { nodes } = view;
  var { root, iconContainer, icon } = nodes;
  var { labelContainer, labelName, labelCount } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(iconContainer.node);
  root.appendChildNode(labelContainer.node);
  iconContainer.appendChildNode(icon.node);
  labelContainer.appendChildNode(labelName.node);
  labelContainer.appendChildNode(labelCount.node);

  //define view rections -------------------------------------------------------

  var updateIconVisibility = function(){
    if (model.isSelected){
      icon.setVisibility('visible');
    } else {
      icon.setVisibility('hidden');
    }
  }

  var updateLabelIndent = function(){
    if (config.label.isIndented){
      if (menuModel.isOpen){
        labelName.setIndentStyle('visible');
      } else {
        labelName.setIndentStyle('hidden');
      }
    } else {
      labelName.setIndentStyle('none');
    }
  }

  var updateIconChar = function(){
    if (menuModel.isOpen){
      icon.setChar('check');
    } else {
      icon.setChar('arrow');
    }
  }

  var updateIconBorderVisibility = function(){
    if (menuModel.isOpen){
      iconContainer.setBorderVisibility('hidden');
    } else {
      iconContainer.setBorderVisibility('visible');
    }
  }

  var updateRootBorderRadius = function(){
    if (model.isSelected && !menuModel.isOpen){
      root.setBorderRadius('rounded');
    } else {
      root.setBorderRadius('default');
    }
  }

  var updateRootVisibility = function(){
    if (model.isSelected || menuModel.isOpen){
      root.setVisibility('visible');
    } else {
      root.setVisibility('hidden');
    }
  }

  var updateRootHeight = function(isTransitioning = true){
    if (model.isSelected || menuModel.isOpen){
      return root.setHeight('expanded', isTransitioning && !model.isSelected);
    } else {
      return root.setHeight('contracted', isTransitioning && !model.isSelected);
    }
  }

  var updateRootOpacity = function(isTransitioning = true){
    if (model.isSelected || menuModel.isOpen){
      return root.setOpacity('1', isTransitioning && !model.isSelected);
    } else {
      return root.setOpacity('0', isTransitioning && !model.isSelected);
    }
  }

  //define event rections ------------------------------------------------------

  var onNewSelectedOption = function(){
    if (model.props.isSelected.hasChanged){
      updateIconVisibility();
    }
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('view', 'newSelectedOption', onNewSelectedOption);
  dispatcher.setListener('view', 'labelIndent', updateLabelIndent);
  dispatcher.setListener('view', 'iconChar', updateIconChar);
  dispatcher.setListener('view', 'iconBorderVisibility', updateIconBorderVisibility);
  dispatcher.setListener('view', 'rootBorderRadius', updateRootBorderRadius);
  dispatcher.setListener('view', 'rootVisibility', updateRootVisibility);
  dispatcher.setListener('view', 'rootHeight', updateRootHeight);
  dispatcher.setListener('view', 'rootOpacity', updateRootOpacity);

  //init -----------------------------------------------------------------------

  updateIconVisibility();
  updateLabelIndent();
  updateIconChar();
  updateIconBorderVisibility();
  updateRootBorderRadius();
  updateRootVisibility();
  updateRootHeight(false);
  updateRootOpacity(false);

}
