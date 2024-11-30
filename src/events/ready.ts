import { event, Events } from '../utils/events.js';

// Export a default event that runs when the bot is ready
// This is the 'ready' event, triggered when the bot successfully logs in
// The event handler receives the client object to interact with the bot
export default event(Events.ClientReady, async ({ }, client) => {
    console.log(`Logged in as '${client.user.username}'`);
});