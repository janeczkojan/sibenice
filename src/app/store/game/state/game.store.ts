import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';


export enum GameDifficulty {
	NotSelected = '',
	Easy = 'easy',
	Medium  = 'medium',
	Hard = 'hard'
}


export enum GameStatus {
	NotStarted = 'notStarted',
	InSettings = 'inSettings',
	Started = 'started',
	Finished = 'finished'
}


export type GameState = {
	status: GameStatus;
	difficulty: GameDifficulty;
	words: string[];
	wordGuess: string;
};


export const createInitialState = (): GameState => ({
	status: GameStatus.NotStarted,
	difficulty: GameDifficulty.NotSelected,
	words: [],
	wordGuess: ''
});


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'game' })
export class GameStore extends Store<GameState> {

	constructor() {
		super(createInitialState());
	}

}
