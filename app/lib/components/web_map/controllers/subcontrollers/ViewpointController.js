//imports ----------------------------------------------------------------------



//exports ----------------------------------------------------------------------

export default function ViewpointController(state, dispatcher, view){

  var { subcomponents } = view;
  var { graphicsLayer, popup, zoomControls } = subcomponents;
  var { viewpoint } = state;

  //define user event reactions ------------------------------------------------

  var panTo = async function(worldCoords){
    await viewpoint.panTo(worldCoords);
  }

  var zoomTo = async function(worldCoords){
    await viewpoint.zoomTo(worldCoords);
  }

  var zoomIn = function(){
    viewpoint.zoomIn();
  }

  var zoomOut = function(){
    viewpoint.zoomOut();
  }

  var zoomHome = function(){
    viewpoint.zoomHome();
  }


  //load reactions -------------------------------------------------------------

  dispatcher.addListener('panTo', panTo);
  dispatcher.addListener('zoomTo', zoomTo);

  zoomControls.addEventListener('zoomInButtonClicked', zoomIn);
  zoomControls.addEventListener('zoomOutButtonClicked', zoomOut);
  zoomControls.addEventListener('zoomHomeButtonClicked', zoomHome);

}
