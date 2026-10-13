# Grove

Short lessons for any topic, with review that actually comes back.

Grove ships with four courses you can finish immediately:

- Machine learning, without the fog
- Spanish in real sentences
- Psychology Fundamentals
- Critical Thinking and Logic

Progress, streaks, and courses you create stay in this browser (`localStorage`). There is no account.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Generate a course

Copy `.env.example` to `.env.local` and set `XAI_API_KEY`. The key stays on the server. Grove calls `https://api.x.ai/v1/chat/completions` with `grok-4.7`.

Without a key, "Build this path" saves a starter outline and says so. It does not pretend the outline came from a model.

## Offline

```bash
npm run build
npm start
```

The production app registers `public/sw.js`. After you open a lesson once, that lesson still opens with the network off. A page you have never opened falls back to `public/offline.html`, which does not need the app bundle. New AI paths need a connection. In `npm run dev` the service worker stays off so it does not trap a stale page.

## Course shape

A topic has modules, a module has lessons, a lesson is a short read plus a check. Checks are multiple choice, fill-in-the-blank, matching, short answer, a reorder map, a scenario, or teach-it-back. Export any path as JSON from its page, edit it, and import it from New path.
