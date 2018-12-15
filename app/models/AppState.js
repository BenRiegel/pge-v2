import ObservedVar from '../../lib/ObservedVar';


var appState = {
  loadingStatus: new ObservedVar(),
  //currentAction: new ObservedVar(),
  selectedTag: new ObservedVar(),
  viewpoint: new ObservedVar(),
};


export default appState;
