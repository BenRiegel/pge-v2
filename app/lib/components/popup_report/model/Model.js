//imports ----------------------------------------------------------------------

import ComponentModel from '../../../utils/ComponentModel.js';


//exports ----------------------------------------------------------------------

export default function PopupReportModel(){

  //create state var -----------------------------------------------------------

  var model = new ComponentModel({
    loadingStatus: null,
  });

  //public api -----------------------------------------------------------------

  return model;

}
