import { Component } from '@angular/core';
import { GameStore } from './store/game/state/game.store';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	
	constructor(
		private gameStore: GameStore
	) {}

}
