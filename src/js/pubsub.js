'use strict'
/**
 *  @namespace Pubsub
 */

module.exports = (function() {
  let messages = {}

  /**
   *  Publish messages
   *
   *  @memberof Pubsub
   *  @param    {String} msg Message to publish
   *  @param    {Object} [params] Optional parameters to pass to callback function
   *  @example  pubsub.publish('message')
   *  @example  pubsub.publish('message', a, b, c)
   */
  function publish(msg) {
    var args = Array.prototype.splice.call(arguments, 1)
    if (messages[msg]) {
      messages[msg].forEach((msg) => {
        msg.apply(this, args)
      })
    }
  }

  /**
   *  Create a listener for a message
   *
   *  @memberof Pubsub
   *  @param    {String}   msg Message to listen for
   *  @param    {Function} callback
   *  @return   {Object} Representing the subscribed message and callback function
   */
  function subscribe(msg, callback) {
    if (!messages[msg]) {
      messages[msg] = []
    }

    messages[msg].push(callback)

    return {
      message: msg,
      func: callback,
    }
  }

  /**
   *  Remove the subscription
   *
   *  @memberof Pubsub
   *  @param    {String} msg
   */
  function unsubscribe(msg) {
    delete messages[msg]
  }

  return {
    publish,
    subscribe,
    unsubscribe,
  };
})();
