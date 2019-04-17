//imports ----------------------------------------------------------------------

import view from '../../view/View.js';


//module code block ------------------------------------------------------------

var { components } = view;
var { loader } = components;


//exports ----------------------------------------------------------------------

export function startLoader(){
  loader.activate();
}

export function terminateLoader(){
  return loader.terminate(true);
}
