//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import PointsContainerNode from './nodes/PointsContainerNode.js';
import ClustersContainerNode from './nodes/ClustersContainerNode.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerView(){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
    pointsContainer: new PointsContainerNode(),
    clustersContainer: new ClustersContainerNode(),
  }

  this.subcomponents = {
    pointGraphics: [],
    clusterGraphics: [],
  };

}
