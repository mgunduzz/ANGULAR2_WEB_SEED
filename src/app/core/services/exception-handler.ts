import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LogService } from './log.service'

@Injectable()

export   class ExceptionHandler implements ErrorHandler {

 
  constructor(private injector: Injector) { }

  handleError(error) {
    const loggingService = this.injector.get(LogService);
    loggingService.error(error.message +" "+  error.stack);
  }
}