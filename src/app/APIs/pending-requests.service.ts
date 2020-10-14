import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from './../store/state';

import { IncrementRequest, DecrementRequest} from './../store/actions';
import { finalize } from 'rxjs/operators';

@Injectable()
export class PendingRequestsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._store$.dispatch(new IncrementRequest());

    return next.handle(req).pipe(
      finalize(() => this._store$.dispatch(new DecrementRequest()))
    );
  }

  constructor(private _store$: Store<State>)  {}

}
