export class ProcessManager{
  constructor(){this.next=1;this.items=new Map()}
  start(app,window){const id=this.next++;this.items.set(id,{id,app,window,started:Date.now()});return id}
  stop(id){this.items.delete(id)}
  list(){return [...this.items.values()]}
}
