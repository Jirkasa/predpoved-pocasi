/**
 * Represents event source that can be used to fire and subscribe to events.
 */
declare class EventSourcePoint<T> {
    /** Stores registered handlers. */
    private handlers;
    /** Used for assigning ids to handlers. */
    private count;
    /**
     * Creates new event source.
     */
    constructor();
    /**
     * Registeres new handler.
     * @param handler Function to be called when event is fired.
     * @returns Id of registered handler.
     */
    subscribe(handler: (value: T) => void): number;
    /**
     * Unsubscribe event handler.
     * @param handlerId Id of handler that should be unsubscribed.
     */
    unsubscribe(handlerId: number): void;
    /**
     * Fires new event.
     * @param value Value of event.
     */
    fire(value: T): void;
}
export default EventSourcePoint;
