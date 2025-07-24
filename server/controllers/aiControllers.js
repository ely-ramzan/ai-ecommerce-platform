const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateDescription = async (req, res) => {
  try {
    const { keywords } = req.body;

    if (!keywords) {
      return res.status(400).json({ message: "Keywords are required." });
    }

    const prompt = `Write a compelling and professional e-commerce product description based on these keywords: ${keywords}. Do not use the keywords directly in a list. The description should be a flowing paragraph of 2-3 sentences.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const description = response.choices[0].message.content.trim();
    
    res.status(200).json({ description: description });

  } catch (err) {
    console.error("Error generating AI description:", err);
    res.status(500).json({ message: "Error from AI service.", error: err.message });
  }
};

module.exports = { generateDescription };