export default function PointGraphicViewController(view, props, state, webMapState){

  var { nodes } = view;
  var { root, location, label } = nodes;
  var { viewpoint, action } = webMapState;

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

  var updateScreenCoords = function(vp){
    var screenCoords = viewpoint.calculateScreenCoordsViewpoint(props.worldCoords, vp);
    root.setScreenCoords(screenCoords);
  };

  var update= function(){
    updateScreenCoords(action.frameProps);
  };

  //load reactions -------------------------------------------------------------

  state.addListener('isSelected', updateHighlight);
  state.addListener('hasSelectedTag', updateRootVisibility);
  state.addListener('isObscured', updateRootVisibility);
  action.addListenerByType('frameProps', 'panFrame', update);
  action.addListenerByType('frameProps', 'zoomFrame', update);

  //init -----------------------------------------------------------------------

  updateRootVisibility();
  updateHighlight();
  updateScreenCoords(viewpoint);

}
