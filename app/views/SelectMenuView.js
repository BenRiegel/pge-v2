//imports ----------------------------------------------------------------------

import SelectMenu from '../modules/select_menu/SelectMenu.js';
import dispatcher from '../services/Dispatcher.js';
import { setNewSelectedTag } from '../services/Dispatcher.js';
import { selectMenuEventStart } from '../services/Dispatcher.js';
import { selectMenuEventEnd } from '../services/Dispatcher.js';
import { INIT_SELECTED_TAG } from '../config/Config.js';
import { tagsReceived } from '../services/Tags.js';
import rootNode from './RootView.js';


//module code block ------------------------------------------------------------

var selectMenu = new SelectMenu();

dispatcher.addListener('load', async () => {
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
  selectMenu.addEventListener('newSelectedOption', setNewSelectedTag);
  selectMenu.addEventListener('eventStart', selectMenuEventStart);
  selectMenu.addEventListener('eventEnd', selectMenuEventEnd);
  rootNode.appendChild(selectMenu.rootNode);
});

dispatcher.addListener('selectMenu - enable', () => {
  selectMenu.enable();
});

dispatcher.addListener('selectMenu - disable', () => {
  selectMenu.disable();
});

dispatcher.addListener('selectMenu - close', () => {
  selectMenu.close();
});


//exports ----------------------------------------------------------------------

export default selectMenu;
