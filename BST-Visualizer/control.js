var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var x = document.getElementsByClassName("big-button");
addBtn = x[0];
deleteBtn = x[1];
searchBtn = x[2];
resetBtn = x[3];


function toAdd(){
    var x = document.getElementById("frm1");
    var text = "";
    var i;
    for (i = 0; i < x.length ;i++) {
        text += x.elements[i].value.trim();
    }
    
    if(tree.head == null){
        tree.startTree(text)
    }
    else{
        tree.addNode(text, tree.head, tree.curLv)
        tree.sleep(2000).then(() => { 
            ctx.clearRect(0, window.innerHeight/7 - 60, window.innerWidth, window.innerHeight);
            tree.drawTree(tree.head, 1)
         });
    }
}

function toSearch(){
    var x = document.getElementById("frm1");
    var text = "";
    var i;
    for (i = 0; i < x.length ;i++) {
        text += parseInt(x.elements[i].value.trim());
    }
    tree.search(text, tree.head);
    tree.sleep(2000).then(() => { 
        ctx.clearRect(0, window.innerHeight/7 - 60, window.innerWidth, window.innerHeight);
        tree.drawTree(tree.head, 1)
     });
}

function toReset(){
    tree.reset();
}

function toDelete(){
    var x = document.getElementById("frm1");
    var text = "";
    var i;
    for (i = 0; i < x.length ;i++) {
        text += parseInt(x.elements[i].value.trim());
    }
    tree.head = tree.delete(text, tree.head);
    ctx.clearRect(0, window.innerHeight/7 - 60, window.innerWidth, window.innerHeight);
    tree.drawTree(tree.head, 1)
}

function clear(){
    ctx.clearRect(0, window.innerHeight/7 - 60, window.innerWidth, window.innerHeight);
}

var tree = new BSTTree();

addBtn.addEventListener("click", toAdd);
deleteBtn.addEventListener("click", toDelete);
searchBtn.addEventListener("click", toSearch);
resetBtn.addEventListener("click", toReset);