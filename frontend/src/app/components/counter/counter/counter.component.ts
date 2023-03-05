import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  // counter: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  // ngAfterContentChecked() { 
  //   this.cdRef.detectChanges()
  // }
  // onIncrement() { 
  //   this.counter++;
  // }

  // onDecrement() { 
  //   this.counter--;
  // }

  // onReset() { 
  //   this.counter = 0;
  // }

  // eventAction(event:string) { 
  //   switch (event) { 
  //     case 'increment':
  //       this.onIncrement();
  //       break;
  //     case 'decrement':
  //       this.onDecrement();
  //       break;
  //     case 'reset':
  //       this.onReset();
  //       break;
  //   }
  // }

}
