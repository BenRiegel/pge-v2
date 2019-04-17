//imports ----------------------------------------------------------------------

import view from '../../view/View.js';


//module code block ------------------------------------------------------------

var { nodes } = view;
var { root } = nodes;


//exports ----------------------------------------------------------------------

export function onActionStart(actionName){
  if (actionName !== 'pan'){
    root.classList.add('active');
  }
}

export function onActionEnd(actionName){
  if (actionName !== 'pan'){
    root.classList.remove('active');
  }
}
