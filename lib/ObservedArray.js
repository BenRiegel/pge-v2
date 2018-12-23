export default class ObservedArray{
  constructor(initValue){
    this.value = initValue || [];
    this.lastChange = undefined;
    this.listeners = [];
  }
  addListener(source, request, cb){
    this.listeners.push( {source, request, cb} );
  }
  async broadcastTo(target, request, ...args){
    var promises = [];
    for (var listener of this.listeners){
      if (target === 'all' || target === listener.source){
        if (request === listener.request){
          var p = listener.cb(...args);
          promises.push(p);
        }
      }
    }
    await Promise.all(promises);
  }
  async onChange(currentValue, change){
    await this.broadcastTo('all', 'updateOnChange', currentValue, change);
  }
  async add(newElement){
    this.lastChange = newElement;
    await this.onChange(this.value, newElement);
  }
}
