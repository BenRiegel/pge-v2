//imports ----------------------------------------------------------------------

import ViewOutputController from './subcontrollers/ViewOutputController.js';


//exports ----------------------------------------------------------------------

export default function BasemapTileController(props, view){

  var outputController = new ViewOutputController(props, view);

  //public api -----------------------------------------------------------------

  this.renderView = function(info){
    outputController.render(info);
  };

}
