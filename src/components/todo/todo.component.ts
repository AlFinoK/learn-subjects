import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

import { TodoListComponent } from '../todo-list';
import { TodoFormComponent, TodoService } from '../todo-form';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TodoFormComponent,
    TodoListComponent,
    ToastContainerDirective,
    RouterOutlet,
  ],
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;

  constructor(
    private _toastr: ToastrService,
    private _todoService: TodoService
  ) {}

  ngOnInit(): void {
    this._toastr.overlayContainer = this.toastContainer;
    this._todoService.initApi();
  }
}
