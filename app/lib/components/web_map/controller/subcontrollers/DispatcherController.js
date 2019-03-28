export default function WebMapDispatcherController(dispatcher, view){

  var { subcomponents } = view;
  var { zoomControls, selectMenu, popup, graphicsLayer, basemapLayer} = subcomponents;

  //define user event reactions ------------------------------------------------

  var onPointGraphicClicked = function(id, worldCoords, attributes){
    dispatcher.newAsyncAction('pointGraphicSelected', {id, worldCoords, attributes} );
  }

  var onClusterGraphicClicked = function(id, worldCoords){
    dispatcher.newAsyncAction('clusterGraphicSelected', {id, worldCoords} );
  }

  var onNewSelectedOption = function(selectedOptionKey){
    dispatcher.newAction('newSelectedTag', selectedOptionKey);
  }

  var onZoomInRequest = function(){
    dispatcher.newAction('zoomInRequest');
  }

  var onZoomOutRequest = function(){
    dispatcher.newAction('zoomOutRequest');
  }

  var onZoomHomeRequest = function(){
    dispatcher.newAction('zoomHomeRequest');
  }

  var onPopupClosed = function(){
    dispatcher.newAction('popupClosed');
  }

  //load reactions -------------------------------------------------------------

  selectMenu.setEventListener('newSelectedOption', onNewSelectedOption);
  graphicsLayer.setEventListener('pointGraphicClicked', onPointGraphicClicked);
  graphicsLayer.setEventListener('clusterGraphicClicked', onClusterGraphicClicked);
  zoomControls.setEventListener('zoomInRequest', onZoomInRequest);
  zoomControls.setEventListener('zoomOutRequest', onZoomOutRequest);
  zoomControls.setEventListener('zoomHomeRequest', onZoomHomeRequest);
  popup.setEventListener('closed', onPopupClosed);

}



/*
selectMenu.setEventListener('eventStart', selectMenuEventStart);
selectMenu.setEventListener('eventEnd', selectMenuEventEnd);
selectMenu.setEventListener('newSelectedOption', onNewSelectedOption);*/
