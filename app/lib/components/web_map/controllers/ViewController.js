//imports ----------------------------------------------------------------------

import { levelToValue } from '../../../web_mapping/WebMapScale.js';
import { easeInOut, wait } from '../../../utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function WebMapViewController(view, state, dispatcher){

  var { nodes, subcomponents } = view;
  var { root } = nodes;
  var { selectMenu, zoomControls, popup, graphicsLayer, basemapLayer} = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(selectMenu.rootNode);
  root.appendChildNode(zoomControls.rootNode);
  root.appendChildNode(popup.rootNode);
  root.appendChildNode(graphicsLayer.rootNode);
  root.appendChildNode(basemapLayer.rootNode);

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
    popup.setContent(content);
    popup.open();
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
    await basemapLayer.updateOnZoomEnd();
  }

  var onZoomHomeBegin = async function(){
    var p1 = graphicsLayer.fadeDown();
    var p2 = basemapLayer.fadeDown();
    await Promise.all([p1, p2]);
  }

  var onZoomHomeEnd = async function(){
    graphicsLayer.updateClusters();
    await basemapLayer.updateOnZoomHome();
    var p1 = graphicsLayer.fadeUp();
    var p2 = basemapLayer.fadeUp();
    await Promise.all([p1, p2]);
  }

  var onPanEnd = async function(){
    await basemapLayer.updateOnPanEnd();
  }

  //load reactions -------------------------------------------------------------

  dispatcher.addListener('selectPointGraphic', selectPointGraphic);
  dispatcher.addListener('selectClusterGraphic', selectClusterGraphic);
  dispatcher.addListener('openPopup', openPopup);

  state.addListener('zoomEnd', onZoomEnd);
  state.addListener('zoomHomeBegin', onZoomHomeBegin);
  state.addListener('zoomHomeEnd', onZoomHomeEnd);

  state.addListener('panEnd', onPanEnd);

  popup.setEventListener('closed', unselectGraphic);

  selectMenu.addEventListener('eventStart', selectMenuEventStart);
  selectMenu.addEventListener('eventEnd', selectMenuEventEnd);
  selectMenu.addEventListener('newSelectedOption', onNewSelectedOption);

  //public api -----------------------------------------------------------------

  this.configure = async function(){
    popup.configure();
  }

}
