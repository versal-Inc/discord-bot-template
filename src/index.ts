/*
 *   DISCORD BOT TEMPLATE
 *     By: swisser
 *
 *   VERIONS:
 *     v1.0.0
 *     Discord.js: v14
 */

import { Client, GatewayIntentBits } from "discord.js"; // Import required classes and constants from discord.js
import { config } from "./config"; // Import the configuration file where the bot token is stored
import { registerEvents } from "./utils/events";
import Event from "./events/index";

// Create a new Discord bot client with specific intents
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Allows the bot to detect when servers (guilds) are created or deleted
    GatewayIntentBits.GuildMembers, // Allows the bot to detect when members join or leave servers
    GatewayIntentBits.GuildMessages, // Allows the bot to detect when messages are sent in servers
    GatewayIntentBits.MessageContent, // Allows the bot to read the content of messages (requires explicit permission in Discord's developer portal)
  ],
});

// Handle uncaught exceptions (unexpected errors that crash the bot)
process.on('uncaughtException', (error) => {
    console.log(`Exceção não capturada`, `${error}`); // Log the error for debugging
});

// Handle unhandled promise rejections (asynchronous errors not properly caught)
process.on('unhandledRejection', (reason, promise) => {
    console.log(`Rejeição não tratada`, `${reason}`); // Log the rejection reason for debugging
});

console.log(`
        ===========================================
                      LOADING EVENTS
        ===========================================`);
registerEvents(client, Event);

// Log in to the bot using the token from the config file
client.login(config.token).catch((e) => {
  console.error(); // Log any login errors
  process.exit(1); // Exit the process if login fails
});