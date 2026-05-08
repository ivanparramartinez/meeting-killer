const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Initialize Gemini AI
if (!process.env.GEMINI_API_KEY) {
    console.error('ERROR: GEMINI_API_KEY environment variable is not set');
    console.log('Get your API key from: https://aistudio.google.com/app/apikey');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log('Gemini AI initialized successfully');

// Meeting processing endpoint
app.post('/api/generate-outcome', async (req, res) => {
    try {
        const { meetingInput } = req.body;
        
        if (!meetingInput || meetingInput.trim().length < 10) {
            return res.status(400).json({ 
                error: 'Please provide a more detailed meeting description' 
            });
        }

        // Use Gemini 2.5 Flash Lite model
        const model = genAI.getGenerativeModel({ 
            model: 'gemini-2.5-flash-lite',
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,
            }
        });

        const prompt = `As an expert meeting facilitator, analyze the following meeting description and generate a comprehensive meeting outcome.

Meeting Description: "${meetingInput}"

Please provide the response in this exact JSON format:
{
  "decisionSummary": "A concise 2-3 sentence summary of the main decision or outcome",
  "keyPoints": ["3-4 key discussion points in bullet form"],
  "decisionsMade": ["2-3 specific decisions that were made"],
  "actionItems": ["3-4 concrete action items with clear owners and deadlines"],
  "risksQuestions": ["2-3 potential risks or open questions to address"]
}

Make the response professional, actionable, and specific to the meeting context provided. Respond only with valid JSON.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Parse the JSON response
        let parsedResponse;
        try {
            // Extract JSON from the response (in case there's extra text)
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                parsedResponse = JSON.parse(jsonMatch[0]);
            } else {
                parsedResponse = JSON.parse(text);
            }
        } catch (parseError) {
            console.error('Failed to parse Gemini response:', parseError);
            console.log('Raw response:', text);
            
            // Fallback to structured response if parsing fails
            parsedResponse = {
                decisionSummary: "Meeting concluded with clear alignment on next steps and stakeholder responsibilities.",
                keyPoints: [
                    "Key stakeholders identified and engaged",
                    "Primary objectives clarified and prioritized",
                    "Timeline and resource requirements discussed",
                    "Next steps and action items defined"
                ],
                decisionsMade: [
                    "Primary initiative approved with outlined scope",
                    "Resource allocation confirmed for critical path",
                    "Follow-up meeting scheduled for progress review"
                ],
                actionItems: [
                    "Project lead to document meeting outcomes",
                    "Team to provide detailed estimates by next week",
                    "Stakeholders to review and approve final plan",
                    "Communication plan to be implemented immediately"
                ],
                risksQuestions: [
                    "Potential timeline constraints need monitoring",
                    "Resource availability may require contingency planning",
                    "Stakeholder alignment needs ongoing verification"
                ]
            };
        }
        
        res.json(parsedResponse);
        
    } catch (error) {
        console.error('Error processing meeting:', error);
        console.error('Error details:', {
            message: error.message,
            status: error.status,
            statusText: error.statusText,
            errorDetails: error.errorDetails
        });
        
        // Check for API key issues
        if (error.message && error.message.includes('API key')) {
            return res.status(401).json({ 
                error: 'Invalid or missing Gemini API key. Please check your GEMINI_API_KEY environment variable.' 
            });
        }
        
        // Check for quota exceeded
        if (error.message && error.message.includes('quota')) {
            return res.status(429).json({ 
                error: 'Gemini API quota exceeded. Please check your billing settings or try again later.' 
            });
        }
        
        res.status(500).json({ 
            error: 'Failed to generate meeting outcome. Please try again.' 
        });
    }
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Meeting Killer server running on port ${PORT}`);
    console.log(`Note: Make sure to set GEMINI_API_KEY environment variable`);
});
