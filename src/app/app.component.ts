import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'restaurant';

    // constructor(private dbService: DishesDatabaseService) {
    //     this.dbService.dishes.subscribe(pdish =>{
    //         this.dishes = pdish;
    //     })
    // }
    //
    // add(){
    //     this.dbService.test();
    // }
    //
    // dishes: any;
    // add2(){
    //       console.log(this.dishes)
    // }
}
