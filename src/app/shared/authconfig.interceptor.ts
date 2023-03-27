import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        const isAdmin = this.authService.getIsAdmin();
        const user = this.authService.getUser();
        const email = this.authService.getEmail();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken,
                isAdmin: isAdmin,
                Username: user,
                Email: email,
                Access_token: authToken ?? ""
            }
        });
        return next.handle(req);
    }
}
