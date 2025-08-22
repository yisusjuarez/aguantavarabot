# Aguanta Vara Bot

A Slack bot that responds with fun phrases based on whether today is payday or not. The bot listens to messages in Slack channels and checks for specific keywords to determine if it should respond.

## Features

- Detects messages containing payday-related keywords.
- Responds with a random phrase depending on whether today is payday.
- Handles Slack's URL verification for event subscriptions.

## How It Works

1. The bot listens for messages in Slack channels.
2. If a message contains payday-related keywords, it checks if today is payday.
3. Responds with a fun phrase:
   - If today is payday, it selects a phrase from the `phrasesPaydayToday` list.
   - If not, it selects a phrase from the `phrasesNoPaydayToday` list.

## Cloudflare Worker

This bot is implemented as a [Cloudflare Worker](https://workers.cloudflare.com/), which allows you to deploy serverless code at the edge. The `fetch` function in the code is the entry point for handling HTTP requests. Cloudflare Workers are ideal for this use case because they provide low-latency responses and are easy to deploy.

### Key Points

- The bot uses the `fetch` method to handle incoming HTTP requests from Slack.
- It verifies Slack's URL challenge during the initial setup.
- It processes Slack events and sends responses using Slack's API.

## Environment Variables

- `SLACK_BOT_TOKEN`: The Slack bot token used for authentication.

## Setup

### 1. Slack Configuration

1. Go to the [Slack API](https://api.slack.com/apps) and create a new app.
2. Under "OAuth & Permissions," add the following bot token scopes:
   - `chat:write`
   - `channels:read`
   - `groups:read`
   - `im:read`
   - `mpim:read`
3. Install the app to your workspace and copy the bot token.
4. Under "Event Subscriptions," enable events and add the request URL (e.g., your Cloudflare Worker URL).
5. Subscribe to the `message.channels` event.

### 2. Cloudflare Configuration

1. Deploy the bot as a Cloudflare Worker.
2. Use the Cloudflare dashboard or Wrangler CLI to upload the code.
3. Add the `SLACK_BOT_TOKEN` as an environment variable in your Worker configuration:
   - In the Cloudflare dashboard, go to "Workers" > "Settings" > "Environment Variables."
   - Add `SLACK_BOT_TOKEN` with the value of your Slack bot token.

### 3. Deploy the Bot

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd aguantavarabot
   ```
2. Deploy the bot using Wrangler:
   ```bash
   wrangler publish
   ```

## License

This project is licensed under the MIT License.
