//imports ----------------------------------------------------------------------

import Option from '../../../select_menu_option/SelectMenuOption.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuViewDomController(view, model, dispatcher){

  var { nodes, subcomponents } = view;
  var { root } = nodes;

  //define event reactions -----------------------------------------------------

  var onLoadOptions = function( {optionsData} ){
    for (var optionData of optionsData){
      var option = new Option(optionData, model);
      root.appendChildNode(option.rootNode);
      subcomponents.push(option);
    }
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('viewDom', 'loadOptions', onLoadOptions);

}
