//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import { setNewSelectedTag } from './DispatcherController.js';
import { INIT_SELECTED_TAG } from '../config/Config.js';
import { tagsReceived } from '../stores/TagsModel.js';
import selectMenu from '../views/SelectMenuView.js';


//module code block ------------------------------------------------------------

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
