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

  //define state change rections -----------------------------------------------

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
        labelName.setIndentVisibility('visible');
      } else {
        labelName.setIndentVisibility('hidden');
      }
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

  var updateRootHeight = function(){
    if (model.isSelected || menuModel.isOpen){
      root.setHeight('expanded');
    } else {
      root.setHeight('contracted');
    }
  }

  var transitionRootHeight = function(){
    if (!model.isSelected){
      if (menuModel.isOpen){
        return root.transitionHeight('expanded');
      } else {
        return root.transitionHeight('contracted');
      }
    }
  }

  var updateRootOpacity = function(){
    if (model.isSelected || menuModel.isOpen){
      root.setOpacity('1');
    } else {
      root.setOpacity('0');
    }
  }

  var transitionRootOpacity = function(){
    if (!model.isSelected){
      if (menuModel.isOpen){
        return root.transitionOpacity('1');
      } else {
        return root.transitionOpacity('0');
      }
    }
  }

  var onNewSelectedOption = function(){
    if (model.newIsSelectedValue){
      updateIconVisibility();
    }
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('view', 'newSelectedOption', onNewSelectedOption);

  //init -----------------------------------------------------------------------

  updateIconVisibility();
  updateLabelIndent();
  updateIconChar();
  updateIconBorderVisibility();
  updateRootBorderRadius();
  updateRootVisibility();
  updateRootHeight();
  updateRootOpacity();

  //public api -----------------------------------------------------------------

  this.updateIconVisibility = updateIconVisibility;
  this.updateLabelIndent = updateLabelIndent;
  this.updateIconChar = updateIconChar;
  this.updateIconBorderVisibility = updateIconBorderVisibility;
  this.updateRootBorderRadius = updateRootBorderRadius ;
  this.updateRootVisibility = updateRootVisibility;
  this.transitionRootHeight = transitionRootHeight;
  this.transitionRootOpacity = transitionRootOpacity;

}
