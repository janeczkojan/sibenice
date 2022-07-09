import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CanActivateGameViewGuard } from './guards/can-activate-game-view.guard';


const components = [
	HeaderComponent
];


@NgModule({
	declarations: [
		...components
  	],
	imports: [
		CommonModule
	],
	exports: [
		...components
	]
})
export class SharedModule {}
