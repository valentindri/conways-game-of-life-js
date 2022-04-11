export default class Cell{
    constructor(worldWidth,worldHeight,xPos,yPos, cellSize,isAlive){
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
        this.yPos = yPos;
        this.xPos = xPos;
        this.size = cellSize;
        this.alive = isAlive;
    }

    draw(c){
        if(this.alive) 
        {
            c.beginPath();
            c.fillStyle = "green";
            
            c.fillRect(this.xPos*this.size,this.yPos*this.size,this.size,this.size);

            //c.rect(this.xPos,this.yPos,this.size,this.size);

        }
       
        

        //console.log("I'm cell " + this.xPos + " : " + this.yPos);
    }

    die(){
        this.alive = false;
    }

    revive(){
        this.alive = true;
    }
}