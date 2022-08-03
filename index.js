function dosomething(me,e)
{
    if(event.srcElement.id=="delbutton")
    {
        let g=0;
       
        let title=(event.target.parentElement.firstChild);

        // alert(title.innerHTML)
         
        // alert(localtitle["title"]);
         for(let i=0;g<localStorage.length;i++)
         {
            // let localtitle=(JSON.parse(localStorage.getItem(i)));
            let op=(title.textContent).localeCompare(JSON.parse(localStorage.getItem(i))["title"]);
            if(op==0&&localStorage.getItem(i))//////////////////////////semicolon lga tha ediot yaha
             { 
                 localStorage.removeItem(i);
             }
     
         }
        
        
    let l=0;
        for(let k=0;l<localStorage.length;k++)
        {
            if(localStorage.getItem(k))
            {
                createNode(k);
                l++;
            }   
        }

        deletebutton();
        alert("Your note has been deleted");  
        if(localStorage.length==0)
      document.getElementById("default").innerHTML="You have no notes Yet!!!!!!!!!!";
    
    }
    if(e.srcElement.id=="editbutton")
        editbutton();
}
        
function deletebutton()
{
    event.target.parentElement.remove();
}
var myKey;       
function editbutton()
{
    document.getElementById("save").style.visibility="visible";
    document.getElementById("save").style.backgroundColor="red";
    
    
    let title=(event.target.parentElement.firstChild);

   // alert(title.innerHTML)
    
   // alert(localtitle["title"]);
    for(let i=0;i<localStorage.length;i++)
    {
       // let localtitle=(JSON.parse(localStorage.getItem(i)));
       let op=(title.textContent).localeCompare(JSON.parse(localStorage.getItem(i))["title"]);
       
        if(op==0)//////////////////////////semicolon lga tha ediot yaha
        { 
            myKey=i;
        }

    }
   
    document.getElementById("title").value=title.innerHTML;

    let note=title.nextElementSibling;
    document.getElementById("notes").value=note.innerHTML;

   // deletebutton();
}


function savechanges()
{ 
   alert(myKey);
    let date=new Date;
    event.srcElement.style.visibility="hidden";
    let details=JSON.parse(localStorage.getItem(myKey));
    details["title"]=document.getElementById("title").value;
    details["note"]=document.getElementById("notes").value;
    details["modifiedDate"]=(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
    localStorage.setItem(myKey,JSON.stringify(details));

    document.getElementById("adding").innerHTML="";
    document.getElementById("title").value="";
    document.getElementById("notes").value="";

    for(let k=0;k<localStorage.length;k++)
    {
        createNode(k); 
    }
    

}



function validate()
{
    if(document.getElementById("title").value==="")
    {
        alert("Title is required To add your note");
        return -1;
    }
    
}
function onvis()
{
    document.getElementById("demo").style.visibility="visible";
}

function onhid()
{
    document.getElementById("demo").style.visibility="hidden";
}

function checkStorage()
{
    if(typeof(Storage)!=="undefined")
    {
        console.log("Storage is available");
        return 1;
    }
    else{
        console.log("Not available");
        return -1;
    }
}
function store()
{
    let validation=validate();
    let locStorage=checkStorage();
    if(validation==(-1)||locStorage==(-1))
    {
        return;
    }
    else
    {
        document.getElementById("default").innerHTML="";  
        let date=new Date();
        
        let myobj={
            title:document.getElementById("title").value,
            note:document.getElementById("notes").value,
            creationDate:(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
        }
        let s=localStorage.length;
        localStorage.setItem(s,JSON.stringify(myobj));

        //clear the input area
        document.getElementById("title").value="";
        document.getElementById("notes").value="";
        createNode(s);

    }
    onvis();
    setTimeout(onhid,3000);
}
function createNode(s)
{
  //  alert(s);
    let newdiv=document.createElement("div");
    document.getElementById("adding").append(newdiv);
    //titlehead for title node
    let titlehead=document.createElement("h4");
    //notep paragraph for note node
    let notep=document.createElement("p");
    ///node for date
    let date=document.createElement("h6");
    //node for editbutton
    let editbutton=document.createElement("button");
    editbutton.append(document.createTextNode("Edit"));
    editbutton.setAttribute("id","editbutton")
    //node for del button
    let delbutton=document.createElement("button");
    delbutton.append(document.createTextNode("Delete"));
    delbutton.setAttribute("id","delbutton")

    newdiv.append(titlehead);
    newdiv.append(notep);
    newdiv.append(date); 

    let len=JSON.parse(localStorage.getItem(s));
    //alert(len["modifiedDate"]);
    //alert("kength of array "+len);
    if(len["modifiedDate"]==undefined)
    {
       // alert(false);
    }
    else
    {
        let modiDate=document.createElement("h6");
        newdiv.append(modiDate);
        modiDate.style.float="left";
       // modiDate.style.marginRight="0px";
       // modiDate.style.float="right";
       modiDate.style.marginTop="13px";
       modiDate.style.marginLeft="0px";
       
        modiDate.append(JSON.parse(localStorage.getItem(s))["modifiedDate"]);
    }

    newdiv.append(editbutton);
    newdiv.append(delbutton);

    
    styling(newdiv,titlehead,notep,delbutton,editbutton,date);
    values(titlehead,notep,date,s);

  
}
function values(titlehead,notep,date,s){
  //  alert(s)
    if(s>=0)
    {
        titlehead.append(JSON.parse(localStorage.getItem(s))["title"]);
        notep.append(JSON.parse(localStorage.getItem(s))["note"]);
        date.append(JSON.parse(localStorage.getItem(s))["creationDate"]);
    }
}
window.onload=function() {     
    
   // localStorage.clear();
     if(localStorage.length==0)
      document.getElementById("default").innerHTML="You have no notes Yet!!!!!!!!!!";   
    else
    document.getElementById("default").innerHTML=""; 
  // alert(localStorage.length);
  //alert("onload")
  var f=0;
  for(let k=0;f<localStorage.length;k++)
  {
    if(localStorage.getItem(k))
    {
        createNode(k);
        f++;
    }

  }
    
}

  
function styling(newdiv,titlehead,notep,delbutton,editbutton,date)
{
    newdiv.style.backgroundColor="black";
    newdiv.style.color="white";
    newdiv.style.width="300px";
    newdiv.style.height="150px";
    newdiv.style.marginLeft="100px";
    newdiv.style.marginTop="10px";
    newdiv.style.border="2px solid black";
    newdiv.style.borderRadius="16px";
    newdiv.style.position="relative";            
    newdiv.style.overflow="scroll";
     
    
    titlehead.style.textAlign="center";
    titlehead.style.textAlign="center";
    titlehead.style.marginTop="15px";

    notep.style.textAlign="center";
    notep.style.marginTop="16px";

    date.style.float="right";
    date.style.marginRight="5px";
    date.style.marginTop="13px";

    delbutton.style.width="70px";
    delbutton.style.height="30px";
    delbutton.style.fontSize="12px";
    delbutton.style.right="0";
    delbutton.style.position="absolute";
    delbutton.style.float="right";
    delbutton.style.bottom="0";
    delbutton.style.marginBottom="0";
    delbutton.style.paddingBottom="0";
    delbutton.style.color="white";

    editbutton.style.color="white";
    editbutton.style.height="30px";
    editbutton.style.position="absolute";
    editbutton.style.bottom="0";
    editbutton.style.left="0";
    editbutton.style.width="70px";
    editbutton.style.fontSize="12px";
    editbutton.setAttribute("id","editbutton")
    
}
function func()
{
    if(7>4)
    {alert("true")}
}
func();