import { Injectable } from '@angular/core';
import { GameStore } from './game.store';
import { WordsApiService } from '../../../api/words-api.service';


@Injectable()
export class GameService {

	constructor(
		private readonly gameStore: GameStore,
		private readonly wordsApiService: WordsApiService
	) {}

	loadWords() {
		this.wordsApiService.fetchCzechWords().subscribe((x) => console.log('slova', x));
	}

}
