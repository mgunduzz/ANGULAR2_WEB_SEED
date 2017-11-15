import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'login-modal',
  template: `
      <login-frm
         
          (onSubmit)="handleSubmit($event)">
        </login-frm>
      
  `
})
export class LoginModalComponent {
 
  @Output() onSubmit: EventEmitter<Object> = new EventEmitter();

  handleSubmit(login) {
    this.onSubmit.emit(login);
  }
};
