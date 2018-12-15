//imports ----------------------------------------------------------------------

import ObservedVar from '../../../lib/ObservedVar.js';


//exports ----------------------------------------------------------------------

export default class IsVisibleProp extends ObservedVar{
  constructor(){
    super();
  }
  async onChange(currentValue, previousValue){
    await this.broadcastTo('spinner', currentValue, previousValue);
    await this.broadcastTo('background', currentValue, previousValue);
  }
}
