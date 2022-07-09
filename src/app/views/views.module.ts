import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view/home-view.component';
import { GameSettingsViewComponent } from './game-settings-view/game-settings-view.component';
import { GameViewComponent } from './game-view/game-view.component';


@NgModule({
	declarations: [
		HomeViewComponent,
  		GameSettingsViewComponent,
  		GameViewComponent
	],
	imports: [
		CommonModule
	]
})
export class ViewsModule {}
