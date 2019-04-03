export default function SelectMenuViewOutputController(view, model, dispatcher){

  var { nodes, subcomponents } = view;
  var { root } = nodes;

  //helper functions -----------------------------------------------------------

  var updateOptions = function(propName, ...args){
    for (var option of subcomponents){
      option.update(propName, ...args);
    }
  };

  var updateOptionsAsync = function(propName, ...args){
    var promises = [];
    for (var option of subcomponents){
      var p = option.update(propName, ...args);
      promises.push(p);
    }
    return Promise.all(promises);
  };

  //define view reactions ------------------------------------------------------

  var updateRootBorderRadius = function(){
    if (model.isOpen){
      root.setBorderRadius('default');
    } else {
      root.setBorderRadius('rounded');
    }
  }

  var updateSelectedStyling = function(){
    updateOptions('newSelectedOption');
  }

  var updateOpenStyling = async function(){
    if (model.isOpen){
      updateRootBorderRadius();
      updateOptions('labelIndent');
      updateOptions('iconChar');
      updateOptions('iconBorderVisibility');
      updateOptions('rootBorderRadius');
      updateOptions('rootVisibility');
      await updateOptionsAsync('rootHeight');
      await updateOptionsAsync('rootOpacity');
    } else {
      await updateOptionsAsync('rootOpacity');
      await updateOptionsAsync('rootHeight');
      updateOptions('rootVisibility');
      updateOptions('rootBorderRadius');
      updateOptions('iconBorderVisibility');
      updateOptions('iconChar');
      updateOptions('labelIndent');
      updateRootBorderRadius();
    }
  }

  //define event reactions -----------------------------------------------------

  var onOptionClick = async function(){
    if (model.props.selectedOptionKey.hasChanged){
      updateSelectedStyling();
    }
    if (model.props.isOpen.hasChanged){
      await updateOpenStyling();
    }
  }

  var onForceClose = async function(){
    if (model.props.isOpen.hasChanged){
      await updateOpenStyling();
    }
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('viewOutput', 'optionClick', onOptionClick);
  dispatcher.setListener('viewOutput', 'forceClose', onForceClose);

  //init -----------------------------------------------------------------------

  updateRootBorderRadius();

}
