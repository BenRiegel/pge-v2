//imports ----------------------------------------------------------------------

import ActionProp from './props/Action.js';
import ViewpointProp from './props/Viewpoint.js';


//exports ----------------------------------------------------------------------

export default function WebMapState(props){
  return {
    action: new ActionProp(),
    viewpoint: new ViewpointProp(props),
  };
}
