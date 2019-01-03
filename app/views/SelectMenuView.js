//imports ----------------------------------------------------------------------

import SelectMenu from '../../modules/select_menu/SelectMenu.js';
import dispatcher from '../services/Dispatcher.js';
import { setNewSelectedTag } from '../controllers/DispatcherController.js';
import { INIT_SELECTED_TAG } from '../config/Config.js';
import { tagsReceived } from '../stores/TagsModel.js';
import '../assets/stylesheets/select_menu.scss';
import '../assets/stylesheets/select_menu_option_container.scss';
import '../assets/stylesheets/select_menu_option_icon.scss';
import '../assets/stylesheets/select_menu_option_label.scss';


//module code block ------------------------------------------------------------

var selectMenu = new SelectMenu();

dispatcher.addListener('selectMenu', 'load', async () => {
  var tags = await tagsReceived;
  for (var tag of tags){
    selectMenu.addNewOption({
      key: tag.name,
      name: tag.name,
      count: tag.count,
      labelIsIndented: tag.labelIsIndented
    });
  }
  selectMenu.setSelectedOption(INIT_SELECTED_TAG);
  selectMenu.addListener('newSelectedOption', setNewSelectedTag);
});


//exports ----------------------------------------------------------------------

export default selectMenu;
