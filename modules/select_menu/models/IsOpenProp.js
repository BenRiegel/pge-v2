//imports ----------------------------------------------------------------------

import ObservedVar from '../../../lib/ObservedVar.js';


//exports ----------------------------------------------------------------------

export default class IsOpenProp extends ObservedVar{
  constructor(defaultValue){
    super(defaultValue);
  }
  async onChange(currentValue, previousValue){
    if (currentValue === true){
      await this.broadcastTo('container', currentValue, previousValue);
      await this.broadcastTo('option-label', currentValue, previousValue);
      await this.broadcastTo('option-icon-char', currentValue, previousValue);
      await this.broadcastTo('option-icon-border', currentValue, previousValue);
      await this.broadcastTo('option-container-border', currentValue, previousValue);
      await this.broadcastTo('option-container-visibility', currentValue, previousValue);
      await this.broadcastTo('option-container-height', currentValue, previousValue);
      await this.broadcastTo('option-container-opacity', currentValue, previousValue);
    } else {
      await this.broadcastTo('option-container-opacity', currentValue, previousValue);
      await this.broadcastTo('option-container-height', currentValue, previousValue);
      await this.broadcastTo('option-container-visibility', currentValue, previousValue);
      await this.broadcastTo('option-container-border', currentValue, previousValue);
      await this.broadcastTo('option-icon-border', currentValue, previousValue);
      await this.broadcastTo('option-icon-char', currentValue, previousValue);
      await this.broadcastTo('option-label', currentValue, previousValue);
      await this.broadcastTo('container', currentValue, previousValue);
    }
  }
}
