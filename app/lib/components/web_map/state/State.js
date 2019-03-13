//imports ----------------------------------------------------------------------

import SelectedGraphicProp from './props/SelectedGraphic.js';
import ViewpointProp from './props/Viewpoint.js';


//exports ----------------------------------------------------------------------

export default function WebMapState(props){
  return {
    selectedGraphic: new SelectedGraphicProp(),
    viewpoint: new ViewpointProp(props),
  };
}
