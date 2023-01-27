import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [
  ]
})
export class TodoComponent implements OnInit {

  todos: any[] = [];

  constructor(private todoServie: TodoService) { }

  ngOnInit(): void {
    this.todoServie.firestoreCollection.valueChanges({ idField: 'id' })
      .subscribe(item => {
        this.todos = item.sort((a: any, b: any) => {
          return a.isDone - b.isDone;
        });
      })
  }

  onClick(titleInput: HTMLInputElement) {
   if(titleInput.value != ""){
    this.todoServie.addTodo(titleInput.value);
    titleInput.value = "";
   }
  }

  onChangeStatus(id: string, newStatus: boolean) {
    this.todoServie.changeStatusTodo(id, newStatus);
  }

  onDeleted(id: string){
    this.todoServie.deleteTodo(id);
  }

}
