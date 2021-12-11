import {Component} from '@angular/core';
import {v4 as uuidv4} from "uuid"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'restaurant';

    localStorage = window.localStorage;

    constructor() {
        // temporary session generating
        const sessionID = uuidv4().toString();
        this.localStorage.setItem('sessionID',sessionID)
    }
}
