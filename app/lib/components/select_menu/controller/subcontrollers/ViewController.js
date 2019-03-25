//imports ----------------------------------------------------------------------

import Option from '../../../select_menu_option/SelectMenuOption.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuViewController(view, model, dispatcher){

  var { nodes, subcomponents } = view;
  var { root } = nodes;

  //helper functions -----------------------------------------------------------

  var doForAllOptions = function(methodName, ...args){
    for (var option of subcomponents){
      option[methodName](...args);
    }
  }

  var doForAllOptionsAsync = function(methodName, ...args){
    var promises = [];
    for (var option of subcomponents){
      var p = option[methodName](...args);
      promises.push(p);
    }
    return Promise.all(promises);
  }

  //event reactions ------------------------------------------------------------

  var updateRootBorderRadius = function(){
    if (model.isOpen){
      root.setBorderRadius('default');
    } else {
      root.setBorderRadius('rounded');
    }
  }

  var onLoadOptions = function( {optionsData} ){
    for (var optionData of optionsData){
      var option = new Option(optionData, model);
      root.appendChildNode(option.rootNode);
      subcomponents.push(option);
    }
  }

  var updateOptionViews = async function(){
    if (model.isOpen){
      updateRootBorderRadius();
      doForAllOptions('updateLabelIndent');
      doForAllOptions('updateIconChar');
      doForAllOptions('updateIconBorderVisibility');
      doForAllOptions('updateRootBorderRadius');
      doForAllOptions('updateRootVisibility');
      await doForAllOptionsAsync('transitionRootHeight');
      await doForAllOptionsAsync('transitionRootOpacity');
    } else {
      await doForAllOptionsAsync('transitionRootOpacity');
      await doForAllOptionsAsync('transitionRootHeight');
      doForAllOptions('updateRootVisibility');
      doForAllOptions('updateRootBorderRadius');
      doForAllOptions('updateIconBorderVisibility');
      doForAllOptions('updateIconChar');
      doForAllOptions('updateLabelIndent');
      updateRootBorderRadius();
    }
  }

  var onOptionClick = async function(){
    if (model.newSelectedOption){
      doForAllOptions('onNewSelectedOption');
    }
    if (model.newOpenState){
      await updateOptionViews();
    }
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('view', 'loadOptions', onLoadOptions);
  dispatcher.setListener('view', 'optionClick', onOptionClick);

  //init -----------------------------------------------------------------------

  updateRootBorderRadius();

}
