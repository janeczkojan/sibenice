import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameStore, GameState, GameDifficulty } from './game.store';


@Injectable()
export class GameQuery extends Query<GameState> {

	constructor(protected override store: GameStore) {
		super(store);
	}

	wordGuess$: Observable<string> = this.select((state) => state.wordGuess);

	userGuess$: Observable<string> = this.select((state) => state.userGuess);

	guessCount$: Observable<number> = this.select((state) => state.guessCount);

	isLoadingWords$: Observable<boolean> = this.select((state) => state.loadingWords);

	isDifficultySet$: Observable<boolean> = this.select((state) => state.difficulty).pipe(
		map((difficulty) => difficulty !== GameDifficulty.NotSelected)
	);

}
