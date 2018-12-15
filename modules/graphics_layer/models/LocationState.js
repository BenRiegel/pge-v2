export default function NewLocationState(worldCoords, tags){

  //public api -----------------------------------------------------------------

  return {
    screenCoords: {x:undefined, y:undefined},
    isSelected: undefined,
    updateIsSelected: function(selectedTag){
      this.isSelected = tags.includes(selectedTag);
    },
    updateScreenCoords: function( {pixelSize, pixelNum, leftMapCoord, topMapCoord} ){
      this.screenCoords.x = worldCoords.x / pixelSize - leftMapCoord;
      this.screenCoords.x += (this.screenCoords.x < 0) ? pixelNum : 0;
      this.screenCoords.x -= (this.screenCoords.x > pixelNum) ? pixelNum : 0;
      this.screenCoords.y = worldCoords.y / pixelSize - topMapCoord;
    },
  }
}



// id,
// type
// worldCoords,
// screenCoords,
// radius,
// num
