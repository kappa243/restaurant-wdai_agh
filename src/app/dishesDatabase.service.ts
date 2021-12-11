// import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
// import {EventEmitter, Injectable} from "@angular/core";
// import {Dish, DishCategory} from "./shared/models/dish.model";
// import {map, Observable} from "rxjs";
//
// @Injectable({
//     providedIn: 'root'
// })
// export class DishesDatabaseService {
//     dishesChanged = new EventEmitter<Dish[]>();
//     dataRef!: AngularFireList<Dish>;
//
//     dishes: Observable<PDish[]>;
//
//     constructor(private db: AngularFireDatabase) {
//         this.dataRef = db.list('/products');
//
//         // this.dataRef.valueChanges().subscribe(dishes => {
//         //     this.dishes = dishes;
//         // })
//
//         // this.items = this.dataRef.snapshotChanges().pipe(
//         //     map(changes => {
//         //         changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
//         //     })
//         // )
//
//         this.dishes = this.dataRef.snapshotChanges().pipe(
//             map(res => res.map(c =>
//                 (<PDish>{key: c.key, dish: c.payload.val()}))
//             ))
//     }
//
//     addDish(dish: Dish) {
//         this.dataRef.push(dish);
//     }
//
//     getDishes() {
//         return this.dishes;
//         // this.dataRef.snapshotChanges().subscribe(changes => {
//         //     changes.forEach(e => {
//         //         console.log(e.payload.toJSON())
//         //     })
//         // })
//         // this.dataRef.snapshotChanges().subscribe(changes => {
//         //     console.log(changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
//         // })
//         // this.dataRef.snapshotChanges().pipe(
//         //     map(changes => {
//         //         return changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
//         //     })
//         // )
//     }
//
//     addProduct() {
//         let dish: Dish = {
//             category: DishCategory.MainCourse,
//             cuisine: "Pols23ki",
//             description: "tes3424t dscription",
//             imgs: ["t6543st"],
//             inStock: 540,
//             ingredients: ["a", 'b', '6543'],
//             name: "Rosol",
//             price: 123,
//             type: "Zupa3"
//         }
//         this.dataRef.push(dish);
//     }
//
//     test() {
//         let dish: Dish = {
//             category: DishCategory.MainCourse,
//             cuisine: "Pols23ki",
//             description: "tes3424t dscription",
//             imgs: ["t6543st"],
//             inStock: 540,
//             ingredients: ["a", 'b', '6543'],
//             name: "Rosol",
//             price: 123,
//             type: "Zupa3"
//         }
//         this.addDish(dish);
//     }
// }
//
//
//
