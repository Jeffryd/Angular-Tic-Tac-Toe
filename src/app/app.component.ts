import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //init and manage game status
  currentGame: Game[];
  gameStatus: boolean;
  player: 'X' | '0' = 'X';
  winner: string;
  setwinningPosible = Game.winning();

  ngOnInit(): void {
    this.resetGame();
  }

  turn(id: number, pickedValue: number) {
    //when player picked value then show drawing
    this.drawPickedValue(id);
    this.getGameState();
    this.switchPlayer();
  }

  getGameState(){
    let x = this.getPickedValues('X');
    let o = this.getPickedValues('0');

    let result = [{x : [...x], o : [...o]}];

    result.forEach(
      compare => {
        this.getwinner(compare['x']),
        this.getwinner(compare['o'])
      }
    );
  }

  getwinner( values : number[] ){
    let prepareVaues = values.sort().slice(0,3);
    //return if not available to compare
    if( prepareVaues.length < 3 ) return;
    this.setwinningPosible.forEach(
      winOption => {
        if( JSON.stringify(winOption) == JSON.stringify(prepareVaues))
        { this.gameStatus = false;
          return this.winner = this.player
        }
      }
    ); 
  }

  getPickedValues( player : 'X' | '0'){
    return this.currentGame
    .filter( selected => selected['player'] === player)
    .map( values => values['pickedValue'] )
  }
  
  switchPlayer(){
   this.player =  this.player === 'X' ? '0' : 'X'; 
  }

  drawPickedValue(id) {
    // update picked value
    this.currentGame.find(item => item['id'] == id)['player'] = this.player;
  }

  resetGame() {
    this.winner = 'None';
    this.player = 'X';
    this.gameStatus = true;
    return (this.currentGame = [
      { id: 1, player: '', pickedValue: 0, styles: 'square' },
      { id: 2, player: '', pickedValue: 1, styles: 'square border-y' },
      { id: 3, player: '', pickedValue: 2, styles: 'square' },
      { id: 4, player: '', pickedValue: 3, styles: 'square border-x' },
      { id: 5, player: '', pickedValue: 4, styles: 'square border' },
      { id: 6, player: '', pickedValue: 5, styles: 'square border-x' },
      { id: 7, player: '', pickedValue: 6, styles: 'square' },
      { id: 8, player: '', pickedValue: 7, styles: 'square border-y' },
      { id: 9, player: '', pickedValue: 8, styles: 'square' }
    ]);
  }
}

export class Game {
  constructor(
    id: number,
    player: 'X' | '0',
    pickedValue: number,
    styles?: string
  ) {}

  static winning() {
    let winningOptions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
      [0, 3, 6]
    ];
    return winningOptions;
  }
}
