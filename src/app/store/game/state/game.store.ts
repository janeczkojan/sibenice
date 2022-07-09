import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';


export enum GameDifficulty {
	NotSelected = '',
	VeryEasy = 'veryEasy',
	Easy = 'easy',
	Medium  = 'medium',
	Hard = 'hard',
	VeryHard = 'veryHard'
}


export enum GameStatus {
	NotStarted = 'notStarted',
	InSettings = 'inSettings',
	LoadingWords = 'loadingWords',
	Started = 'started',
	Finished = 'finished'
}


export type GameState = {
	status: GameStatus;
	difficulty: GameDifficulty;
	words: string[];
	loadingWords: boolean;
	wordGuess: string;
	userGuess: string;
	guessCount: number;
};


export const createInitialState = (): GameState => ({
	status: GameStatus.NotStarted,
	difficulty: GameDifficulty.NotSelected,
	words: [],
	loadingWords: false,
	wordGuess: '',
	userGuess: '',
	guessCount: 0
});


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'game' })
export class GameStore extends Store<GameState> {

	constructor() {
		super(createInitialState());
	}

}
