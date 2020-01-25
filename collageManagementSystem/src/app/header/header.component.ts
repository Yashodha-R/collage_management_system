import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenuEmiter = new EventEmitter();

  constructor() { }

  toggleMenu(){
    console.log('toggleMenu called');
    this.toggleMenuEmiter.emit(true);
  }

  ngOnInit() {}

}
