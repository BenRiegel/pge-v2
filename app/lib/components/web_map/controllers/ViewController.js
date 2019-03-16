//imports ----------------------------------------------------------------------

import { levelToValue } from '../../../web_mapping/WebMapScale.js';
import { easeInOut, wait } from '../../../utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function WebMapViewController(view, state, dispatcher){

  var { nodes, subcomponents } = view;
  var { root } = nodes;
  var { zoomControls, popup, graphicsLayer, selectMenu } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(zoomControls.rootNode);
  root.appendChildNode(popup.rootNode);
  root.appendChildNode(graphicsLayer.rootNode);
  root.appendChildNode(selectMenu.rootNode);

  //define state change reactions ----------------------------------------------

  var selectMenuEventStart = function(){
    zoomControls.disable();
    popup.disable();
    graphicsLayer.disable();
  }

  var selectMenuEventEnd = function(){
    zoomControls.enable();
    popup.enable();
    graphicsLayer.enable();
  }

  var onNewSelectedOption = function(selectedOptionKey){
    popup.close();
    graphicsLayer.setSelectedTag(selectedOptionKey);
  }

  var openPopup = function(content){
    popup.open(content);
  }

  var selectPointGraphic = function(graphicId){
    graphicsLayer.selectPointGraphic(graphicId);
  };

  var selectClusterGraphic = function(graphicId){
    graphicsLayer.selectClusterGraphic(graphicId);
  };

  var unselectGraphic = function(){
    graphicsLayer.selectPointGraphic(null);
  }

  var onZoomEnd = async function(){
    graphicsLayer.updateClusters();
  }

  var onZoomHomeBegin = async function(){
    await graphicsLayer.fadeDown();
  }

  var onZoomHomeEnd = async function(){
    graphicsLayer.updateClusters();
    await graphicsLayer.fadeUp();
  }

  //load reactions -------------------------------------------------------------

  dispatcher.addListener('selectPointGraphic', selectPointGraphic);
  dispatcher.addListener('selectClusterGraphic', selectClusterGraphic);
  dispatcher.addListener('openPopup', openPopup);

  state.addListener('zoomEnd', onZoomEnd);
  state.addListener('zoomHomeBegin', onZoomHomeBegin);
  state.addListener('zoomHomeEnd', onZoomHomeEnd);

  popup.addEventListener('isClosed', unselectGraphic);

  selectMenu.addEventListener('eventStart', selectMenuEventStart);
  selectMenu.addEventListener('eventEnd', selectMenuEventEnd);
  selectMenu.addEventListener('newSelectedOption', onNewSelectedOption);

}
