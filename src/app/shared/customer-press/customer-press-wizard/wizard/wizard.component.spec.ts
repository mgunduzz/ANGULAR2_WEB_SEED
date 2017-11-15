import { SessionService } from './../../../../core/auth/session.service';
import { DataService } from './../../../../core/services/data.service';
import { AuthService } from './../../../../core/auth/auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { ToastyModule } from 'ng2-toasty';
import { RouterModule } from '@angular/router';
import { LoginModule } from './../../../../core/auth/login/login.module';
import { DocumentsModule } from './../../../../documents/documents.module';
import { SharedModule } from './../../../shared.module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './../../../../home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { TestBed, async } from '@angular/core/testing';

import { WizardComponent } from './wizard.component';

describe('Wizard Component', () => {
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

    describe('', () => {
        it('', () => {
            let fixture = TestBed.createComponent(WizardComponent);
        });
    });

});
