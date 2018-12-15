export default function NewDomController(container){

  //public api -----------------------------------------------------------------

  return {
    addGraphic: function(graphic){
      container.node.appendChild(graphic.node);
    },
  }

}
