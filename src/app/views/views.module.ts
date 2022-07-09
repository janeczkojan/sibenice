import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view/home-view.component';
import { GameSettingsViewComponent } from './game-settings-view/game-settings-view.component';
import { GameViewComponent } from './game-view/game-view.component';
import { StoreModule } from '../store/store.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
	declarations: [
		HomeViewComponent,
  		GameSettingsViewComponent,
  		GameViewComponent
	],
	imports: [
		CommonModule,
		StoreModule,
		SharedModule
	]
})
export class ViewsModule {}
