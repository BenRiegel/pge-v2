//imports ----------------------------------------------------------------------

import appState from '../models/AppState.js';
import { INIT_SELECTED_TAG } from '../config/Config.js';
import { tagsReceived } from '../models/TagsModel.js';
import selectMenu from '../views/SelectMenuView.js';


//module code block ------------------------------------------------------------

appState.loadingStatus.addListener('selectMenu', async currentValue => {
  if (currentValue === 'inProgress'){
    var tags = await tagsReceived;
    for (var tag of tags){
      selectMenu.addNewOption({
        key: tag.name,
        name: tag.name,
        count: tag.count,
        labelIsIndented: tag.labelIsIndented
      });
    }
    selectMenu.enable();
    selectMenu.setSelectedOption(INIT_SELECTED_TAG);
    selectMenu.close();
  }
});
