import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { GameStore, GameState } from './game.store';


@Injectable()
export class GameQuery extends Query<GameState> {

	constructor(protected override store: GameStore) {
		super(store);
	}

}
