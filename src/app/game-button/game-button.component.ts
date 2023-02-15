import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-button',
  templateUrl: './game-button.component.html',
  styleUrls: ['./game-button.component.scss']
})
export class GameButtonComponent implements OnInit {

  @Input('name') name: string = "";

  @Input('url') url: string = "";

  constructor() { }

  ngOnInit() {
  }

  goTo() {
    window.open(this.url, "_blank");
  }

}
