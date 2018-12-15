//imports ----------------------------------------------------------------------

import NodeInstance from '../../../lib/NodeInstance.js';
import { addChildrenTo } from '../../../lib/ViewUtils.js';
import NewEmitter from '../../../lib/Emitter.js';


//module code block ------------------------------------------------------------

var getNewImageSize = function( {naturalWidth, naturalHeight} ){
  const maxImageWidth = 200;
  const maxImageHeight = 125;
  var ratio = naturalWidth / naturalHeight;
  if (ratio > (maxImageWidth / maxImageHeight)){
    var newWidth = maxImageWidth;
    var newHeight = newWidth / ratio;
  } else {
    var newHeight = maxImageHeight;
    var newWidth = ratio * newHeight;
  }
  return [newWidth, newHeight];
};


//exports ----------------------------------------------------------------------

export default function NewContentView(){

  //private code block ---------------------------------------------------------

  var emitter = NewEmitter();

  var resizeImage = function(){
    var [width, height] = getNewImageSize(image.rootNode);
    image.setStyle('height', `${height}px`);
    image.setStyle('width', `${width}px`);
    emitter.broadcast('contentLoaded');
  };

  var closeAction = function(){
    emitter.broadcast('closeAction');
  }

  var expandAction = function(){
    emitter.broadcast('expandAction');
  }

  var closeButtonIcon = new NodeInstance('span');
  closeButtonIcon.className = 'fa fa-times';
  var closeButton = new NodeInstance('div');
  closeButton.className = 'summary-close-button';
  closeButton.onClick = closeAction;
  addChildrenTo(closeButton, [closeButtonIcon]);
  var projectTitle = new NodeInstance('div');
  projectTitle.className = 'project-title';
  var projectAuthor = new NodeInstance('div');
  projectAuthor.className = 'project-author';
  var image = new NodeInstance('img');
  image.className = 'project-image';
  image.onLoad = resizeImage;
  var text = new NodeInstance('span');
  text.className = 'project-text';
  var readMoreText = new NodeInstance('span');
  readMoreText.className = 'read-more-text';
  readMoreText.onClick = expandAction;
  readMoreText.innerHTML = 'Read more';
  var projectInlineContainer = new NodeInstance('div');
  projectInlineContainer.className = 'project-inline-container';
  addChildrenTo(projectInlineContainer, [image, text, readMoreText]);
  var container = new NodeInstance('div');
  container.className = 'summary-content';
  addChildrenTo(container, [closeButton, projectTitle, projectAuthor, projectInlineContainer]);

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    addListener: emitter.addListener,
    setTransparent: function(){
      container.setStyle('opacity', '0');
    },
    setOpaque: function(){
      container.setStyle('opacity', '1');
    },
    transitionFadeUp: async function(){
      container.rootNode.style.transitionProperty = 'opacity';
      await container.transitionSetStyle('opacity', '1');
      container.rootNode.style.transition = '';
    },
    transitionFadeDown: async function(){
      container.setStyle('opacity', '1');
      container.rootNode.style.transitionProperty = 'opacity';
      await container.transitionSetStyle('opacity', '0');
      container.rootNode.style.transition = '';
    },
    setExpanded: function(){
      var node = container.rootNode;
      var scrollHeight = node.scrollHeight;
      node.style.height = `${scrollHeight}px`;
    },
    expand: async function(){
      var node = container.rootNode;
      var offsetHeight = node.clientHeight;
      var scrollHeight = node.scrollHeight;
      var deltaHeight = scrollHeight - offsetHeight;
      var transitionTime = 3 * deltaHeight;
      node.style.height = `${offsetHeight}px`;
      node.style.transition = `height ${transitionTime}ms`;
      await container.transitionSetStyle('height', `${scrollHeight}px`);
      node.style.transition = '';
    },
    resetWindowSize: function(){
      container.setStyle('height', '');
    },
    updateContent(content){
      projectTitle.innerHTML = content.projectName;
      if (content.author){
        projectAuthor.innerHTML = `by ${content.author}, ${content.university} University, ${content.year}`;
      } else {
        projectAuthor.innerHTML = `written at ${content.university} University in ${content.year}`;
      }
      text.innerHTML = content.introText + ' . . . ';
      image.src = content.introImageUrl;
    },
  }

}
