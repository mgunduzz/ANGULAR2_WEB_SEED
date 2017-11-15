import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }    from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';

import { CustomerPressListComponent } from './customer-press-modal/customer-press-list/customer-press-list.component';
import { CustomerPressModalComponent } from './customer-press-modal/customer-press-modal.component';
import { CustomerPressWizardComponent } from './customer-press-wizard/customer-press-wizard.component';
import { CustomerPressService } from './services/customer-press.service';
import { WizardStepComponent } from './customer-press-wizard/wizard/wizard-step.component';
import { WizardComponent } from './customer-press-wizard/wizard/wizard.component';
import { ColorPickerModule} from 'ngx-color-picker';
import { Daterangepicker } from 'ng2-daterangepicker';
import { ConfirmationPopoverModule  } from '../angular-confirmation-popover/confirmationPopover.module'

export function HttpLoaderFactory(http: Http) { 
  return new TranslateHttpLoader(http); 
}
 
@NgModule({
  imports: [
    CommonModule, NgbModule.forRoot(), FormsModule, ColorPickerModule, Daterangepicker, BlockUIModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })

  ],
  declarations: [CustomerPressListComponent, CustomerPressModalComponent, CustomerPressWizardComponent, WizardComponent, WizardStepComponent],
  exports: [CustomerPressListComponent],
  providers: [CustomerPressService],
  entryComponents: [CustomerPressModalComponent]


})
export class CustomerPressModule { }
