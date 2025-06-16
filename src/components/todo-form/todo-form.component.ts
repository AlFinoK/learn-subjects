import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  text: WritableSignal<string> = signal('');

  constructor(private _todoService: TodoService) {}

  addTodo() {
    const trimmed = this.text().trim();
    if (!trimmed) return;
    this._todoService.addTodo(trimmed);
    this.text.set('');
  }
}
