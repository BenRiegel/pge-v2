//imports ----------------------------------------------------------------------

import view from '../../view/View.js';


//module code block ------------------------------------------------------------

var { nodes, components } = view;
var { root } = nodes;
var { loader, selectMenu } = components;


//exports ----------------------------------------------------------------------

export function load(){
  root.appendChild(loader.rootNode);
  root.appendChild(selectMenu.rootNode);
}
