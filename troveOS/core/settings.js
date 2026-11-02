const KEY="troveOS-settings";
export class Settings{
  constructor(){this.data=JSON.parse(localStorage.getItem(KEY)||"{}")}
  get(k,d){return this.data[k]??d}
  set(k,v){this.data[k]=v;localStorage.setItem(KEY,JSON.stringify(this.data))}
}
