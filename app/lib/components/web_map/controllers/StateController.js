//imports ----------------------------------------------------------------------

import { latLonToWebMercator } from '../lib/WebMercator.js';
import { levelToValue } from '../lib/WebMapScale.js';


//exports ----------------------------------------------------------------------

export default function WebMapStateController(state, view){

  //define user event reactions ------------------------------------------------

  var selectGraphic = async function(type, id, worldCoords, attributes){
    await state.selectedGraphic.set(type, id, worldCoords, attributes);
    if (type === 'cluster'){
      state.selectedGraphic.set(null);
    }
  }

  var unselectGraphic = function(){
    state.selectedGraphic.set(null);
  }

  var animateTo = async function(){
    if (state.selectedGraphic.type === 'point'){
      await state.viewpoint.panTo(state.selectedGraphic.worldCoords);
    } else if (state.selectedGraphic.type === 'cluster'){
      await state.viewpoint.zoomTo(state.selectedGraphic.worldCoords);
    }
  }


/*  var zoomIn = function(){
    state.zoomIn();
  }

  var zoomOut = function(){
    state.zoomOut();
  }

  var zoomTo = function(id, worldCoords){
    state.zoomTo(worldCoords.x, worldCoords.y);
  }

  var zoomHome = function(){
    state.zoomHome();
  }*/


  //load reactions -------------------------------------------------------------

  view.subcomponents.graphicsLayer.addEventListener('graphicClicked', selectGraphic);
  view.subcomponents.popup.addEventListener('isClosed', unselectGraphic);

  state.selectedGraphic.addListener('updateViewpoint', animateTo);


  //view.subcomponents.zoomControls.addEventListener('zoomInButtonClicked', zoomIn);
  //view.subcomponents.zoomControls.addEventListener('zoomOutButtonClicked', zoomOut);
  //view.subcomponents.zoomControls.addEventListener('zoomHomeButtonClicked', zoomHome);


  //init -----------------------------------------------------------------------


}
