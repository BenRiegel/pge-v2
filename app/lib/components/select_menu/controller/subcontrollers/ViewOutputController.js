export default function SelectMenuViewOutputController(view){

  var { nodes, subcomponents } = view;
  var { root } = nodes;

  //helper functions -----------------------------------------------------------

  var doForAllOptions = function(methodName, ...args){
    for (var option of subcomponents){
      option[methodName](...args);
    }
  };

  var doForAllOptionsAsync = function(methodName, ...args){
    var promises = [];
    for (var option of subcomponents){
      var p = option[methodName](...args);
      promises.push(p);
    }
    return Promise.all(promises);
  };

  //public api -----------------------------------------------------------------

  this.addOption = function(option){
    subcomponents.push(option);
  };

  this.updateSelectedStyling = function(selectedOptionKey, isOpen){
    for (var option of subcomponents){
      option.updateIsSelected(selectedOptionKey, isOpen);
    }
  };

  this.updateOpenStyling = async function(isOpen){
    if (isOpen){
      root.setBorderRadius('default');
      doForAllOptions('updateLabelIndent', isOpen);
      doForAllOptions('updateIconChar', isOpen);
      doForAllOptions('updateIconBorderVisibility', isOpen);
      doForAllOptions('updateRootBorderRadius', isOpen);
      doForAllOptions('updateRootVisibility', isOpen);
      await doForAllOptionsAsync('updateRootHeight', isOpen);
      await doForAllOptionsAsync('updateRootOpacity', isOpen);
    } else {
      await doForAllOptionsAsync('updateRootOpacity', isOpen);
      await doForAllOptionsAsync('updateRootHeight', isOpen);
      doForAllOptions('updateRootVisibility', isOpen);
      doForAllOptions('updateRootBorderRadius', isOpen);
      doForAllOptions('updateIconBorderVisibility', isOpen);
      doForAllOptions('updateIconChar', isOpen);
      doForAllOptions('updateLabelIndent', isOpen);
      root.setBorderRadius('rounded');
    }
  };

}
