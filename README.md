# Aurora Cloud MCP

A Model Context Protocol (MCP) server generated from the Aurora Cloud OpenAPI specification. This project provides both a programmatic MCP server and an HTTP-based interface for interacting with Aurora Cloud's API, including a simple web-based test client.

## Features

- Implements the MCP server protocol for Aurora Cloud.
- Supports a wide range of Aurora Cloud API endpoints (deals, silos, rules, tokens, etc.).
- Provides both stdio and HTTP (SSE) transports.
- Includes a web-based test client for interactive testing.

## Getting Started

### Prerequisites

- **Node.js** v20 or higher
- **npm** (comes with Node.js)
- (Optional) **Docker** for containerized deployment

### Installation

Clone the repository and install dependencies:

```sh
git clone <this-repo-url>
cd aurora-cloud-mcp
npm install
```

### Build

Compile the TypeScript source:

```sh
npm run build
```

### Usage

#### 1. MCP Server (Stdio)

Run the MCP server (for use as a subprocess):

```sh
npm start
```

#### 2. HTTP Web Server

To start the HTTP server (with SSE and web client):

```js
// Example (add to a script or use in src/index.ts):
import { setupWebServer } from './src/web-server.js';
import { server } from './src/index.js';

setupWebServer(server, 3000); // Starts on port 3000
```

Or, add a script to your `package.json` for convenience.

#### 3. Web Test Client

After starting the HTTP server, open [http://localhost:3000/](http://localhost:3000/) in your browser to use the included test client.

### Docker

Build and run the server in Docker:

```sh
docker build -f Dockerfile-mcp -t aurora-cloud-mcp .
docker run -p 3000:3000 aurora-cloud-mcp
```

### Environment Variables

You can use a `.env` file to provide environment variables (such as API keys or secrets) as needed by the Aurora Cloud API.

### Scripts

- `npm run build` – Compile TypeScript to JavaScript.
- `npm start` – Run the MCP server (builds first if needed).
- `npm run typecheck` – Type-check the codebase.

## Project Structure

- `src/index.ts` – Main MCP server logic (stdio transport).
- `src/web-server.ts` – HTTP/SSE server and web client.
- `public/index.html` – Web-based test client UI.
- `Dockerfile-mcp` – Docker build instructions.

## Development

- TypeScript strict mode is enabled.
- Output is placed in the `build/` directory.
- Node.js 20+ is required.

## How to regenerate the MCP server

Generate an MCP server targeting the Aurora Cloud OpenAPI specification.

```sh
openapi-mcp-generator --input https://app.auroracloud.dev/api/docs --output . --force --base-url https://app.auroracloud.dev
```

Build generated MCP server.

```sh
npm run build
```

## License

MIT License — see [LICENSE](./LICENSE) for full details.
