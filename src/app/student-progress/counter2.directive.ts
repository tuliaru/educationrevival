import { Directive, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';

import { Subject, Observable, Subscription, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Directive({
  selector: '[counter2]'
})
export class Counter2Directive implements OnChanges, OnDestroy {

  private _counterSource$ = new Subject<any>();
  private _subscription = Subscription.EMPTY;

  @Input() counter2!: number;
  @Input() interval2!: number;
  @Output() value2 = new EventEmitter<number>();

  constructor() {

    this._subscription = this._counterSource$.pipe(
      switchMap(({ interval2, count }) =>
        timer(0, interval2).pipe(
          take(count),
          tap(() => this.value2.emit(--count))
        )
      )
    ).subscribe();
  }

  ngOnChanges() {
    this._counterSource$.next({ count: this.counter2, interval2: this.interval2 });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}