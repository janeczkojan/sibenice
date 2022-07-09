import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';


@NgModule({
	declarations: [
		HeaderComponent,
		AppComponent
	],
	imports: [
		BrowserModule,
		SharedModule,
		AppRoutingModule,
		environment.production ? [] : AkitaNgDevtools.forRoot()
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
