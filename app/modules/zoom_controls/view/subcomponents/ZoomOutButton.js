//imports ----------------------------------------------------------------------

import ZoomButton from '../../../zoom_controls_button/ZoomControlsButton.js';
import '../stylesheets/zoom_out_button.scss';


//exports ----------------------------------------------------------------------

export default function ZoomOutButton(viewProps){

  return new ZoomButton('zoomOut', 'zoom-out', 'fa-minus');

}
