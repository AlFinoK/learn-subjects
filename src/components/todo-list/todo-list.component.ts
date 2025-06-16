import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';

import { Todo, TodoService } from '../todo-form';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class TodoListComponent implements OnInit {
  private _destroy$ = new Subject<void>();
  protected todos: WritableSignal<Todo[]> = signal([]);
  protected editingId: number | null = null;
  protected editingText: string = '';

  constructor(
    private _todoService: TodoService,
    private _toastr: ToastrService
  ) {}

  private _listenTodos(): void {
    this._todoService.todos$
      .pipe(takeUntil(this._destroy$))
      .subscribe((todos: Todo[]) => this.todos.set(todos));
  }

  protected removeTodo(id: number): void {
    this._todoService.removeTodo(id);
    this._toastr.success('Удалено');
  }

  protected changeStatus(id: number): void {
    this._todoService.toggleStatus(id);
    this._toastr.info('Статус изменен');
  }

  protected editTodoMode(todo: Todo): void {
    this.editingId = todo.id;
    this.editingText = todo.text;
  }

  protected saveEdit(id: number): void {
    this._todoService.editTodo(id, this.editingText);
    this._toastr.success('Текст изменен');
    this.editingId = null;
    this.editingText = '';
  }

  ngOnInit(): void {
    this._listenTodos();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
