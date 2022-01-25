import {Component, OnInit} from '@angular/core';
import {AuthService, UserMap} from "../../auth/auth.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
    userMap: Observable<UserMap[]>;

    constructor(public authService: AuthService) {
        this.userMap = this.authService.getUsers();
    }

    ngOnInit(): void {

    }

}

