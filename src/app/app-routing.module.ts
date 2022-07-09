import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewsModule } from './views/views.module';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { GameSettingsViewComponent } from './views/game-settings-view/game-settings-view.component';
import { GameViewComponent } from './views/game-view/game-view.component';
import { CanActivateGameViewGuard } from './shared/guards/can-activate-game-view.guard';


const routes: Routes = [
	{
		path: '',
		component: HomeViewComponent
	},
	{
		path: 'game-settings',
		component: GameSettingsViewComponent
	},
	{
		path: 'game',
		component: GameViewComponent,
		canActivate: [ CanActivateGameViewGuard ]
	}
];


@NgModule({
	imports: [
		ViewsModule,
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}
