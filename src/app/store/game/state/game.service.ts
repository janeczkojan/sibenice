import { Injectable } from '@angular/core';
import { GameDifficulty, GameState, GameStatus, GameStore } from './game.store';
import { WordsApiService } from '../../../api/words-api.service';
import { switchMap, toArray, tap, filter, map, take } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { GameQuery } from './game.query';


@Injectable()
export class GameService {

	constructor(
		private readonly gameStore: GameStore,
		private readonly gameQuery: GameQuery,
		private readonly wordsApiService: WordsApiService
	) {}

	incrementGuessCount() {
		this.gameStore.update((state) => ({ guessCount: state.guessCount + 1 }));
	}

	resetGuessCount() {
		this.gameStore.update(() => ({ guessCount: 0 }));
	}

	setGameStatus(status: GameStatus) {
		this.gameStore.update(() => ({ status }))
	}

	setGameDifficulty(difficulty: GameDifficulty) {
		this.gameStore.update(() => ({ difficulty }));
	}

	finishGame() {
		this.gameStore.update(() => ({ status: GameStatus.Finished }));
	}

	guessWord() {

	}

	loadWords() {
		const { difficulty } = this.gameStore.getValue();
		const [ min, max ] = this.getWordsMinMax(difficulty);

		of(true).pipe(
			tap(() => this.gameStore.update(() => ({ loadingWords: true, status: GameStatus.LoadingWords }))),
			switchMap(() => this.wordsApiService.fetchCzechWords()),
			switchMap((value) => from(value).pipe(
				filter((word) => word.length >= min && word.length <= max),
				toArray()
			)),
			map((words) => this.randomizeArray(words)),
			switchMap((words) => from(words).pipe(
				take(50),
				toArray()
			)),
			tap((words) => this.gameStore.update(() => ({ words }))),
			map((words) => this.getRandomArrayItem(words)),
			tap((wordGuess) => this.gameStore.update(() => ({ wordGuess, userGuess: this.generateEmptyGuessString(wordGuess) }))),
			tap(() => this.gameStore.update(() => ({ loadingWords: false, status: GameStatus.Started }))),
		).subscribe();
	}

	private generateEmptyGuessString(word: string): string {
		let str = '';

		for (let i = 0; i < word.length; i++) {
			str += '_';
		}
		
		return str;
	}

	private randomizeArray<T>(arr: T[]): T[] {
		return arr.sort((a, b) => 0.5 - Math.random());
	}

	private getRandomArrayItem<T>(arr: T[]): T {
		const index = Math.floor(Math.random() * arr.length);
		return arr[index];
	}

	private getWordsMinMax(difficulty: GameDifficulty): [ number, number ] {
		switch (difficulty) {
			case GameDifficulty.VeryEasy:
				return [ 2, 3 ];
			case GameDifficulty.Easy:
				return [ 3, 5 ];
			case GameDifficulty.Medium:
				return [ 5, 8 ];
			case GameDifficulty.Hard:
				return [ 8, 12 ];
			case GameDifficulty.VeryHard:
				return [ 12, 100 ];
			default:
				return [ 0, 0 ];
		}
	}

}
