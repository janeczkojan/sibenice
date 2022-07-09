import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from './game/state/game.service';
import { GameQuery } from  './game/state/game.query';
import { ApiModule }  from '../api/api.module';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ApiModule
	],
	providers: [
		GameQuery,
		GameService
	]
})
export class StoreModule {}
