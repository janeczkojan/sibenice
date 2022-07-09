import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../../store/game/state/game.service';
import { GameQuery } from '../../store/game/state/game.query';
import { Router } from '@angular/router';
import { GameStatus } from 'src/app/store/game/state/game.store';
import { Observable, Subscription } from 'rxjs';


@Component({
	selector: 'app-game-view',
	templateUrl: './game-view.component.html',
	styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit, OnDestroy {

	private sub = new Subscription();

	isLoadingWords: boolean = true;

	constructor(
		private readonly router: Router,
		private readonly gameService: GameService,
		public readonly gameQuery: GameQuery
	) {}

	ngOnInit() {
		this.sub.add(
			this.gameQuery.isLoadingWords$.subscribe((isLoading) => this.isLoadingWords = isLoading)
		);

		this.gameService.loadWords();
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	get isLoadingWords$(): Observable<boolean> {
		return this.gameQuery.isLoadingWords$;
	}

}
