import Cell from "./cell.js";

export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.tissueHeight = 70;
        this.tissueWidth = 70;

        this.cellSize = 10;
        this.cells = this.createCells(this.tissueWidth,this.tissueHeight);

        //this.test(this.cellSize,this.cellSize);
        


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
        //Check neighbors and kill cells

        /*
        RULES:

            -Any live cell with two or three live neighbours survives.
            -Any dead cell with three live neighbours becomes a live cell.
            -All other live cells die in the next generation. Similarly, all other dead cells stay dead.
        
        */

        this.survivers = [];
        this.loners = [];

        for(let i = 0; i < this.tissueHeight; i++){
            for(let j = 0; j < this.tissueWidth; j++){
                if(remainsAlive(this.cells[i][j])){
                    this.survivers.push(this.cells[i][j]);
                    
                }
                else{
                    this.loners.push(this.cells[i][j]);
                }
            }
        }

        this.survivers.forEach(s => s.revive());
        this.loners.forEach(l => l.die());
        
    }


    remainsAlive(cell){
        //1
        
    }

    countNeighbors(cell){
        //
    }

    createCells(cols, rows){
        this.row = [];
        this.col = [];

        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                this.col.push(new Cell(this.gameWidth, this.gameHeight,i,j, this.cellSize, this.isAlive()));
                //console.log(i*this.cellSize);
            }
            this.row.push(this.col);
           // console.log(this.col);
            this.col = [];
            
        }
        console.log(this.row);
        return this.row;
    }

    isAlive(){
        this.chances = 75;
        this.luck = (Math.random()) * 100;
        return this.luck >= this.chances;
    }

}