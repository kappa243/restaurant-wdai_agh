import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import {AuthService} from "./auth.service";
import {Roles} from "./user";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {


    constructor(private authService: AuthService, private router: Router) {
    }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        const allowedUserRoles = this.getRoutePermissions(route);
        return this.checkPermission(allowedUserRoles);
    }

    public canActivateChild(route: ActivatedRouteSnapshot) {
        const allowedUserRoles = this.getRoutePermissions(route);
        return this.checkPermission(allowedUserRoles);
    }

    public canLoad() {
        return this.checkPermission(null!);
    }

    private getRoutePermissions(route: ActivatedRouteSnapshot): Roles[] {
        if (route.data && route.data['userRoles']) {
            return route.data['userRoles'] as Roles[];
        }
        return null!;
    }


    private checkPermission(allowedUserRoles: Roles[]) {
        console.log("Checking access")
        console.log(allowedUserRoles)
        if (!allowedUserRoles) {
            console.log("No permission required. Access granted.")
            return true;
        } else {
            if (this.authService.isLoggedIn()) {
                console.log("User logged in.")
                if (allowedUserRoles.length == 0) {
                    console.log("User has required role. Access granted.")
                    return true;
                }
                for (const role of allowedUserRoles) {
                    if (this.authService.checkUserRole(role.toString())) {
                        console.log("User has required role. Access granted.")
                        return true;
                    }
                }
                console.log("Did not found required role. Redirecting to 404.")
                this.router.navigate(['404']);
                return false;
            }
            this.router.navigate(['404']);
            return false;
        }
    }

}
