import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';


@NgModule({
	declarations: [
		HeaderComponent,
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		environment.production ? [] : AkitaNgDevtools.forRoot()
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
