<p align="center">
    <img src="./docs/calypso.svg" width="270" alt="Nest Logo" />
</p>

<h1 align="center">Calypso Board Editor🚀</h1>

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?skip_quickstart=true&machine=basicLinux32gb&repo=1111152433&ref=main&geo=EuropeWest)

## Stack🌟

### Common🌎

| Scope               | Solution                                                                                |
| ------------------- | --------------------------------------------------------------------------------------- |
| Language🧠          | [TypeScript](https://www.typescriptlang.org/)                                           |
| Runtime⚡           | [Bun](https://bun.sh/)                                                                  |
| Docs📚              | [Storybook](https://storybook.js.org/)                                                  |
| Code style✨        | [BiomeJS](https://biomejs.dev/), [Knip](https://knip.dev/)                              |
| CI🔄                | [Docker](https://www.docker.com/), [Github Actions](https://docs.github.com/en/actions) |
| Project Structure🏫 | [TurboRepo](https://turborepo.dev/)                                                     |

### Web🎨

| Scope             | Solution                                                                              |
| ----------------- | ------------------------------------------------------------------------------------- |
| Framework🎭       | [Next.js](https://nextjs.org/)                                                        |
| Styling🎨         | [TailwindCSS](https://tailwindcss.com/?ref=yon.fun), [Shadcn](https://ui.shadcn.com/) |
| Text Formatting📄 | [Slate](https://docs.slatejs.org/)                                                    |
| Docs📚            | [Storybook](https://storybook.js.org/)                                                |
| Debug⚙            | [Sentry](https://sentry.io/welcome/?ref=shopstorm)                                    |
| Architecture🏫    | [Evolution Design](https://ed.evocomm.space/)                                         |

### Api🚀

| Scope          | Solution                                                                                                 |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| Framework🎭    | [Nest.js](https://nestjs.com/)                                                                           |
| Database🗃️     | [Postgres](https://www.postgresql.org/), [MongoDB](https://www.mongodb.com/home?pk_campaign=VentureBeat) |
| ORM🔃          | [TypeORM](https://typeorm.io/), [Mongoose](https://mongoosejs.com/)                                      |
| Storage☁️      | [Minio S3](https://www.min.io/)                                                                          |
| Validation🛑   | [Zod](https://zod.dev/)                                                                                  |
| Docs📚         | [Swagger](https://swagger.io/)                                                                           |
| Architecture🏫 | [CQRS](https://medium.com/eleven-labs/cqrs-pattern-c1d6f8517314)                                         |

## Run Calypso Locally💡

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
- Drawings

### Editor Features

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

### Hot Keys

| Keys                   | Description                      |
| ---------------------- | -------------------------------- |
| `Ctrl` + `C`           | Copy selected nodes              |
| `Ctrl` + `V`           | Paste selected nodes             |
| `Ctrl` + `X`           | Cut selected nodes               |
| `Ctrl` + `A`           | Select all nodes                 |
| `Ctrl` + `L`           | Lock selected nodes              |
| `Ctrl` + `Shift` + `L` | Unlock selected nodes            |
| `Delete`               | Delete selected nodes            |
| `Backspace`            | Delete selected nodes            |
| `Escape`               | Switch to idle mode              |
| `I`                    | Switch to idle mode              |
| `S`                    | Switch to stickers creating mode |

### Other features

- Dark mode
- Offline mode
