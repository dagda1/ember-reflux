import PubSub from "../services/pubsub";

export function initialize(container, application) {
  application.register('pubsub:current', PubSub, {singleton: true});
  application.inject('service', 'pubsub', 'pubsub:current');
  application.inject('component', 'pubsub', 'pubsub:current');
}

export default {
  name: 'pubsub-service',
  initialize: initialize
};
