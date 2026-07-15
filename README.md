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
- Work With Me contact form proxied through a serverless endpoint
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
- Browser request: `{ "message": "text", "conversation_id": "optional-conversation-id" }`
- Upstream request: `{ "message": "text", "conversation_id": "optional-conversation-id", "prompt_version": "v1", "model_config_id": "default" }`
- Response: `{ "reply": "text", "conversation_id": "conversation-id" }`

## Vercel Environment Variables

Set these in your Vercel project:

- `CHATBOT_BACKEND_URL` (required): Your chatbot API endpoint
- `CHATBOT_PROMPT_VERSION`: Server-side fallback for the prompt version
- `CHATBOT_MODEL_CONFIG_ID`: Server-side fallback for the model configuration ID
- `CHATBOT_BACKEND_AUTH_TOKEN` (optional): API token sent to backend
- `CHATBOT_BACKEND_AUTH_HEADER` (optional): Header name for token, default is `Authorization`
- `CHATBOT_BACKEND_TIMEOUT_MS` (optional): Timeout in milliseconds, default is `30000`
- `CONTACT_BACKEND_URL` (required for contact form): Backend contact endpoint
- `CONTACT_BACKEND_AUTH_TOKEN` (optional): API token sent to backend
- `CONTACT_BACKEND_AUTH_HEADER` (optional): Header name for token, default is `Authorization`
- `CONTACT_BACKEND_TIMEOUT_MS` (optional): Timeout in milliseconds, default is `30000`

## Contact Form Integration

The site includes:
- Frontend form: `src/components/About/ContactForm.js`
- Secure proxy function: `api/contact.js`

Flow:
1. User submits the form on the About page.
2. Browser calls `/api/contact` on the same Vercel deployment.
3. `/api/contact` forwards to your external backend contact route.
4. The response is returned to the page as success or error feedback.

Expected backend contract:

```json
{
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane@example.com",
  "phone": "+27821234567",
  "subject": "Job inquiry",
  "message": "I would like to discuss a role with you."
}
```

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
