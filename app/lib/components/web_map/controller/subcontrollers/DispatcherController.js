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

  var onPanStart = function(){
    dispatcher.newAction('panStart');
  };

  var onPan = function(cumulativePan){
    dispatcher.newAction('pan', cumulativePan);
  };

  var onPanEnd = function(){
    dispatcher.newAction('panEnd');
  };

  //load reactions -------------------------------------------------------------

  selectMenu.setEventListener('newSelectedOption', onNewSelectedOption);
  graphicsLayer.setEventListener('pointGraphicClicked', onPointGraphicClicked);
  graphicsLayer.setEventListener('clusterGraphicClicked', onClusterGraphicClicked);
  zoomControls.setEventListener('zoomInRequest', onZoomInRequest);
  zoomControls.setEventListener('zoomOutRequest', onZoomOutRequest);
  zoomControls.setEventListener('zoomHomeRequest', onZoomHomeRequest);
  popup.setEventListener('closed', onPopupClosed);
  basemapLayer.setEventListener('panStart', onPanStart);
  basemapLayer.setEventListener('pan', onPan);
  basemapLayer.setEventListener('panEnd', onPanEnd);

}



/*
selectMenu.setEventListener('eventStart', selectMenuEventStart);
selectMenu.setEventListener('eventEnd', selectMenuEventEnd);
selectMenu.setEventListener('newSelectedOption', onNewSelectedOption);*/
