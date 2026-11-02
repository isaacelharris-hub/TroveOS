export default {title:"Color Clock",icon:"🌈",mount(os,root){let h=document.createElement("h1");root.append(h);setInterval(()=>h.textContent=new Date().toLocaleString(),500)}}
