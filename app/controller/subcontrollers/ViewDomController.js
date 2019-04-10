//imports ----------------------------------------------------------------------

import view from '../../view/View.js';


//module code block ------------------------------------------------------------

var { nodes, components } = view;
var { root } = nodes;
var { loader, selectMenu, popupReport } = components;


//exports ----------------------------------------------------------------------

export function load(){
  root.appendChild(popupReport.rootNode);
  root.appendChild(loader.rootNode);
  root.appendChild(selectMenu.rootNode);
};
