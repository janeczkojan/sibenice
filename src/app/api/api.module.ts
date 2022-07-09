import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsApiService } from './words-api.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule
	],
	providers: [
		WordsApiService
	]
})
export class ApiModule {}
