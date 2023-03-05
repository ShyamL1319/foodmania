import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getChannelName, getCounter } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit{
  // @Input() counter = 0;
  counter: number = 0;
  counter$!: Observable<{ counter: number }>;
  // counterSubscription!: Subscription;
  channelName!: string;
  constructor(private store: Store<{counter: CounterState} >) { }

  ngOnInit(): void {
    // this.counterSubscription = this.store.select('counter').subscribe((data: any) => {
    //   this.counter = data.counter;
    // });

    this.store.select(getCounter).subscribe(counter => { 
      this.counter = counter; 
    });
    this.store.select(getChannelName).subscribe(channelName => { 
      this.channelName = channelName;
    })
  }

  // ngOnDestroy(): void {
  //   if(this.counterSubscription)
  //     this.counterSubscription.unsubscribe()
  // }

}
