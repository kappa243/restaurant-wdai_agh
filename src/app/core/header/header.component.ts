import {Component, Input, OnInit} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {AuthService} from "../../auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Input() drawerButton!: MatDrawer;
    @Input() routing!: { name: string, path: string }[]

    constructor(public authService: AuthService) {
    }

    ngOnInit(): void {
    }

    openSideNav() {
        this.drawerButton.toggle();
    }
}
