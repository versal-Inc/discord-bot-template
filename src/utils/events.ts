// Import types and constants from discord.js
import type { ClientEvents, Awaitable, Client } from 'discord.js'; // Import TypeScript types for type checking
export { Events } from 'discord.js'; // Export predefined event names from discord.js

// Define a type for a logging method
export type LogMethod = (...args: unknown[]) => void; // A function that logs any number of arguments

// Define a type for event keys
export type EventKeys = keyof ClientEvents; // Keys of all available Discord.js events

// Define the structure of the properties passed to event callbacks
export interface EventProps {
  client: Client; // The bot's client instance
  log: LogMethod; // A logging function to log event-related information
}

// Define the type of the callback function for an event
export type EventCallback<T extends EventKeys> = (
  props: EventProps, // Event properties like the client and log method
  ...args: ClientEvents[T] // Event-specific arguments from Discord.js
) => Awaitable<unknown>; // The callback can return a value synchronously or asynchronously

// Define the structure of an event object
export interface Event<T extends EventKeys = EventKeys> {
  key: T; // The event name (e.g., "messageCreate", "ready")
  callback: EventCallback<T>; // The function to run when the event is triggered
}

// Utility function to create an event
export function event<T extends EventKeys>(
  key: T, // Event name
  callback: EventCallback<T> // Function to execute when the event is triggered
): Event<T> {
  return { key, callback }; // Return the event object
}

// Function to register multiple events for the bot
export function registerEvents(client: Client, events: Event[]): void {
  // Iterate over all the provided events
  for (const { key, callback } of events) {
    console.log(`Loading Event: ${key}`); // Log the event being loaded

    // Attach the event to the client
    client.on(key, (...args) => {
      const log = console.log.bind(console, `[Event: ${key}]`); // Create a custom logger for this event

      try {
        // Call the event's callback with the client, log method, and event-specific arguments
        callback({ client, log }, ...args);
      } catch (error) {
        // Log any errors that occur during the callback execution
        log('[Uncaught Error]', error);
      }
    });
  }
}