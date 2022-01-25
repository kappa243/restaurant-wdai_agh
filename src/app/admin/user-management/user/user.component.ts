import {Component, Input, OnInit} from '@angular/core';
import {AuthService, UserMap} from "../../../auth/auth.service";
import {Roles, User} from "../../../auth/user";
import {FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    @Input() userMap!: UserMap;
    user!: User;

    roles!: FormGroup;
    rolesTypes = Object.keys(Roles);

    constructor(private authService: AuthService, private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.user = this.userMap.user;
    }

    hasRole(role: string) {
        return this.user.roles.find(r => r == role.toLowerCase()) != null;
    }

    addRole(role: string) {
        role = role.toLowerCase();
        if (!this.hasRole(role)) {
            this.user.roles.push(role);
            this.authService.updateUser(this.userMap.key, this.user);
        }
    }

    removeRole(role: string, checkbox: MatCheckbox) {
        role = role.toLowerCase();
        if (this.hasRole(role)) {
            if (this.user.roles.length == 1) {
                this.snackBar.open("User must have at least 1 role!", undefined, {
                    duration: 2000
                });
                checkbox.checked = true;
                return;
            }
            let index = this.user.roles.findIndex(r => r == role);
            this.user.roles.splice(index, 1);
            this.authService.updateUser(this.userMap.key, this.user);
        }
    }

    changeRole(role: string, checkbox: MatCheckbox) {
        if (checkbox.checked) {
            this.addRole(role)
        } else {
            this.removeRole(role, checkbox)
        }
    }

    changeBan() {
        this.user.banned = !this.user.banned;
        this.authService.updateUser(this.userMap.key, this.user)
    }
}
