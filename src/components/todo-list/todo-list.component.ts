import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';

import { Todo, TodoService } from '../todo-form';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  imports: [CommonModule],
})
export class TodoListComponent implements OnInit {
  private _destroy$ = new Subject<void>();
  protected todos: WritableSignal<Todo[]> = signal([]);

  constructor(
    private _todoService: TodoService,
    private _toastr: ToastrService
  ) {}

  private _listenTodos() {
    this._todoService.todos$
      .pipe(takeUntil(this._destroy$))
      .subscribe((todos: Todo[]) => this.todos.set(todos));
  }

  removeTodo(id: number) {
    this._todoService.removeTodo(id);
    this._toastr.success('Удалено');
  }

  changeStatus(id: number) {
    this._todoService.toggleStatus(id);
    this._toastr.info('Статус изменен');
  }

  ngOnInit() {
    this._listenTodos();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
