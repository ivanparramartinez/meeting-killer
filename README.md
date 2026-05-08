# Meeting Killer

AI-powered meeting outcome generator that replaces unnecessary meetings with instant, actionable insights.

## Features

- **Real AI Processing**: Powered by Google Gemini API for intelligent meeting analysis
- **Instant Outcomes**: Generate decision summaries, key points, decisions, action items, and risks
- **Clean UI**: Minimal, dark-mode interface with enhanced readability
- **Priority Action Items**: Action items section prominently highlighted for immediate attention

## Setup

### Prerequisites
- Node.js 16+ installed
- Google Gemini API key

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variable**:
   ```bash
   # For Mac/Linux
   export GEMINI_API_KEY="your_gemini_api_key_here"
   
   # For Windows
   set GEMINI_API_KEY="your_gemini_api_key_here"
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Set it as your environment variable (see step 2 above)

## Usage

1. **Describe your meeting**: Paste meeting notes, agenda, or discussion topics in the textarea
2. **Generate outcome**: Click "Generate Meeting Outcome" to process with AI
3. **Review results**: Get instant insights across 5 key sections:
   - Decision Summary
   - Key Points
   - Decisions Made
   - Action Items (highlighted as priority)
   - Risks / Open Questions

## Deployment on Vercel

### Prerequisites
- Vercel account
- Gemini API key

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Deploy
```bash
vercel --prod
```

### Step 3: Set Environment Variables
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add: `GEMINI_API_KEY` with your Gemini API key

### Step 4: Verify Deployment
Your app will be available at: `https://your-project-name.vercel.app`

### Environment Variables Required
- `GEMINI_API_KEY`: Your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Health Check
After deployment, test: `https://your-project-name.vercel.app/api/health`

## Development

### Running in development mode:
```bash
npm run dev
```

This uses nodemon to automatically restart the server when files change.

### Project Structure
```
meeting-killer/
├── server.js          # Express server with Gemini API integration
├── index.html          # Frontend application
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## API Endpoint

### POST /api/generate-outcome

**Request Body**:
```json
{
  "meetingInput": "Your meeting description here..."
}
```

**Response**:
```json
{
  "decisionSummary": "Concise summary of main decision",
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3"],
  "decisionsMade": ["Decision 1", "Decision 2"],
  "actionItems": ["Action item 1", "Action item 2", "Action item 3"],
  "risksQuestions": ["Risk 1", "Risk 2"]
}
```

## Troubleshooting

### Common Issues

1. **"Failed to generate outcome" error**:
   - Check that your GEMINI_API_KEY is properly set
   - Verify the API key is valid and has quota
   - Check your internet connection

2. **Server won't start**:
   - Ensure Node.js 16+ is installed
   - Run `npm install` to install dependencies
   - Check if port 3000 is available

3. **API rate limits**:
   - Gemini API has rate limits - wait a moment between requests
   - Consider upgrading your API plan for higher limits

## License

MIT License - feel free to use this for your projects!
