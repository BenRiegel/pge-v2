export default function WebMapViewInputController(view, model, dispatcher){

  var { subcomponents } = view;
  var { selectMenu, zoomControls, popup, graphicsLayer, basemapLayer} = subcomponents;

  //define state change reactions ----------------------------------------------

  var disableAll = function(){
    zoomControls.disable();
    selectMenu.disable();
    popup.disable();
    graphicsLayer.disable();
    basemapLayer.disable();
  }

  var enableAll = function(){
    zoomControls.enable();
    selectMenu.enable();
    graphicsLayer.enable();
    popup.enable();
    basemapLayer.enable();
  }

  var onPointGraphicSelected = async function(status){
    if (status === 'start'){
      disableAll();
    } else if (status === 'end'){
      enableAll();
    }
  }

  var onClusterGraphicSelected = async function(status){
    if (status === 'start'){
      disableAll();
    } else if (status === 'end'){
      enableAll();
    }
  }

  var onZoomRequest = async function(status){
    if (model.hasChanged){
      if (status === 'start'){
        disableAll();
      } else if (status === 'end'){
        enableAll();
      }
    }
  }

  var onPopupActionStart = function(){
    disableAll();
  }

  var onPopupActionEnd = function(){
    enableAll();
  }

  var onPopupExpansionStart = function(){
    selectMenu.disable();
    zoomControls.disable();
    graphicsLayer.disable();
    basemapLayer.disable();
  }

  var onPopupContractionEnd = function(){
    selectMenu.enable();
    zoomControls.enable();
    graphicsLayer.enable();
    basemapLayer.enable();
  }

  var onPanEnd = function(){
    popup.enable();
    selectMenu.enable();
    graphicsLayer.enable();
    zoomControls.enable();
  }

  var onPanStart = function(){
    popup.disable();
    selectMenu.disable();
    graphicsLayer.disable();
    zoomControls.disable();
  }

  var onSelectMenuActionStart = function(){
    disableAll();
  }

  var onSelectMenuActionEnd = function(){
    enableAll();
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('viewInput', 'selectMenuActionStart', onSelectMenuActionStart);
  dispatcher.setListener('viewInput', 'selectMenuActionEnd', onSelectMenuActionEnd);
  dispatcher.setListener('viewInput', 'pointGraphicSelected', onPointGraphicSelected);
  dispatcher.setListener('viewInput', 'clusterGraphicSelected', onClusterGraphicSelected);
  dispatcher.setListener('viewInput', 'zoomInRequest', onZoomRequest);
  dispatcher.setListener('viewInput', 'zoomHomeRequest', onZoomRequest);
  dispatcher.setListener('viewInput', 'zoomOutRequest', onZoomRequest);
  dispatcher.setListener('viewInput', 'popupExpansionStart', onPopupExpansionStart);
  dispatcher.setListener('viewInput', 'popupContractionEnd', onPopupContractionEnd);
  dispatcher.setListener('viewInput', 'panStart', onPanStart);
  dispatcher.setListener('viewInput', 'panEnd', onPanEnd);

}
