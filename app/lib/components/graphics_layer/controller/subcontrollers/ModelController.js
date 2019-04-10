export default function GraphicsLayerModelController(model){

  //public api -----------------------------------------------------------------

  this.selectGraphic = function(selectedGraphicId){
    model.set('selectedGraphicId', selectedGraphicId);
  };

}
