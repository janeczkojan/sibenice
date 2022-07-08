import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from './game/state/game.service';
import { GameQuery } from  './game/state/game.query';



@NgModule({
	declarations: [],
	imports: [
		CommonModule
	],
	providers: [
		GameQuery,
		GameService
	]
})
export class StoreModule {}
