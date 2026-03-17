# Personal Portfolio | Tumelo Konaite

This repository contains my personal portfolio website, where I share my work in machine learning engineering, applied AI, and production system design.

Live Demo: [https://frontend-kappa-sandy-5ojkp7a7w8.vercel.app/](https://frontend-kappa-sandy-5ojkp7a7w8.vercel.app/)

## Built With

- React.js
- JavaScript (ES6+)
- CSS3
- Vercel

## Features

- Responsive layout for desktop and mobile
- Project showcase focused on practical AI systems
- Resume page with downloadable CV
- Contact links for GitHub, LinkedIn, and email
- Floating chatbot widget connected to an external chatbot backend

## Chatbot Integration

The site includes:
- Frontend widget: `src/components/ChatWidget.js`
- Secure proxy function: `api/chat.js`

Flow:
1. User sends message in the widget.
2. Browser calls `/api/chat` on the same Vercel deployment.
3. `/api/chat` forwards to your external chatbot backend.
4. Response is returned to the widget.

Expected backend contract:
- Request: `{ "message": "text", "session_id": "optional-session-id" }`
- Response: `{ "response": "text", "session_id": "session-id" }`

## Vercel Environment Variables

Set these in your Vercel project:

- `CHATBOT_BACKEND_URL` (required): Your chatbot API endpoint
- `CHATBOT_BACKEND_AUTH_TOKEN` (optional): API token sent to backend
- `CHATBOT_BACKEND_AUTH_HEADER` (optional): Header name for token, default is `Authorization`
- `CHATBOT_BACKEND_TIMEOUT_MS` (optional): Timeout in milliseconds, default is `30000`

## Project Structure

```text
|-- api/              # Vercel serverless functions
|-- public/           # Static assets
|-- src/
|   |-- Assets/       # Images, icons, and resume PDF
|   |-- components/   # Reusable UI components
|   `-- App.js        # Main application logic
`-- package.json      # Project dependencies
```
