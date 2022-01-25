import {Component} from '@angular/core';
import {v4 as uuidv4} from "uuid"
import {AuthService} from "./auth/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'restaurant';

    routing: { name: string, path: string }[] = [{name: "Dishes", path: "dishes"}]

    localStorage = window.localStorage;

    constructor(public authService: AuthService) {
        // temporary session generating
        const sessionID = uuidv4().toString();
        this.localStorage.setItem('sessionID', sessionID)
    }
}
