import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';
import { GameQuery } from '../../store/game/state/game.query';


@Injectable({
	providedIn: 'root'
})
export class CanActivateGameViewGuard implements CanActivate {

	constructor(
		private readonly gameQuery: GameQuery,
		private readonly router: Router
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.gameQuery.isDifficultySet$.pipe(
			take(1),
			map((isSet) => !!isSet),
			tap((isSet) => this.redirectIfNotSet(isSet))
		);
	}

	private redirectIfNotSet(isSet: boolean) {
		if (!isSet) {
			this.router.navigateByUrl('/game-settings');
		}
	}
	
}
