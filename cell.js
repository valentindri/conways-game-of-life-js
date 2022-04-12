export default class Cell{
    constructor(colPos,rowPos, cellSize, isAlive){
        
        this.colPos = colPos;
        this.rowPos = rowPos;
        
        this.size = cellSize;

        this.alive = isAlive;

        
    }

   
    draw(c){
        if(this.alive) 
        {
            c.beginPath();
            c.fillStyle = "green";
            
            c.fillRect(this.colPos*this.size,this.rowPos*this.size,this.size,this.size);


            

        }
        else return;
       
        //c.fillStyle = "black";
        //c.font = "13px Arial";
        //c.fillText(this.colPos + ":" + this.rowPos,(this.colPos*this.size) + 5,(this.rowPos * this.size) + 20);
        

        
    }

    die(){
        this.alive = false;
    }

    revive(){
        this.alive = true;
    }

    isAlive(){
        return this.alive;
    }
}