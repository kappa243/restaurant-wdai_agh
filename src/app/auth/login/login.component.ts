import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    login_failed!: string;
    register_success!: boolean;

    formGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
    })

    constructor(private route: ActivatedRoute, public authService: AuthService) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.login_failed = params['login_failed'];
            if(this.login_failed != null){
                console.log(this.login_failed);
            }
            this.register_success = params['register_success']
        })
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    }

    onSubmit() {
        if (this.formGroup.valid) {
            let values = this.formGroup.value;

            this.authService.signIn(values.email, values.password)
        }
    }

    pep() {
        console.log(this.authService.isLoggedIn())
    }
}
