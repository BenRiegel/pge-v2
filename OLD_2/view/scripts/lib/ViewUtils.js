export function getParentNodeProperty(node, className, prop){
  while (node){
    if (node.classList && node.classList.contains(className)){
      return node.dataset[prop];
    }
    node = node.parentNode;
  }
  return null;
};

var wait = async function(time){
  await new Promise( resolve => {
    setTimeout(resolve, time);
  });
}

export async function waitAtLeast(minTime, doFunction){
  var startTimeStamp = new Date().getTime();
  await doFunction();
  var endTimeStamp = new Date().getTime();
  var timeElapsed = endTimeStamp - startTimeStamp;
  var timeRemainding = minTime - timeElapsed;
  if (timeRemainding > 0){
    await wait(timeRemainding);
  }
}

export function getDimensions(node){
  var rect = node.getBoundingClientRect();
  return {
    left: node.offsetLeft,
    top: node.offsetTop,
    width: rect.width,
    height: rect.height,
  }
}

export function addChildrenTo(parent, children){
  var docFragment = document.createDocumentFragment();
  for (var child of children){
    docFragment.appendChild(child.rootNode);
  }
  parent.rootNode.appendChild(docFragment);
}

//is this used other than in selectMenu?
export async function doForAll(childComponents, functionName, ...args){
  var promises = [];
  for (var child of childComponents){
    var p = child[functionName](...args);
    promises.push(p);
  }
  await Promise.all(promises);
}
