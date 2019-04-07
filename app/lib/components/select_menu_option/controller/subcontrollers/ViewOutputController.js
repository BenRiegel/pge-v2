export default function SelectMenuOptionViewOutputController(view, model){

  var { nodes } = view;
  var { root, icon } = nodes;

  //public api -----------------------------------------------------------------

  this.updateIconVisibility = function(){
    if (model.isSelected){
      icon.setStyle('visibility', 'visible');
    } else {
      icon.setStyle('visibility', 'hidden');
    }
  };

  this.updateIconChar = function(isOpen){
    if (isOpen){
      icon.setChar('check');
    } else {
      icon.setChar('arrow');
    }
  };

  this.updateIconBorderVisibility = function(isOpen){
    if (isOpen){
      icon.setBorderVisibility('hidden');
    } else {
      icon.setBorderVisibility('visible');
    }
  };

  this.updateRootBorderRadius = function(isOpen){
    if (model.isSelected && !isOpen){
      root.setBorderRadius('rounded');
    } else {
      root.setBorderRadius('default');
    }
  };

  this.updateRootVisibility = function(isOpen){
    if (model.isSelected || isOpen){
      root.setStyle('visibility', 'visible');
    } else {
      root.setStyle('visibility', 'hidden');
    }
  };

  this.updateRootHeight = function(isOpen, isTransitioning = true){
    if (model.isSelected || isOpen){
      return root.setHeight('expanded', isTransitioning && !model.isSelected);
    } else {
      return root.setHeight('contracted', isTransitioning && !model.isSelected);
    }
  };

  this.updateRootOpacity = function(isOpen, isTransitioning = true){
    if (model.isSelected || isOpen){
      return root.setStyle('opacity', '1', isTransitioning && !model.isSelected);
    } else {
      return root.setStyle('opacity', '0', isTransitioning && !model.isSelected);
    }
  };

}
