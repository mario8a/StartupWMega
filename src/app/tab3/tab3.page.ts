import { Component, OnInit } from '@angular/core';
import { TaskI } from '../models/task.interface';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  todos: TaskI[];
  constructor(private infoService: InfoService) {}

  ngOnInit() {
    this.infoService.getTodos().subscribe(res => this.todos = res);
  }


}
