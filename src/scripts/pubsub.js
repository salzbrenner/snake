class Pubsub {
  static subscribers = {};

  publish(event, data) {
    if (!Pubsub.subscribers[event]) {
      return;
    }
    Pubsub.subscribers[event].forEach(callback =>
      callback(data));
  }

  subscribe(event, callback) {
    let index;

    if (!Pubsub.subscribers[event]) {
      Pubsub.subscribers[event] = [];
    }
    index = Pubsub.subscribers[event].push(callback) - 1;

    return {
      unsubscribe() {
        Pubsub.subscribers[event].splice(index, 1);
      }
    };

  }
}

export default Pubsub;
