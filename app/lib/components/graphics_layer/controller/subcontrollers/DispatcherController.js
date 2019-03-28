export default function GraphicsLayerDispatcherController(dispatcher, model, view){

  var { nodes } = view;
  var { root } = nodes;

  //define event reactions -----------------------------------------------------

  var onClick = function(graphicType, graphicId, worldCoords){
    if (graphicType === 'point'){
      var attributes = model.locations[graphicId].attributes;
      dispatcher.newAction('pointGraphicClicked', graphicId, worldCoords, attributes);
    } else if (graphicType === 'cluster'){
      dispatcher.newAction('clusterGraphicClicked', graphicId, worldCoords)
    }
  }

  //load event reactions -------------------------------------------------------

  root.setListener('click', onClick);

}
