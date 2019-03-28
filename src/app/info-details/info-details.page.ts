import { Component, OnInit } from '@angular/core';
import { TaskI } from '../models/task.interface';
import { InfoService } from '../services/info.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-info-details',
  templateUrl: './info-details.page.html',
  styleUrls: ['./info-details.page.scss'],
})
export class InfoDetailsPage implements OnInit {

  todo: TaskI = {
    task: '',
    priority: 0
  };

  todoId= null;

  constructor(private route: ActivatedRoute, private nav: NavController, 
    private infoService: InfoService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId) {
      this.loadTodo();
    }
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    await loading.present();

    this.infoService.getTodo(this.todoId).subscribe(todo => {
      loading.dismiss();
      this.todo = todo;
    });
  }

  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();
 
    if (this.todoId) {
      this.infoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/app/user/tabs/tab3');
      });
    } else {
      this.infoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/app/user/tabs/tab3');
      });
    }
  }

  async onRemoveTodo(idTodo:string) {
    this.infoService.removeTodo(idTodo);
  }



}
