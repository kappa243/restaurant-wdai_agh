import {Component, Input, OnInit} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Input() drawerButton!: MatDrawer;

    constructor() {
    }

    ngOnInit(): void {
    }

    openSideNav(){
        this.drawerButton.toggle();
    }
}
