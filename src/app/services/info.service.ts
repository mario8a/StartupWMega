import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskI } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private infosCollection: AngularFirestoreCollection<TaskI>;
  private infos: Observable<TaskI[]>;

  constructor(db: AngularFirestore) {

    this.infosCollection = db.collection<TaskI>('todos');
    this.infos = this.infosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

  }

  getTodos(){
    return this.infos;
  }

  getTodo(id: string){
    return this.infosCollection.doc<TaskI>(id).valueChanges();
  }

  //PUT
  updateTodo(todo:TaskI, id: string){
    return this.infosCollection.doc(id).update(todo);
  }
  
  //PUSH
  addTodo(info: TaskI){
    return this.infosCollection.add(info);
  }
  //DELETE
  removeTodo(id: string){
    return this.infosCollection.doc(id).delete();
  }
}
