//imports ----------------------------------------------------------------------

import NewWebMap from './view/scripts/components/WebMap.js';
import './view/stylesheets/index.scss';


//module code block ------------------------------------------------------------

var rootNode = document.getElementById('root');
var { width, height } = rootNode.getBoundingClientRect();
var webMap = NewWebMap( {width, height} );
rootNode.appendChild(webMap.rootNode);
webMap.init();
