import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    
    CanLoad, Route
} from '@angular/router';
import { SessionService } from './session.service';
import {RightsModel} from  "../model/rights.model"
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private sessionService: SessionService, private router: Router, private translate: TranslateService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        let url = `/home/${route.path}`;  // TODO: hack. route.path should be absolute but isn't

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.sessionService.isLoggedIn) {
             if (this.translate.currentLang != this.sessionService.session.user.lang.lang) {

                this.translate.setDefaultLang(this.sessionService.session.user.lang.lang);
                this.translate.use(this.sessionService.session.user.lang.lang);
              moment.lang(this.sessionService.session.user.lang.lang);
            }

            return true;
        }

        // Store the attempted URL for redirecting
        this.sessionService.redirectUrl = url;

        this.router.navigate(['/login']);
        return false;
    }
}




@Injectable()
export class CanUseTvArchiveGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router, private translate: TranslateService) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.sessionService.session.rights.indexOf(RightsModel.MidilliPublicCanShowTvArchive.uuid)>-1) {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable()
export class CanUsePressArchiveGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router, private translate: TranslateService) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.sessionService.session.rights.indexOf(RightsModel.MidilliPublicCanShowPressArchive.uuid) > -1) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

 