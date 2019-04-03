export default function WebMapDispatcherController(dispatcher, view){

  var { subcomponents } = view;
  var { zoomControls, selectMenu, popup, graphicsLayer, basemapLayer} = subcomponents;

  //define user event reactions ------------------------------------------------

  var onPointGraphicClicked = function(id, worldCoords, attributes){
    dispatcher.doAction('pointGraphicSelected', {id, worldCoords, attributes} );
  }

  var onClusterGraphicClicked = function(id, worldCoords){
    dispatcher.doAction('clusterGraphicSelected', {id, worldCoords} );
  }

  var onSelectMenuActionStart = function(){
    dispatcher.doAction('selectMenuActionStart');
  }

  var onSelectMenuActionEnd = function(){
    dispatcher.doAction('selectMenuActionEnd');
  }

  var onNewSelectedOption = function(selectedOptionKey){
    dispatcher.doAction('newSelectedTag', selectedOptionKey);
  }

  var onZoomInRequest = function(){
    dispatcher.doAction('zoomInRequest');
  }

  var onZoomOutRequest = function(){
    dispatcher.doAction('zoomOutRequest');
  }

  var onZoomHomeRequest = function(){
    dispatcher.doAction('zoomHomeRequest');
  }

  var onPopupClosed = function(){
    dispatcher.doAction('popupClosed');
  }

  var onPopupExpansionStart = function(){
    dispatcher.doAction('popupExpansionStart');
  }

  var onPopupContractionEnd = function(){
    dispatcher.doAction('popupContractionEnd');
  }

  //load reactions -------------------------------------------------------------

  zoomControls.setEventListener('zoomInRequest', onZoomInRequest);
  zoomControls.setEventListener('zoomOutRequest', onZoomOutRequest);
  zoomControls.setEventListener('zoomHomeRequest', onZoomHomeRequest);
  selectMenu.setEventListener('newSelectedOption', onNewSelectedOption);
  selectMenu.setEventListener('actionStart', onSelectMenuActionStart);
  selectMenu.setEventListener('actionEnd', onSelectMenuActionEnd);
  popup.setEventListener('closed', onPopupClosed);
  popup.setEventListener('expansionStart', onPopupExpansionStart);
  popup.setEventListener('contractionEnd', onPopupContractionEnd);
  graphicsLayer.setEventListener('pointGraphicClicked', onPointGraphicClicked);
  graphicsLayer.setEventListener('clusterGraphicClicked', onClusterGraphicClicked);

}
