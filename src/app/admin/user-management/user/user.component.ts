import {Component, Input, OnInit} from '@angular/core';
import {AuthService, UserMap} from "../../../auth/auth.service";
import {User} from "../../../auth/user";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    @Input() userMap!: UserMap;
    user!: User;


    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.user = this.userMap.user;
    }

    hasRole(role: string) {
        switch (role) {
            case 'admin':
                return this.user.roles.admin;
            case 'manager':
                return this.user.roles.manager;
            case 'client':
                return this.user.roles.client;
            default:
                return false
        }
    }

    addRole(role: string) {
        role = role.toLowerCase();
        if (!this.hasRole(role)) {
            switch (role) {
                case 'admin':
                    this.user.roles.admin = true;
                    break;
                case 'manager':
                    this.user.roles.manager = true;
                    break;
                case 'client':
                    this.user.roles.client = true;
                    break;
                default:
                    return;
            }
            this.authService.updateUser(this.userMap.key, this.user);
        }
    }

    removeRole(role: string) {
        role = role.toLowerCase();
        if (this.hasRole(role)) {
            switch (role) {
                case 'admin':
                    this.user.roles.admin = false;
                    break;
                case 'manager':
                    this.user.roles.manager = false;
                    break;
                case 'client':
                    this.user.roles.client = false;
                    break;
                default:
                    return;
            }
            this.authService.updateUser(this.userMap.key, this.user);
        }
    }

    changeRole(role: string, checkbox: MatCheckbox) {
        if (checkbox.checked) {
            this.addRole(role)
        } else {
            this.removeRole(role)
        }
    }

    changeBan() {
        this.user.banned = !this.user.banned;
        this.authService.updateUser(this.userMap.key, this.user)
    }
}
