<p align="center">
  <a href="https://nestjs.com/" target="_blank"><img src="./docs/calypso.svg" width="270" alt="Nest Logo" /></a>
</p>

<h1 align="center">Calypso Board Editor🚀</h1>

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?skip_quickstart=true&machine=basicLinux32gb&repo=1111152433&ref=main&geo=EuropeWest)

## Stack

| Scope             | Solution                                                                                |
| ----------------- | --------------------------------------------------------------------------------------- |
| Language🧠        | [TypeScript](https://www.typescriptlang.org/)                                           |
| Runtime⚡         | [Bun](https://bun.sh/)                                                                  |
| Framework🎭       | [Next.js](https://nextjs.org/)                                                          |
| Styling🎨         | [TailwindCSS](https://tailwindcss.com/?ref=yon.fun), [Shadcn](https://ui.shadcn.com/)   |
| Text Formatting📄 | [Slate](https://docs.slatejs.org/)                                                      |
| Docs📚            | [Storybook](https://storybook.js.org/)                                                  |
| Backend🚀         | [Supabase](https://supabase.com/)                                                       |
| Database🗃️        | [Postgres](https://www.postgresql.org/)                                                 |
| Storage☁️         | [Minio S3](https://www.min.io/)                                                         |
| Debug⚙            | [Sentry](https://sentry.io/welcome/?ref=shopstorm)                                      |
| Code style✨      | [BiomeJS](https://biomejs.dev/), [Knip](https://knip.dev/)                              |
| Architecture🏫    | [Evolution Design](https://ed.evocomm.space/)                                           |
| CI🔄              | [Docker](https://www.docker.com/), [Github Actions](https://docs.github.com/en/actions) |

## Run Calypso Locally

1. Checkout code:

```bash
git clone https://github.com/TarhunchiKKK/calypso.git

cd calypso
```

2. Install [Bun](https://bun.sh/) globally:

You can use different Node.js package managers for this project developing but [Bun](https://bun.sh/) package manager is preferred.

```bash
npm i -g bun
```

3. Install dependencies:

```bash
bun install
```

4. Run Docker images:

```bash
docker compose up
```

5. Start dev server:

```bash
bun dev
```

Now you application is still running.

6. Open application:

In browser open the https://localhost:3000 to access the app.

## Features🚀

### Node Types

- Stickers
- Arrows
- Text
- Formattable notes
- Shapes (circles, rectangles, etc.)
- Media (images and videos)
- Drawing

### Editor features

- Nodes selecting
- Selection window
- Nodes dragging
- Nodes resizing
- Nodes blocking
- Copy/Paste
- Undo/Redo
- Multiple nodes styling (Font formatting, text/background color, etc.)
- Window shifting
- Window zooming

### Other features

- Dark mode
- Offline mode
- OAuth 2.0 Providers ([Google](https://www.google.com/), [Microsoft](https://www.microsoft.com/), etc...)
