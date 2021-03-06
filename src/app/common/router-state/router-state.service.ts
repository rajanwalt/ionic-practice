import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class RouterStateService {

  private history = [];

  public loadRouting(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(({urlAfterRedirects}: NavigationEnd) => {
      this.history = [...this.history, urlAfterRedirects];
    })
  }

  public getHistory(): string[]  {
    return this.history;
  }

  public getPreviousUrl(): string  {
    return this.history[this.history.length - 2] || '/'
  }

  public getCurrentURL(): string  {
    return this.history[this.history.length-1];
  }

  constructor(private router: Router) { }
}
