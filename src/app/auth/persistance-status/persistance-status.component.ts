import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-persistance-status',
    templateUrl: './persistance-status.component.html',
    styleUrls: ['./persistance-status.component.css']
})
export class PersistanceStatusComponent implements OnInit {

    persistence!: string;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    changePersistance(){
        this.authService.setPersistence(this.persistence)
    }

}
