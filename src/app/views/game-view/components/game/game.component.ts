import { Component, Input, HostListener, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../../../../store/game/state/game.service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { ALPHABET_MAP_DIACRITICS } from '../../../../shared/utils/alphabet';
import { UsedKeys } from '../../../../store/game/state/game.store';


const IMAGE_PREFIX = 'sibenice_';
const IMAGE_SUFFIX = '.png';


@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

	private listenForKeySub = new Subscription();

	@Input() word: string | null = '';

	@Input() guess: string | null = '';
	
	@Input() guessCount: number | null = 0;

	@Input() usedKeys: UsedKeys | null = {};

	constructor(
		private readonly gameService: GameService
	) {}

	ngOnInit() {
		this.listenForKeySub = this.listenForKeyUp().subscribe();
	}

	ngOnDestroy() {
		if (this.listenForKeySub) {
			this.listenForKeySub.unsubscribe();
		}
	}

	listenForKeyUp(): Observable<string> {
		return fromEvent(window, 'keyup').pipe(
			map((event) => event as KeyboardEvent),
			map((event: KeyboardEvent) => event.key),
			filter((key) => !!key && key !== ''),
			map((key) => key.toLowerCase().charCodeAt(0)),
			filter((code) => code >= 97 && code <= 122),
			map((code) => String.fromCharCode(code)),
			tap((key) => this.gameService.guessCharacter(key))
		);		
	}

	handleAlphabetButtonClick(key: string) {
		this.gameService.guessCharacter(key);
	}

	get alphabet(): string[] {
		return Object.keys(ALPHABET_MAP_DIACRITICS);
	}

	get imageName(): string {
		if (this.guessCount === undefined || this.guessCount === null) {
			return '';
		}

		return `${IMAGE_PREFIX}${this.guessCount + 1}${IMAGE_SUFFIX}`;
	}

	get imageSrc(): string {
		return `/assets/images/${this.imageName}`;
	}

	get guessArray(): string[] {
		return Array.from(!this.guess ? '' : this.guess);
	}

}
