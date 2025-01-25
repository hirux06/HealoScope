import { GoogleGenerativeAI } from '@google/generative-ai';


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });


export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required.' });
    }

    const result = await model.generateContent(prompt);
    if (result?.response?.text) {
      return res.status(200).json({ content: result.response.text() });
    }

    return res.status(500).json({
      message: 'Failed to generate content. Please try again later.',
    });
  } catch (error) {
    console.error('Error in generateContent:', error);
    return res.status(500).json({
      message: 'An error occurred while generating content.',
      error: error.response?.data || error.message,
    });
  }
};

