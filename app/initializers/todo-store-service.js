export function initialize(container, application) {
  application.inject('component:todo-header', 'todoStoreService', 'service:todo-store');
  application.inject('component:todo-list', 'todoStoreService', 'service:todo-store');
  application.inject('component:todo-footer', 'todoStoreService', 'service:todo-store');
}

export default {
  name: 'todo-store-service',
  initialize: initialize
};
