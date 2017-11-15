import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightTextDirective } from './highlight-text.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HighlightTextDirective],
  exports: [HighlightTextDirective]
})
export class HighlightTextModule { }
 