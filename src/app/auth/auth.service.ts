import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map, Observable} from "rxjs";
import firebase from "firebase/compat";
import {Router} from "@angular/router";
import {Roles, User} from "./user";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    fireUser: Observable<firebase.User | null>
    userMap: UserMap = null!;
    userData: User = null!;

    constructor(private router: Router, private angularFireAuth: AngularFireAuth, private db: AngularFireDatabase) {
        this.fireUser = angularFireAuth.authState;


        this.fireUser.pipe(map(user => {
            if (user != null) {
                this.db.object<User>('/users/' + user?.uid).valueChanges().pipe(map(userObject => {
                    this.userData = userObject!;
                    this.userMap = {key: user?.uid!, user: this.userData};
                })).subscribe()
            }else{
                this.userData = null!;
                this.userMap = null!;
            }
        })).subscribe()

        this.angularFireAuth.setPersistence('session');
    }

    signUp(email: string, password: string, role: string) {
        this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(res => {
            let roles: Roles;
            if (role == 'admin') {
                roles = {admin: true, manager: false, client: false}
            } else {
                roles = {admin: false, manager: false, client: true}
            }

            let user: User = {
                email: res.user?.email!,
                banned: false,
                roles: roles
            }

            this.db.object('/users/' + res.user?.uid).set(user);

            this.router.navigate(['/']);
        }).catch(err => {
            this.router.navigate(['register'], {queryParams: {register_failed: err}})
        })
    }

    signIn(email: string, password: string) {
        this.angularFireAuth.signInWithEmailAndPassword(email, password).then(() => {
            this.router.navigate(['']);
        }).catch(err => {
            this.router.navigate(['login'], {queryParams: {login_failed: err}})
        })
    }

    getUsers() {
        return this.db.list('/users').snapshotChanges().pipe(
            map(res => res.map(c =>
                (<UserMap>{key: c.key, user: c.payload.val()}))
            ))
    }

    getUser(uid: string) {
        return this.db.object('/object/' + uid).valueChanges();
    }


    signOut() {
        this.angularFireAuth.signOut().then(() => {
            this.router.navigate(['']);
        })
    }

    isLoggedIn() {
        return this.userData != null;
    }


    checkUserRole(role: string) {
        if (this.userData != null) {
            switch (role) {
                case 'admin':
                    return this.userData.roles.admin;
                case 'manager':
                    return this.userData.roles.manager;
                case 'client':
                    return this.userData.roles.client;
                default:
                    return false
            }
        } else {
            return false
        }
    }

    setPersistence(persistence: string) {
        this.angularFireAuth.setPersistence(persistence);
    }

    setBanState(uid: string, user: User) {
        user.banned = !user.banned;
        this.updateUser(uid, user);
    }

    updateUser(uid: string, user: User) {
        this.db.object<User>("/users/" + uid).update(user);
    }

    getUID() {
        if (this.userMap != null) {
            return this.userMap.key;
        } else {
            return null;
        }

    }

    getBanState() {
        if (this.userData != null) {
            return this.userData.banned;
        } else {
            return true;
        }
    }
}

export interface UserMap {
    key: string;
    user: User;
}
