import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewsModule } from './views/views.module';
import { HomeViewComponent } from './views/home-view/home-view.component';


const routes: Routes = [
	{
		path: '',
		component: HomeViewComponent
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
