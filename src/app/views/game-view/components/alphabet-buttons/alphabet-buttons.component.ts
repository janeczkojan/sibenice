import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsedKeys } from '../../../../store/game/state/game.store';


@Component({
	selector: 'app-alphabet-buttons',
	templateUrl: './alphabet-buttons.component.html',
	styleUrls: ['./alphabet-buttons.component.scss']
})
export class AlphabetButtonsComponent implements OnInit {

	@Input() alphabet: string[] = [];

	@Input() usedKeys: UsedKeys = {};

	@Output() buttonClick = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {}

	handleButtonClick(key: string) {
		this.buttonClick.emit(key);
	}

}
