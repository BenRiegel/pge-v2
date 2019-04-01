export default function BasemapTileViewController(props, dispatcher, view){

  var { nodes } = view;
  var { root } = nodes;

  //define state change reactions ----------------------------------------------

  const TILE_SIZE_PX = 256;

  var setScreenCoords = function(){
    var xScreen = props.xPos * TILE_SIZE_PX;
    var yScreen = props.yPos * TILE_SIZE_PX;
    root.setScreenCoords(xScreen, yScreen);
  }

  var updateIndices = function( {xIndex, yIndex, imageTileLevel} ){
    return root.setIndices(xIndex, yIndex, imageTileLevel);
  };

  var updateVisibility = function( {isVisible} ){
    if (isVisible){
      root.setVisibility('visible');
    } else {
      root.setVisibility('hidden');
    }
  }

  var onUpdate = function(info){
    updateVisibility(info);
    return updateIndices(info);
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('view', 'update', onUpdate);

  //init -----------------------------------------------------------------------

  setScreenCoords();

}
