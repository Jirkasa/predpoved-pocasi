/**
 * Represents event source that can be used to fire and subscribe to events.
 */
class EventSourcePoint<T> {
    /** Stores registered handlers. */
    private handlers : Map<number, (value : T) => void>;
    /** Used for assigning ids to handlers. */
    private count : number;

    /**
     * Creates new event source.
     */
    constructor() {
        this.handlers = new Map();
        this.count = 0;
    }

    /**
     * Registeres new handler.
     * @param handler Function to be called when event is fired.
     * @returns Id of registered handler.
     */
    subscribe(handler : (value : T) => void) : number {
        this.handlers.set(this.count, handler);
        return this.count++;
    }

    /**
     * Unsubscribe event handler.
     * @param handlerId Id of handler that should be unsubscribed.
     */
    unsubscribe(handlerId : number) {
        this.handlers.delete(handlerId);
    }

    /**
     * Fires new event.
     * @param value Value of event.
     */
    fire(value : T) {
        this.handlers.forEach(handler => {
            handler(value);
        });
    }
}

export default EventSourcePoint;