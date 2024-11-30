export enum Status {
  Created = 'created',
  Pending = 'pending',
  Done = 'done'
}

export const statuses = {
  [Status.Created]: 'Создан',
  [Status.Pending]: 'В работе',
  [Status.Done]: 'Выполнен'
};
