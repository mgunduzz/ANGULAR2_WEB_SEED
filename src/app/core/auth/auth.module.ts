import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { AuthGuard, CanUseTvArchiveGuard, CanUsePressArchiveGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  imports: [
      LoginModule, BlockUIModule
  ],
  providers: [
    AuthGuard, CanUseTvArchiveGuard, CanUsePressArchiveGuard,
    AuthService
  ]

})
export class AuthModule {
}
