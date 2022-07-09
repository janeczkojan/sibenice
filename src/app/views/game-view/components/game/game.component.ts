import { Component, Input } from '@angular/core';
import { GameService } from '../../../../store/game/state/game.service';


const IMAGE_PREFIX = 'sibenice_';
const IMAGE_SUFFIX = '.png';


@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent {

	@Input() word: string | null = '';

	@Input() guess: string | null = '';
	
	@Input() guessCount: number | null = 0;

	constructor(
		private readonly gameService: GameService
	) {}

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
