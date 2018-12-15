//imports ----------------------------------------------------------------------

import NodeInstance from '../lib/NodeInstance.js';
import { addChildrenTo } from '../lib/ViewUtils.js';
import '../../stylesheets/popup_summary_content.scss';


//module code block ------------------------------------------------------------

var resizeImage = function( {naturalWidth, naturalHeight} ){
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

export default function NewPopupSummaryContent(onImageLoad, closeAction, expandAction){

  // view ----------------------------------------------------------------------

    /*super(`<div class='summary-content'>
             <div class='summary-close-button'>
               <span class="fa fa-times"></span>
             </div>
             <div class='project-title'></div>
             <div class='project-author'></div>
             <div class='project-inline-container'>
               <img class='project-image'>
               <span class='project-text'></span> . . .
               <span class='read-more-text'>Read more</span>
             </div>
           </div>`);*/

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
  image.onLoad = onImageLoad;
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
    resetOpacity(){
      container.setStyle('opacity', '0');
    },
    resetWindowSize(){
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
    resizeImage: async function(){
      var [width, height] = resizeImage(image.rootNode);
      image.setStyle('height', `${height}px`);
      image.setStyle('width', `${width}px`);
    },
    async resizeWindow(){
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
    async fadeUp(isAnimating){
      if (isAnimating){
        container.rootNode.style.transitionProperty = 'opacity';
        await container.transitionSetStyle('opacity', '1');
        container.rootNode.style.transition = '';
      } else {
        container.setStyle('opacity', '1');
      }
    },
    async fadeDown(isAnimating){
      if (isAnimating){
        container.rootNode.style.transitionProperty = 'opacity';
        await container.transitionSetStyle('opacity', '0');
        container.rootNode.style.transition = '';
      } else {
        container.setStyle('opacity', '0');
      }
    }
  }

}
