import Cell from "./cell.js";

export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.tissueHeight = 50;
        this.tissueWidth = 50;

        this.cellSize = 8;
        this.cells = this.createCells(this.tissueWidth,this.tissueHeight);

    }

  
    draw(c){
        c.clearRect(0,0,this.gameWidth,this.gameHeight);

        for(let i = 0; i < this.tissueHeight; i++){
            for(let j = 0; j < this.tissueWidth; j++){
                this.cells[i][j].draw(c);
            }
        }

    }

    update(){
        //Check neighbors and kill uncompliant cells

        /*
        RULES:

            -Any live cell with two or three live neighbours survives.
            -Any dead cell with three live neighbours becomes a live cell.
            -All other live cells die in the next generation. Similarly, all other dead cells stay dead.
        
        */

        this.revivers = [];
        this.dying = [];

        for(let i = 0; i < this.tissueHeight; i++){
            for(let j = 0; j < this.tissueWidth; j++){
                this.neighboors = this.neighborsCount(this.cells[i][j]);

                if(this.cells[i][j].isAlive()){
                    if(this.neighboors != 2 && this.neighboors != 3){
                        this.dying.push(this.cells[i][j]);
                    }
                    else continue;
                }
                else{
                    if(this.neighboors == 3){
                        this.revivers.push(this.cells[i][j]);
                    }
                    else continue;
                }
            }
        }

        this.dying.forEach(l => l.die());
        this.revivers.forEach(r => r.revive());
        
        
    }


    neighborsCount(cell){
        this.count = 0;
        this.neighboors = this.cellNeighboors(cell);
        
        for(let n of this.neighboors){
            if(n.isAlive()){
               this.count++; 
            }
        }
        
        return this.count;
    }

    cellNeighboors(cell){
        this.neighboors = [];

        if(cell.colPos > 0 && cell.rowPos > 0) 
        this.neighboors.push(this.cells[cell.rowPos-1][cell.colPos-1]);//upper left

        if(cell.colPos > 0)
        this.neighboors.push(this.cells[cell.rowPos][cell.colPos-1]); //left

        if(cell.colPos > 0 && cell.rowPos < this.tissueHeight-1)
        this.neighboors.push(this.cells[cell.rowPos+1][cell.colPos-1]); //bottom left

        if(cell.rowPos > 0) 
        this.neighboors.push(this.cells[cell.rowPos-1][cell.colPos]);//above

        if(cell.rowPos < this.tissueHeight-1) 
        this.neighboors.push(this.cells[cell.rowPos+1][cell.colPos]);//below

        if(cell.colPos < this.tissueWidth-1 && cell.rowPos > 0)
        this.neighboors.push(this.cells[cell.rowPos-1][cell.colPos+1]);//upper right

        if(cell.colPos < this.tissueWidth-1)
        this.neighboors.push(this.cells[cell.rowPos][cell.colPos+1]);//right
            
        if(cell.colPos < this.tissueWidth-1 && cell.rowPos < this.tissueHeight-1)
        this.neighboors.push(this.cells[cell.rowPos+1][cell.colPos+1]);//bottom right


        return this.neighboors;
    }



    createCells(rows, cols){
        this.row = [];
        this.col = [];

        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                this.col.push(new Cell(j,i, this.cellSize, this.willLive()));
                
            }
            this.row.push(this.col);
           
            this.col = [];
            
        }
        
        return this.row;
    }

    willLive(){
        this.chancesOfLiving = 10;
        this.badLuck = (Math.random()) * 100;
        return this.badLuck <= this.chancesOfLiving;
    }

}