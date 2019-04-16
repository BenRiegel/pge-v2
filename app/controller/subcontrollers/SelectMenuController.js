//imports ----------------------------------------------------------------------

import { INIT_SELECTED_TAG } from '../../config/Config.js';
import view from '../../view/View.js';
import Option from '../../lib/components/select_menu_option/SelectMenuOption.js';


//module code block ------------------------------------------------------------

var { components } = view;
var { selectMenu, labels } = components;

var loadOptions = function(){
  var keys = Object.keys(labels);
  for (var key of keys){
    var label = labels[key];
    var optionProps = {key, labelNode: label.rootNode};
    var option = new Option(optionProps);
    selectMenu.loadOption(key, option);
  }
};

//exports ----------------------------------------------------------------------

export function load(){
  loadOptions();
  selectMenu.setSelectedOption(INIT_SELECTED_TAG);
};

export function onActionStart(){
  selectMenu.close();
  selectMenu.disable();
};

export function onActionEnd(){
  selectMenu.enable();
};
