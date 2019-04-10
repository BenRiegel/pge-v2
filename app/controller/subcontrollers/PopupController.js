//imports ----------------------------------------------------------------------

import view from '../../view/View.js';


//module code block ------------------------------------------------------------

var { components } = view;
var { webMap, popupTemplate, popupReport } = components;

popupTemplate.setListener('readMoreRequest', async () => {
  var dimensions = webMap.popup.getDimensions();
  popupReport.setPosition(dimensions);
  await popupReport.open();
  webMap.popup.hideArrow();
  await popupReport.expand();
  var content = webMap.popup.getContent();
  await popupReport.load(content.url);
});

popupReport.setListener('closeRequest', () => {
  webMap.popup.showArrow();
  webMap.popup.close();
});

popupReport.setListener('contractRequest', async () => {
  var dimensions = webMap.popup.getDimensions();
  await popupReport.contract(dimensions);
  await popupReport.close();
  webMap.popup.showArrow();
});
