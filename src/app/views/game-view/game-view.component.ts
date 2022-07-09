import { Component, OnInit} from '@angular/core';
import { GameService } from '../../store/game/state/game.service';
import { GameQuery } from '../../store/game/state/game.query';
import { Router } from '@angular/router';
import { GameStatus } from 'src/app/store/game/state/game.store';
import { Observable } from 'rxjs';


@Component({
	selector: 'app-game-view',
	templateUrl: './game-view.component.html',
	styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {

	constructor(
		private readonly router: Router,
		private readonly gameService: GameService,
		private readonly gameQuery: GameQuery
	) {}

	ngOnInit() {
		this.gameService.loadWords();
	}

	get isLoadingWords$(): Observable<boolean> {
		return this.gameQuery.isLoadingWords$;
	}

}
