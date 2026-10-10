import { initBotId } from "botid/client/core";

// Attaches BotID's challenge headers to these requests; the handlers check them with checkBotId().
initBotId({
  protect: [
    { path: "/api/message", method: "POST" },
    // The inbox login is a server action, which posts to the page itself.
    { path: "/c-messages", method: "POST" },
  ],
});
