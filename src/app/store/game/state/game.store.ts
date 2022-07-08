import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';


export interface GameState {
	 key: string;
}


export function createInitialState(): GameState {
	return {
		key: ''
	};
}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'game' })
export class GameStore extends Store<GameState> {

	constructor() {
		super(createInitialState());
	}

}
