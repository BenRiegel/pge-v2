//imports ----------------------------------------------------------------------

import { startLoading, load, finishLoading} from './controllers/ViewController.js';
import { waitAtLeast } from './lib/utils/Utils.js';


//module code block ------------------------------------------------------------

(async function () {
  startLoading();
  await waitAtLeast(1000, load);
  await finishLoading();
})();
