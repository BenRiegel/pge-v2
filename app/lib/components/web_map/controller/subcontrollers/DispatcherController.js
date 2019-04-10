export default function WebMapDispatcherController(dispatcher, view){

  var { subcomponents } = view;
  var { zoomControls, popup, graphicsLayer, basemapLayer} = subcomponents;

  //define user event reactions ------------------------------------------------

  var onPointGraphicClicked = function(id, worldCoords, attributes){
    dispatcher.doAction('pointGraphicSelected', {id, worldCoords, attributes} );
  }

  var onGraphicClicked = function(graphicProps, attributes){
    var { id, x, y } = graphicProps;
    var worldCoords = { x, y };
    dispatcher.doAction('pointGraphicSelected', {id, worldCoords, attributes});
  }

/*  var onClusterGraphicClicked = function(id, worldCoords){
    dispatcher.doAction('clusterGraphicSelected', {id, worldCoords} );
  }*/

  /*var onSelectMenuActionStart = function(){
    dispatcher.doAction('selectMenuActionStart');
  }

  var onSelectMenuActionEnd = function(){
    dispatcher.doAction('selectMenuActionEnd');
  }

  var onNewSelectedOption = function(selectedOptionKey){
    dispatcher.doAction('newSelectedTag', selectedOptionKey);
  }*/

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

  zoomControls.setListener('zoomInRequest', onZoomInRequest);
  zoomControls.setListener('zoomOutRequest', onZoomOutRequest);
  zoomControls.setListener('zoomHomeRequest', onZoomHomeRequest);
//  selectMenu.setListener('newSelectedOption', onNewSelectedOption);
//  selectMenu.setListener('openingStart', onSelectMenuActionStart);
//  selectMenu.setListener('closingStart', onSelectMenuActionStart);
//  selectMenu.setListener('openingEnd', onSelectMenuActionEnd);
//  selectMenu.setListener('closingEnd', onSelectMenuActionEnd);
  popup.setListener('closed', onPopupClosed);
  popup.setListener('expansionStart', onPopupExpansionStart);
  popup.setListener('contractionEnd', onPopupContractionEnd);
  graphicsLayer.setEventListener('graphicClicked', onGraphicClicked);
//  graphicsLayer.setEventListener('clusterGraphicClicked', onClusterGraphicClicked);

}
