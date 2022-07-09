import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable()
export class WordsApiService {

	constructor(
		private readonly httpClient: HttpClient
	) {}

	fetchCzechWords(): Observable<string[]> {
		return this.httpClient.get<string[]>('/assets/json/czech_words.json').pipe(
			delay(500)
		);
	}
}
