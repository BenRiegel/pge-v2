//imports ----------------------------------------------------------------------

import '../assets/stylesheets/root.scss';


//module code block ------------------------------------------------------------

var rootNode = document.getElementById('root');

var mapDimensions = rootNode.getBoundingClientRect();


//exports ----------------------------------------------------------------------

export default rootNode;

export { mapDimensions }; 
