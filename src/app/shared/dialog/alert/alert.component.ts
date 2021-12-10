import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit {
    message: string = ""
    cancelButtonText = ""

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: { message: string; buttonText: string },
        private dialogRef: MatDialogRef<AlertComponent>) {
        this.message = data.message;
        this.cancelButtonText = data.buttonText;

        this.dialogRef.updateSize('300vw', '300vw')
    }

    ngOnInit(): void {
    }

}
