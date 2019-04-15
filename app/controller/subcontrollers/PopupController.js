//imports ----------------------------------------------------------------------

import view from '../../view/View.js';


//module code block ------------------------------------------------------------

var { components } = view;
var { webMap, popupTemplate, popupReport, selectMenu } = components;


//exports ----------------------------------------------------------------------

export function onNewSelectedOption(){
  webMap.popup.close();
};

export async function onReadMoreRequest(){
  var dimensions = webMap.popup.getDimensions();
  popupReport.setPosition(dimensions);
  await popupReport.open();
  webMap.popup.hideArrow();
  await popupReport.expand();
  var content = webMap.popup.getContent();
  await popupReport.load(content.url);
};

export function onCloseRequest(){
  webMap.popup.showArrow();
  webMap.popup.close();
};

export async function onContractRequest(){
  var dimensions = webMap.popup.getDimensions();
  await popupReport.contract(dimensions);
  await popupReport.close();
  webMap.popup.showArrow();
};
