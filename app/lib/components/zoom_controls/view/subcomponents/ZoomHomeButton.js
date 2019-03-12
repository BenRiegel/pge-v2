//imports ----------------------------------------------------------------------

import ZoomButton from '../../../zoom_controls_button/ZoomControlsButton.js';
import '../stylesheets/zoom_home_button.scss';


//exports ----------------------------------------------------------------------

export default function ZoomHomeButton(){

  return new ZoomButton('zoomHome', 'zoom-home', 'fa-home');

}
