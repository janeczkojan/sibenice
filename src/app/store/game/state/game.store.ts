import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';


export type GameState = {
	 key: string;
};


export const createInitialState = (): GameState => ({
	key: ''
});


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'game' })
export class GameStore extends Store<GameState> {

	constructor() {
		super(createInitialState());
	}

}
