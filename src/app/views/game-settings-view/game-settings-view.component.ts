import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameStatus, GameDifficulty } from 'src/app/store/game/state/game.store';
import { GameService } from '../../store/game/state/game.service';


type Difficulty = {
	key: GameDifficulty;
	name: string;
};


@Component({
	selector: 'app-game-settings-view',
	templateUrl: './game-settings-view.component.html',
	styleUrls: ['./game-settings-view.component.scss']
})
export class GameSettingsViewComponent implements OnInit {

	difficulties: Difficulty[] = [
		{ key: GameDifficulty.VeryEasy, name: 'Velmi lekhá' },
		{ key: GameDifficulty.Easy, name: 'Lehká' },
		{ key: GameDifficulty.Medium, name: 'Střední' },
		{ key: GameDifficulty.Hard, name: 'Těžká' },
		{ key: GameDifficulty.VeryHard, name: 'Velmi těžká' }
	];

	constructor(
		private readonly router: Router,
		private readonly gameService: GameService
	) {}

	ngOnInit() {
		this.gameService.setGameStatus(GameStatus.InSettings);
	}

	handleDifficultyButtonClick(difficulty: Difficulty) {
		this.gameService.setGameDifficulty(difficulty.key);
		this.router.navigateByUrl('/game');
	}

}
