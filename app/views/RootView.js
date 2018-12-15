//module code block ------------------------------------------------------------

var rootNode = document.getElementById('web-map');
var { width, height } = rootNode.getBoundingClientRect();
var rootNodeDimensionsPx = { width, height };


//exports ----------------------------------------------------------------------

export default rootNode;

export { rootNodeDimensionsPx } ;
