export default function GraphicsLayerModelController(model, dispatcher){

  //define event reactions -----------------------------------------------------

  var onSetLocations = function(locations){
    model.set('locations', locations);
  }

  var onSelectLocations = function(selectedTag){
    for (var location of model.locations){
      location.hasSelectedTag = location.tags.includes(selectedTag);
    }
  }

  var onSelectGraphic = function(selectedGraphicId){
    model.set('selectedGraphicId', selectedGraphicId);
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('model', 'setLocations', onSetLocations);
  dispatcher.setListener('model', 'selectLocations', onSelectLocations);
  dispatcher.setListener('model', 'selectGraphic', onSelectGraphic);

}
