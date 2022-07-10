import { Injectable } from '@angular/core';
import { GameDifficulty, GameState, GameStatus, GameStore } from './game.store';
import { WordsApiService } from '../../../api/words-api.service';
import { switchMap, toArray, tap, filter, map, take, mergeMap } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { GameQuery } from './game.query';
import { ALPHABET_MAP_DIACRITICS } from '../../../shared/utils/alphabet';


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

	updateUserGuess(userGuess: string) {
		this.gameStore.update(() => ({ userGuess }));
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

	guessCharacter(character: string) {
		this.gameQuery.usedKeys$.pipe(
			take(1),
			map((keys) => Object.keys(keys)),
			filter((keys) => !keys.includes(character)),
			switchMap(() => this.processCharacter(character))
		).subscribe();
	}

	loadWords() {
		const { difficulty } = this.gameStore.getValue();
		const [ min, max ] = this.getWordsMinMax(difficulty);

		of(true).pipe(
			tap(() => this.gameStore.update(() => ({ loadingWords: true, status: GameStatus.LoadingWords }))),
			switchMap(() => this.wordsApiService.fetchCzechWords()),
			switchMap((value) => from(value).pipe(
				filter((word) => word.length >= min && word.length <= max),
				map((word) => word.toLocaleLowerCase()),
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

	private processCharacter(character: string): Observable<boolean> {
		const charFound$ = of(true).pipe(
			switchMap(() => this.gameQuery.wordAndGuess$),
			map(([ word, guess ]) => this.replaceCharInGuess(character, word, guess)),
			tap((newUserGuess) => this.updateUserGuess(newUserGuess)),
			map(() => true)
		);

		const charNotFound$ = of(false).pipe(
			tap(() => this.incrementGuessCount())
		);

		return of(ALPHABET_MAP_DIACRITICS[character]).pipe(
			filter((value) => !!value),
			switchMap((keys) => this.gameQuery.wordGuess$.pipe(
				map((word) => this.wordContainsOneOfChars(word, keys))
			)),
			switchMap((found) => !found ? charNotFound$ : charFound$),
			tap((found) => this.gameStore.update((state) => ({
				usedKeys: { ...state.usedKeys, [character]: found }
			})))
		);
	}

	private replaceCharInGuess(character: string, word: string, guess: string): string {
		const chars = ALPHABET_MAP_DIACRITICS[character];
		let output = guess;

		for (let i = 0; i < word.length; i++) {
			for (let char of chars) {
				if (word[i] === char) {
					const tmp = output.split('');
					tmp[i] = char;
					output = tmp.join('');
				}
			}
		}

		return output;
	}

	private wordContainsOneOfChars(word: string, chars: string[]): boolean {
		for (let char of chars) {
			if (word.includes(char)) {
				return true;
			}
		}

		return false;
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
