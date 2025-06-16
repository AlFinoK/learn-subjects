import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { mockData } from '../../shared';

export type TodoStatus = 'todo' | 'inProgress' | 'done';

export type Todo = {
  id: number;
  text: string;
  status: TodoStatus;
};

@Injectable({ providedIn: 'root' })
export class TodoService {
  public todos$ = new BehaviorSubject<Todo[]>([]);

  initApi() {
    this.todos$.next(mockData);
  }

  addTodo(text: string) {
    const current = this.todos$.getValue();
    const newTodo: Todo = {
      id: Date.now(),
      text,
      status: 'todo',
    };
    this.todos$.next([newTodo, ...current]);
  }

  removeTodo(id: number) {
    const current = this.todos$.getValue();
    this.todos$.next(current.filter((t) => t.id !== id));
  }

  toggleStatus(id: number) {
    const current = this.todos$.getValue();
    const updated = current.map((todo: Todo) => {
      if (todo.id === id) {
        const nextStatus: TodoStatus =
          todo.status === 'todo'
            ? 'inProgress'
            : todo.status === 'inProgress'
            ? 'done'
            : 'todo';
        return { ...todo, status: nextStatus };
      }
      return todo;
    });
    this.todos$.next(updated);
  }
}
