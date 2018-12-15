//imports ----------------------------------------------------------------------

import * as app from '../controllers/AppController.js';


//exports ----------------------------------------------------------------------

export async function loadApp(){
  app.onLoadStart();
  await app.onLoad();
  await app.onLoadEnd();
}

export function selectMenuProcessingStart(){
  app.onSelectMenuProcessingStart();
}

export function selectMenuProcessingEnd(){
  app.onSelectMenuProcessingEnd();
}

export async function selectMenuNewOptionSelected(newOption){
  app.onNewTagSelected(newOption);
}

export function popupProcessingStart(){
}

export function popupProcessingEnd(){
}

export async function pointSelect(id, xCoord, yCoord){
}

export async function clusterSelectAction(xCoord, yCoord){
};

export async function zoomStart(){
}

export async function zoom(){
}

export async function zoomEnd(){
}

export async function panStart(){
}

export async function pan(){
}

export async function panEnd(){
}
