import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Todo, TodoService } from './todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  protected text: string = '';

  constructor(private _todoService: TodoService) {}

  protected addTodo(): void {
    const trimmed: string = this.text.trim();
    if (!trimmed) return;
    this._todoService.addTodo(trimmed);
    this.text = '';
  }
}
