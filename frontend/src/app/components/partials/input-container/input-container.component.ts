import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss']
})
export class InputContainerComponent implements OnInit {

  @Input()
  label!: string;
  @Input()
  bgColor = 'rgb(232, 240, 254)';
  constructor() { }

  ngOnInit(): void {
  }

}
