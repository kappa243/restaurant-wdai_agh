import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    register_failed!: string;

    formGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        type: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

    constructor(private route: ActivatedRoute, private authService: AuthService) {
    }


    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.register_failed = params['login_failed'];
            if (this.register_failed != null) {
                console.log(this.register_failed);
            }
        })
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    }

    onSubmit() {
        if (this.formGroup.valid) {
            let values = this.formGroup.value;

            this.authService.signUp(values.email, values.password, values.type);
        }
    }
}
