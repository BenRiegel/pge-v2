//imports ----------------------------------------------------------------------

import tagsModel from '../models/TagsModel.js';
import selectMenu from '../views/TagsView.js';
//import { tagsViewReady }  from '../controllers/TagsViewController.js';

//exports ----------------------------------------------------------------------

//export async function initApp(){
//  tagsModel.load();
//  await tagsViewReady;
//}

export async function menuOptionClickAction(clickedOption){
  selectMenu.disable();
  selectMenu.setSelectedOption(clickedOption);
  await selectMenu.toggleOpenStatus();
  //graphicsLayer.setSelectedTag(clickedOption);
  selectMenu.enable();
};
