import { BehaviorSubject } from 'rxjs';
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

  initApi(): void {
    this.todos$.next(mockData);
  }

  addTodo(text: string): void {
    const current = this.todos$.getValue();
    const newTodo: Todo = {
      id: Date.now(),
      text,
      status: 'todo',
    };
    this.todos$.next([newTodo, ...current]);
  }

  removeTodo(id: number): void {
    const current: Todo[] = this.todos$.getValue();
    this.todos$.next(current.filter((t: Todo) => t.id !== id));
  }

  editTodo(id: number, text: string): void {
    const current: Todo[] = this.todos$.getValue();
    const updated: Todo[] = current.map((todo: Todo): Todo => {
      if (todo.id === id) {
        return { ...todo, text };
      }
      return todo;
    });
    this.todos$.next(updated);
  }

  toggleStatus(id: number): void {
    const current: Todo[] = this.todos$.getValue();
    const updated: Todo[] = current.map((todo: Todo): Todo => {
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
