import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';
import { fromEvent, interval, map, mergeScan, of, reduce, switchScan, take, takeUntil } from 'rxjs';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  tests: Array<string> = [];

  constructor(public messageService: MessageService) {

  }

  ngOnInit(): void {
    interval(1000)
      .pipe(
        // takeUntil(interval(5000)),
        map(() => 1),
        mergeScan((acc, one) => interval(1000).pipe(
          take(2), map(() => acc + one)), 0))
      .subscribe(item => this.tests.push(item.toString()));
  }

}
