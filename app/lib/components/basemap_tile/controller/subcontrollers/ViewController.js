export default function BasemapTileViewController(props, dispatcher, view, layerModel){

  var { nodes } = view;
  var { root } = nodes;

  //define state change reactions ----------------------------------------------

  var updateIndices = function(data){
    var rectifiedXIndex = data.xIndex % layerModel.numBasemapTiles;
    if (rectifiedXIndex < 0){
      rectifiedXIndex += layerModel.numBasemapTiles;
    }
    return root.setIndices(rectifiedXIndex, data.yIndex, layerModel.imageTileLevel);
  };

  var updateScreenCoords = function(data){
    root.setScreenCoords( {x:data.xScreen, y:data.yScreen} );
  }

  var updateVisibility = function(data){
    if (data.yIndex < 0 || data.yIndex >= layerModel.numBasemapTiles){
      root.setVisibility('hidden');
    } else {
      root.setVisibility('visible');
    }
  }

  var onUpdate = function(info){
    updateScreenCoords(info);
    updateVisibility(info);
    return updateIndices(info);
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('view', 'update', onUpdate);

  //init -----------------------------------------------------------------------

  updateIndices(props);
  updateScreenCoords(props);
  updateVisibility(props);

}
