var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

class BSTNode{
    constructor(value, lv, xPos, yPos){
        this.data = value;
        this.left = null;
        this.right = null;
        this.level = lv;
        this.xPos = xPos;
        this.yPos = yPos;
    }
    drawNode(){
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 6;
        ctx.arc(this.xPos, this.yPos, 40, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = "25px Arial";
        ctx.fillText(this.data, this.xPos - 11, this.yPos + 3)
    }
}

class BSTTree{
    constructor(){
        this.head = null;
        this.curLv = 1;
    }
    startTree(val){
        this.head = new BSTNode(val, 1, window.innerWidth/2, window.innerHeight/7);
        this.head.drawNode();
    }
    
    getSlope(parent, child){
        let dy = Math.abs(parent.yPos - child.yPos);
        let dx = Math.abs(parent.xPos - child.xPos);
        return dy/dx;
    }
    
    drawLineLeft(parent, child, lv){
        let slope = this.getSlope(parent, child);
        ctx.beginPath();
        if(lv == 1){
            ctx.moveTo(parent.xPos - 50, parent.yPos + 50*slope);
            ctx.lineTo(child.xPos + 50, child.yPos - 50*slope);
            ctx.stroke();
        }
        else{
            ctx.moveTo(parent.xPos - 40, parent.yPos + 40*slope);
            ctx.lineTo(child.xPos + 40, child.yPos - 40*slope);
            ctx.stroke();
        }
        
    }
    drawLineRight(parent, child, lv){
        let slope = this.getSlope(parent, child);
        ctx.beginPath();
        if(lv == 1){
            ctx.moveTo(parent.xPos + 50, parent.yPos + 50*slope);
            ctx.lineTo(child.xPos - 50, child.yPos - 50*slope);
            ctx.stroke();
        }
        else{
            ctx.moveTo(parent.xPos + 40, parent.yPos + 40*slope);
            ctx.lineTo(child.xPos - 40, child.yPos - 40*slope);
            ctx.stroke();
        }
        
    }
    
    addNode(val, nodeToCompare, lv){
        if(val > 9 & val < 100 & lv < 4){
        if(val < nodeToCompare.data){
            console.log(nodeToCompare.data);
            if(nodeToCompare.left == null){
                console.log("adding left");
                console.log(val);
                nodeToCompare.left = new BSTNode(val, lv, nodeToCompare.xPos - 300/this.curLv, nodeToCompare.yPos + 100);
                this.drawLineLeft(nodeToCompare, nodeToCompare.left, this.curLv);
                this.curLv = 1;
                nodeToCompare.left.drawNode();
            }
            else{
                console.log("going left");
                console.log(val);
                this.curLv += 1;
                this.addNode(val, nodeToCompare.left, this.curLv);
            }  
        }

        if(val >= nodeToCompare.data){
            console.log(nodeToCompare.data);
            if(nodeToCompare.right == null){
                console.log("adding right");
                console.log(val);
                nodeToCompare.right = new BSTNode(val, lv, nodeToCompare.xPos + 300/this.curLv, nodeToCompare.yPos + 100);
                this.drawLineRight(nodeToCompare, nodeToCompare.right, this.curLv);
                this.curLv = 1;
                nodeToCompare.right.drawNode();
            }
            else{
                console.log("going right");
                console.log(val);
                this.curLv += 1;
                this.addNode(val, nodeToCompare.right, this.curLv);
            } 
        }
    }
    }
    
    search(val, nodeToCompare){
        if(val == nodeToCompare.data){
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.lineWidth = 6;
            ctx.arc(nodeToCompare.xPos, nodeToCompare.yPos, 40, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.strokeStyle = "black";
        }
        else if(val < nodeToCompare.data){
            if(nodeToCompare.left == null){
                return;
            }
            else{
                ctx.beginPath();
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 6;
                ctx.arc(nodeToCompare.xPos, nodeToCompare.yPos, 40, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.strokeStyle = "black";
                this.search(val, nodeToCompare.left);
            }
        }
        else{
            if(nodeToCompare.right == null){
                return;
            }
            else{
                ctx.beginPath();
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 6;
                ctx.arc(nodeToCompare.xPos, nodeToCompare.yPos, 40, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.strokeStyle = "black";
                this.search(val, nodeToCompare.right)
            }
        }
    }
    delete(val, nodeToCompare){
        if(val == nodeToCompare.data){
            if(nodeToCompare.left == null & nodeToCompare.right == null){
                return null;
            }
            else if(nodeToCompare.left == null){
                nodeToCompare.right.xPos = nodeToCompare.right.xPos - 300/nodeToCompare.right.level;
                nodeToCompare.right.yPos = nodeToCompare.right.yPos - 100;
                return nodeToCompare.right;
            }
            else if(nodeToCompare.right == null){
                nodeToCompare.left.xPos = nodeToCompare.left.xPos + 300/nodeToCompare.left.level;
                nodeToCompare.left.yPos = nodeToCompare.left.yPos - 100;
                return nodeToCompare.left;
            }
            else{
                var tempNode = nodeToCompare.right;
                while(tempNode.left != null) {
                    tempNode = tempNode.left;
                }
                nodeToCompare.data = tempNode.data;
                nodeToCompare.right = this.delete(nodeToCompare.data, nodeToCompare.right);
                return nodeToCompare;
            }
        }
        else if(val < nodeToCompare.data){
            nodeToCompare.left = this.delete(val, nodeToCompare.left);
            return nodeToCompare;
        }
        else{
            nodeToCompare.right = this.delete(val, nodeToCompare.right);
            return nodeToCompare;
        }
    }
    reset(){
        this.head = null;
        this.curLv = 1;
        ctx.clearRect(0, window.innerHeight/7 - 60, window.innerWidth, window.innerHeight);
    }

    drawTree(head, lv){
        if(head == null){
            return;
        }
        if(head.left != null){
            this.drawLineLeft(head, head.left, lv)
        }
        if(head.right != null){
            this.drawLineRight(head, head.right, lv)
        }
        this.drawTree(head.left, lv+1);
        head.drawNode();
        this.drawTree(head.right, lv+1);
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
}







