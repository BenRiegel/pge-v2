//imports ----------------------------------------------------------------------

import ZoomButton from '../../../zoom_controls_button/ZoomControlsButton.js';
import '../stylesheets/zoom_home_button_root.scss';
import '../stylesheets/zoom_home_button_icon.scss';


//exports ----------------------------------------------------------------------

export default function ZoomHomeButton(){

  return new ZoomButton('zoomHome', 'zoom-home', 'fa-home');

}
