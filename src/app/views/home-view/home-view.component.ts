import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
	selector: 'app-home-view',
	templateUrl: './home-view.component.html',
	styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

	constructor(
		private readonly router: Router
	) {}

	ngOnInit() {}

	handleNewGameClick() {
		this.router.navigateByUrl('/game-settings');
	}

}
