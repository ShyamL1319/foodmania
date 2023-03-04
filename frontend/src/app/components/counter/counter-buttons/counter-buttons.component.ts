import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.scss']
})
export class CounterButtonsComponent implements OnInit {
  @Output() eventAction = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onIncrement() { 
    this.eventAction.emit('increment');
  }
  onDecrement() { 
    this.eventAction.emit('decrement');
  }
  onReset() { 
    this.eventAction.emit('reset');
  }

}
