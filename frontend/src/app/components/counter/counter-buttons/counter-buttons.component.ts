import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../state/counter.actions';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.scss']
})
export class CounterButtonsComponent implements OnInit {
  // @Output() eventAction = new EventEmitter<string>();

  constructor(private store: Store<{ counter: CounterState }>) { }

  ngOnInit(): void {
  }

  onIncrement() { 
    //this.eventAction.emit('increment');
    this.store.dispatch(increment());
  }
  onDecrement() { 
    //this.eventAction.emit('decrement');
    this.store.dispatch(decrement());
  }
  onReset() { 
   //this.eventAction.emit('reset');
    this.store.dispatch(reset());
  }

}
