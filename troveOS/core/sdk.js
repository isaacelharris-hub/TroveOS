export class TroveApp{
  constructor(os,options={}){this.os=os;this.options=options;this.title=options.title||"App";this.icon=options.icon||"◈"}
  onOpen(){} onClose(){} onFocus(){}
  render(){return document.createTextNode("App")}
  notify(message){this.os.notify(this.title,message)}
  saveFile(path,content){return this.os.fs.put({path,type:"file",content,name:path.split("/").pop()})}
}
