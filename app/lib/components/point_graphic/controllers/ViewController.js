export default function PointGraphicViewController(view, props, state, webMapState){

  var { nodes } = view;
  var { root, location, label } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(location.node);
  root.appendChildNode(label.node);

  //define state change reactions ----------------------------------------------

  var updateRootVisibility = function(){
    if (!state.hasSelectedTag || state.isObscured){
      root.setVisibility('hidden');
    } else {
      root.setVisibility('visible');
    }
  }

  var updateHighlight = function(){
    location.setHighlight(state.isSelected);
  }

  var updateScreenCoords = function(){
    if (state.hasSelectedTag && !state.isObscured){
      var screenCoords = webMapState.calculateScreenCoords(props.worldCoords);
      root.setScreenCoords(screenCoords);
    }
  };

  //load reactions -------------------------------------------------------------

  state.addListener('isSelected', updateHighlight);
  state.addListener('hasSelectedTag', updateScreenCoords);
  state.addListener('hasSelectedTag', updateRootVisibility);
  state.addListener('isObscured', updateRootVisibility);
  state.addListener('isObscured', updateScreenCoords);
  webMapState.addListener('panUpdate', updateScreenCoords);
  webMapState.addListener('zoomUpdate', updateScreenCoords);
  webMapState.addListener('zoomHomeUpdate', updateScreenCoords);

  //init -----------------------------------------------------------------------

  updateRootVisibility();
  updateHighlight();
  updateScreenCoords();

}
