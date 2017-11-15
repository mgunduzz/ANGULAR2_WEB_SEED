import { SessionService } from './../../../../core/auth/session.service';
import { DataService } from './../../../../core/services/data.service';
import { AuthService } from './../../../../core/auth/auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { HomeComponent } from './../../../../home/home.component';
import { ToastyModule } from 'ng2-toasty';
import { RouterModule } from '@angular/router';
import { LoginModule } from './../../../../core/auth/login/login.module';
import { DocumentsModule } from './../../../../documents/documents.module';
import { SharedModule } from './../../../shared.module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardStepComponent } from './wizard-step.component';

describe('Wizard Step Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(), NgbModule.forRoot(), SharedModule, DocumentsModule, LoginModule, RouterModule, ToastyModule
            ],
            declarations: [HomeComponent],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, DataService, SessionService, NgbActiveModal],

        })
            .compileComponents();
    }));

    beforeEach(() => {
        TestBed.compileComponents();
    });

    describe('when create wizard step', () => {
        it('should have a title', () => {
            let fixture = TestBed.createComponent(WizardStepComponent);
            fixture.componentInstance.title = 'Step1';

            fixture.detectChanges();

            expect(fixture.componentInstance.title).toBe('Step1');
        });
    });

});
