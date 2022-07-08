import { Injectable } from '@angular/core';
import { GameStore } from './game.store';


@Injectable()
export class GameService {

	constructor(
		private gameStore: GameStore
	) {}

}
