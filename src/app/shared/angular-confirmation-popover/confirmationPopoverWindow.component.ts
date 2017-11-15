import {
  Component,
  AfterViewInit,
} from '@angular/core';
import {ConfirmationPopoverWindowOptions} from './confirmationPopoverOptions.provider';
import {TranslateService} from '@ngx-translate/core';
import { SessionService } from "../../core/auth/session.service"
/**
 * @private
 */
@Component({
  styles: [`
    .popover {
      display: block;
    }
.popover-title{font-size:19px}
  `],
  template: `
    <ng-template #defaultTemplate let-options="options">
      <div [class]="'popover ' + options.placement + ' popover-' + options.placement + ' ' + options.popoverClass" style="max-width:170px !important;min-width:170px !important;">
        <div class="popover-arrow arrow"></div>
        <h3 class="popover-title" style="padding:6px;" [innerHTML]="options.title"></h3>
        <div class="popover-content" style="padding:6px;padding-top:2px;">
          <p [innerHTML]="options.message" style="margin-bottom: 6px;"></p>
          <div class="row" style="margin-left:0px;">
            <div
              class="col-xs-6 col-6"
              [ngClass]="{'col-xs-offset-3 col-offset-3': options.hideCancelButton}"
              *ngIf="!options.hideConfirmButton"
              style="padding:0px;"
              >
              <button
                style="width:70px;height:30px;font-size:13px;line-height:14px;padding:0"
                [mwlFocus]="options.focusButton === 'confirm'"
                [class]="'btn btn-block btn-' + options.confirmButtonType"
                (click)="options.onConfirm({clickEvent: $event})"
                [innerHtml]="options.confirmText">
              </button>
            </div>
            <div
              style="padding:0; padding-left:0px;"
              class="col-xs-6 col-6"
              [ngClass]="{'col-xs-offset-3 col-offset-3': options.hideConfirmButton}"
              *ngIf="!options.hideCancelButton">
              <button
                style="width:70px;height:30px;font-size:13px;line-height:14px;padding:0"
                [mwlFocus]="options.focusButton === 'cancel'"
                [class]="'btn btn-block btn-' + options.cancelButtonType"
                (click)="options.onCancel({clickEvent: $event})"
                [innerHtml]="options.cancelText">
              </button>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="options.customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{options: options}">
    </ng-template>
  `
})
export class ConfirmationPopoverWindow implements AfterViewInit {

  constructor(public options: ConfirmationPopoverWindowOptions, private sessionService: SessionService, private translate: TranslateService) { }

  ngAfterViewInit(): void {
    this.options.onAfterViewInit();

    if (this.sessionService.session.user.lang.lang == "tr") {
      this.options.confirmText = "Onayla";
      this.options.cancelText = "İptal";
    } else {
      this.options.confirmText = "Confirm";
      this.options.cancelText = "Cancel";
    }
  }

}
