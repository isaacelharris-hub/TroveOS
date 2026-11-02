const DB="troveOS-files",STORE="entries";
export class FileSystem{
  constructor(){this.ready=this.open()}
  open(){return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore(STORE,{keyPath:"path"});r.onsuccess=()=>{this.db=r.result;resolve(this)};r.onerror=()=>reject(r.error)})}
  tx(mode="readonly"){return this.db.transaction(STORE,mode).objectStore(STORE)}
  async all(){await this.ready;return new Promise((ok,no)=>{const r=this.tx().getAll();r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)})}
  async get(path){return (await this.all()).find(x=>x.path===norm(path))}
  async put(entry){await this.ready;entry.path=norm(entry.path);return new Promise((ok,no)=>{const r=this.tx("readwrite").put({...entry,updated:Date.now()});r.onsuccess=()=>ok(entry);r.onerror=()=>no(r.error)})}
  async remove(path){await this.ready;return new Promise((ok,no)=>{const r=this.tx("readwrite").delete(norm(path));r.onsuccess=ok;r.onerror=()=>no(r.error)})}
  async children(path="/"){return (await this.all()).filter(x=>parent(x.path)===norm(path))}
  async ensure(path,type="folder",content=""){if(!await this.get(path))await this.put({path,type,content,name:path.split("/").pop()})}
  async seed(){await this.ready;for(const d of ["Documents","Pictures","Music","Downloads","Desktop","Trash"])await this.ensure("/"+d);if(!(await this.get("/Documents/Welcome.txt")))await this.put({path:"/Documents/Welcome.txt",type:"file",content:"Welcome to troveOS!\\nYour files are stored in this browser.\\nOpen the launcher to explore your apps.",name:"Welcome.txt"})}
  async rename(oldPath,newPath){const e=await this.get(oldPath);if(!e)throw Error("File not found");await this.remove(oldPath);e.path=norm(newPath);e.name=e.path.split("/").pop();return this.put(e)}
  async copy(src,dst){const e=await this.get(src);if(!e)throw Error("File not found");return this.put({...e,path:norm(dst),name:norm(dst).split("/").pop()})}
}
function norm(p){return("/"+String(p||"/").split("/").filter(Boolean).join("/"))||"/"}
function parent(p){const n=norm(p),i=n.lastIndexOf("/");return i<=0?"/":n.slice(0,i)}
