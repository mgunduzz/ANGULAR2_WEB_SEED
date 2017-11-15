import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { DocumentMainComponent } from './documents/document-main/document-main.component';
import { AuthGuard, CanUseTvArchiveGuard } from "./core/auth/auth.guard"
import { LoginComponent } from './core/auth/login/login.component';
import { NewsMainComponent } from './documents/news/news-main/news-main.component';
import { AdvertsMainComponent } from './documents/adverts/adverts-main/adverts-main.component';
import { BasketListComponent } from './documents/basket/basket-list/basket-list.component';
import { DocViewerTabComponent } from './shared/doc-viewer/doc-viewer-tab/doc-viewer-tab.component';
import {AgendaDetailsComponent} from './shared/agenda/agenda-details/agenda-details.component';
import { DocumentArchiveListComponent } from './documents/document-archive/document-archive-list/document-archive-list.component';
import { DocumentAnalysisMainComponent } from './documents/document-analysis/document-analysis-main/document-analysis-main.component';
import {CustomerPressWizardComponent} from './shared/customer-press/customer-press-wizard/customer-press-wizard.component';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
