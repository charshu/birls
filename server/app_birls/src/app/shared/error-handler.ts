import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  router: Router;

  constructor(private injector: Injector) { 
    this.router = this.injector.get(Router);
  }

  handleError(error) {
    this.router.navigate(['/error']);
    throw error;
  }
}