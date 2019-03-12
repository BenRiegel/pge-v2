//imports ----------------------------------------------------------------------

import ZoomButton from '../../../zoom_controls_button/ZoomControlsButton.js';
import '../stylesheets/zoom_in_button.scss';


//exports ----------------------------------------------------------------------

export default function ZoomInButton(){

  return new ZoomButton('zoomIn', 'zoom-in', 'fa-plus');

}
