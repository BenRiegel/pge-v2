export default function BasemapTileViewController(view, props, layerState){

  var { nodes } = view;
  var { root } = nodes;

  //define state change reactions ----------------------------------------------

  var updateIndices = function(data){
    var rectifiedXIndex = data.xIndex % layerState.numBasemapTiles;
    if (rectifiedXIndex < 0){
      rectifiedXIndex += layerState.numBasemapTiles;
    }
    return root.setIndices(rectifiedXIndex, data.yIndex, layerState.imageTileLevel);
  };

  var updateScreenCoords = function(data){
    root.setScreenCoords( {x:data.xScreen, y:data.yScreen} );
  }

  var updateVisibility = function(data){
    if (data.yIndex < 0 || data.yIndex >= layerState.numBasemapTiles){
      root.setVisibility('hidden');
    } else {
      root.setVisibility('visible');
    }
  }

  //init -----------------------------------------------------------------------

  updateIndices(props);
  updateScreenCoords(props);
  updateVisibility(props);

  //public api -----------------------------------------------------------------

  this.update = function(info){
    updateScreenCoords(info);
    updateVisibility(info);
    return updateIndices(info);
  }

}
