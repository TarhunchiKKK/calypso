<p align="center">
    <img src="./docs/logo.svg" width="270" alt="Logo" />
</p>

<h1 align="center"><span style="color: oklch(74.6% 0.16 232.661);">Calypso</span> Board Editor✨</h1>

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?skip_quickstart=true&machine=basicLinux32gb&repo=1111152433&ref=main&geo=EuropeWest)


## Table of contents

- [About](#about)
- [Stack](#-stack)
  - [Common](#-common)
  - [Backend](#-backend)
  - [Frontend](#-frontend)
- [Features](#-features)
  - [Node Types](#node-types)
  - [Editor Features](#editor-features)
  - [Complications](#complications)
  - [Hot Keys](#hot-keys)
- [Run app Locally](#-run-app-locally)


## About 

This project is a high-performance real-time collaborative whiteboard application, inspired by Miro. It allows multiple users to visualize ideas, map out workflows, and collaborate on a shared infinite canvas in real-time.

Built as a full-stack solution, it focuses on seamless synchronization, low-latency interactions, and a robust scalable architecture.

## 🚀 Stack

### ⚓ Common

<table border="1">
    <thead>
        <tr>
            <th>Scope</th>
            <th>Solution</th>
        </tr>
    </thead>
    <tbody>
         <tr>
            <td>Language</td>
            <td>
                <a href="https://www.typescriptlang.org/">TypeScript</a>
            </td>
        </tr>
        <tr>
            <td>Runtime⚡</td>
            <td>
                <a href="https://bun.sh/">Bun</a>
            </td>
        </tr>
        <tr>
            <td>Project Structure</td>
            <td>
                <a href="https://turborepo.dev/">Turborepo</a>
            </td>
        </tr>
        <tr>
            <td>Linting</td>
            <td rowspan="2">
                <a href="https://biomejs.dev/">BiomeJS</a>
            </td>
        </tr>
        <tr>
            <td>Formatting</td>
        </tr>
        <tr>
            <td>Code Quality</td>
            <td>
                <a href="https://knip.dev/">Knip</a>
            </td>
        </tr>
        <tr>
            <td>Testing</td>
            <td>
                <a href="https://vitest.dev/">Vitest</a>
            </td>
        </tr>
        <tr>
            <td rowspan="2">CI</td>
            <td>
                <a href="https://www.docker.com/">Docker</a>
            </td>
        </tr>
        <tr>
            <td>
                <a href="https://docs.github.com/en/actions">Github Actions</a>
            </td>
        </tr>
    </tbody>
</table>

### ⚡ Backend

<table border="1">
    <thead>
        <tr>
            <th>Scope</th>
            <th>Solution</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Framework</td>
            <td>
                <a href="https://nestjs.com/">NestJS</a>
            </td>
        </tr>
        <tr>
            <td rowspan="2">Database</td>
            <td>
                <a href="https://www.postgresql.org/">Postgres</a>
            </td>
        </tr>
        <tr>
            <td>
                <a href="https://www.mongodb.com/home?pk_campaign=VentureBeat">MongoDB</a>
            </td>
        </tr>
        <tr>
            <td rowspan="2">ORM</td>
            <td>
                <a href="https://typeorm.io/">TypeORM</a>
            </td>
        </tr>
        <tr>
            <td>
                <a href="https://mongoosejs.com/">Mongoose</a>
            </td>
        </tr>
        <tr>
            <td rowspan="2">Architecture</td>
            <td>Microservices</td>
        </tr>
            <tr>
            <td>CQRS</td>
        </tr>
        <tr>
            <td rowspan="2">Transport</td>
            <td>
                <a href="https://grpc.io/">gRPC</a>
            </td>
        </tr>
        <tr>
            <td>
                <a href="https://www.rabbitmq.com/docs">RabbitMQ</a>
            </td>
        </tr>
        <tr>
            <td>Validation</td>
            <td>
                <a href="https://zod.dev/">Zod</a>
            </td>
        </tr>
    </tbody>
</table>

### 🍓 Frontend

<table border="1">
    <thead>
        <tr>
            <th>Scope</th>
            <th>Solution</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Framework</td>
            <td>
                <a href="https://react.dev/">React</a>
            </td>
        </tr>
        <tr>
            <td>Architecture</td>
            <td>
                <a href="https://ed.evocomm.space/">Evolution Design</a>
            </td>
        </tr>
        <tr>
            <td rowspan="2">Styling</td>
            <td>
                <a href="https://tailwindcss.com/?ref=yon.fun">TailwindCSS</a>
            </td>
        </tr>
        <tr>
            <td>
                <a href="https://ui.shadcn.com/">Shadcn</a>
            </td>
        </tr>
        <tr>
            <td>Queries</td>
            <td>
                <a href="https://tanstack.com/query/latest">TanStack Query</a>
            </td>
        </tr>
        <tr>
            <td>Forms</td>
            <td>
                <a href="https://react-hook-form.com/">React Hook Form</a>
            </td>
        </tr>
        <tr>
            <td>Storage</td>
            <td>
                <a href="https://www.min.io/">Minio</a>
            </td>
        </tr>
        <tr>
            <td>Text Formatting</td>
            <td>
                <a href="https://docs.slatejs.org/">Slate.js</a>
            </td>
        </tr>
        <tr>
            <td>Docs</td>
            <td>
                <a href="https://storybook.js.org/">Storybook</a>
            </td>
        </tr>
    </tbody>
</table>

## 🎨 Features

### Node Types

- Stickers
- Arrows
- Text
- Shapes (circles, diamonds, etc.)
- Media (images and videos)
- Formattable documents
- Drawings

### Editor Features

- Nodes selection
- Selection window
- Node text editing
- Nodes dragging
- Nodes resizing
- Nodes blocking
- Exchange buffer (Copy/Paste/Cut)
- Cancellation (Undo/Redo)
- Multiple nodes styling (Text formatting, text/background color, etc.)
- Window shifting & zooming

### Complications 

- No state manager
- No Drag-N-Drop libraries

### Hot Keys

<table border="1">
    <thead>
        <tr>
            <th>Scope</th>
            <th>Key</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2"></td>
            <td rowspan="2">Switch to idle mode</td>
            <td><code>I</code></td>
        </tr>
        <tr>
            <td><code>Escape</code></td>
        </tr>
        <tr>
            <td rowspan="6">Switch to node creation</td> 
            <td>To sticker creation</td>
            <td><code>S</code></td>
        </tr>
        <tr>
            <td>To arrow creation</td>
            <td><code>A</code></td>
        </tr>
        <tr>
            <td>To text creation</td>
            <td><code>T</code></td>
        </tr>
        <tr>
            <td>To rectangle shape selection</td>
            <td><code>R</code></td>
        </tr>
        <tr>
            <td>To circle shape creation</td>
            <td><code>O</code></td>
        </tr>
        <tr>
            <td>To hexagon shape creation</td>
            <td><code>H</code></td>
        </tr>
        <tr>
            <td rowspan="3">Selection</td>
            <td>Select all</td>
            <td><code>Ctrl</code> + <code>A</code></td>
        </tr>
        <tr>
            <td rowspan="2">Remove</td>
            <td><code>Backspace</code></td>
        </tr>
        <tr>
            <td><code>Delete</code></td>
        </tr>
        <tr>
            <td rowspan="2">Locking</td>
            <td>Lock</td>
            <td><code>Ctrl</code> + <code>L</code></td>
        </tr>
        <tr>
            <td>Unlock</td>
            <td><code>Ctrl</code> + <code>Shift</code> + <code>L</code></td>
        </tr>
        <tr>
            <td rowspan="2">Styling</td>
            <td>Open styling bar</td>
            <td><code>Shift</code> + <code>S</code></td>
        </tr>
        <tr>
            <td>Open nodes context menu</td>
            <td><code>Shift</code> + <code>C</code></td>
        </tr>
        <tr>
            <td>Api</td>
            <td>Save</td>
            <td><code>Ctrl</code> + <code>S</code></td>
        </tr>
        <tr>
            <td rowspan="3">Exchange buffer</td>
            <td>Copy</td>
            <td><code>Ctrl</code> + <code>C</code></td>
        </tr>
        <tr>
            <td>Paste</td>
            <td><code>Ctrl</code> + <code>V</code></td>
        </tr>
        <tr>
            <td>Cut</td>
            <td><code>Ctrl</code> + <code>X</code></td>
        </tr>
        <tr>
            <td rowspan="2">Cancellation</td>
            <td>Undo</td>
            <td><code>Ctrl</code> + <code>Z</code></td>
        </tr>
        <tr>
            <td>Redo</td>
            <td><code>Ctrl</code> + <code>Y</code></td>
        </tr>
    </tbody>
</table>

## 💡 Run app Locally

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

4. Build shared packages:

```bash
bun build:packages
```

5. Load environment variables to appropriate apps:

```bash
bun env:load
```

6. Run Docker services:

```bash
bun docker:full
```

7. Wait for <a href="https://www.docker.com/">Docker</a> containers to start

8. Seed app with data:

Seed <a href="https://www.min.io/">Minio</a> container:

```bash
bun seed:media
```

9. Run apps:

```bash
bun run dev
```

10. Wait for all apps to start

11. Open application: 

Now you application is still running.

In browser open the https://localhost:5173 to access the app.
