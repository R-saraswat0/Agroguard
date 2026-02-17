import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const apiKey = process.env.OPENAI_API_KEY;
const visionModel = process.env.OPENAI_VISION_MODEL || "gpt-4o-mini";

if (!apiKey) {
  console.error("Error: OPENAI_API_KEY is not defined in .env");
}

router.post("/treatment", async (req, res) => {
  const {
    plantName,
    detectedDisease,
    observedSymptoms,
    affectedParts,
    severityLevel,
    spreadRate,
    weatherConditions,
    preferredTreatmentType,
    previousDiseaseHistory,
  } = req.body;

  try {
    if (!plantName || !detectedDisease || !observedSymptoms) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `Based on the following input from a farmer, provide treatment recommendations strictly in JSON format.

**Input Details:**
- **Plant Name:** ${plantName}
- **Detected Disease:** ${detectedDisease}
- **Observed Symptoms:** ${observedSymptoms}
- **Affected Parts:** ${affectedParts}
- **Severity Level:** ${severityLevel}
- **Spread Rate:** ${spreadRate}
- **Weather Conditions:** ${weatherConditions}
- **Preferred Treatment Type:** ${preferredTreatmentType}
- **Previous Disease History:** ${previousDiseaseHistory}

**Expected JSON Output Format:**
{
  "disease_explanation": "<Brief explanation of the disease>",
  "treatment_recommendations": {
    "organic": "<Organic treatment options (if applicable)>",
    "chemical": "<Chemical treatment options (if applicable)>",
    "both": "<Both organic and chemical treatment options>"
  },
  "preventive_measures": "<Preventive measures to avoid future outbreaks>",
  "best_recovery_practices": "<Best practices for plant recovery>",
  "expert_advice": "<Any additional expert advice>"
}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an agricultural expert. Provide treatment recommendations in valid JSON format only." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || "OpenAI API error");
    }

    let aiResponse = data.choices[0].message.content.trim();
    aiResponse = aiResponse.replace(/```json|```/g, "").trim();
    const parsedResponse = JSON.parse(aiResponse);

    res.json({ treatment: parsedResponse });
  } catch (error) {
    console.error("Error generating AI treatment:", error);
    res.status(500).json({ message: "Error generating treatment recommendation", error: error.message });
  }
});

router.post("/scan-disease", async (req, res) => {
  const { base64Image, mimeType } = req.body;

  try {
    if (!apiKey) {
      return res.status(500).json({ message: "OPENAI_API_KEY is not configured" });
    }

    if (!base64Image) {
      return res.status(400).json({ message: "base64Image is required" });
    }

    const safeMimeType = mimeType || "image/jpeg";
    const imageDataUrl = `data:${safeMimeType};base64,${base64Image}`;

    const prompt = `Analyze this plant image and return strict JSON only with this exact schema:
{
  "disease_name": "<detected disease or 'Unknown'>",
  "confidence": "<Low|Medium|High>",
  "explanation": "<short explanation>",
  "recommended_action": "<concise actionable next step>"
}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: visionModel,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a plant pathology assistant. Return only valid JSON with the exact requested keys.",
          },
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: imageDataUrl } },
            ],
          },
        ],
        temperature: 0.2,
        max_tokens: 300,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "OpenAI API error");
    }

    let aiResponse = data.choices?.[0]?.message?.content?.trim() || "{}";
    aiResponse = aiResponse.replace(/```json|```/g, "").trim();
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch {
      parsedResponse = {
        disease_name: "Unknown",
        confidence: "Low",
        explanation: aiResponse || "Model returned an unexpected format.",
        recommended_action: "Please retry with a clear close-up image of a single affected leaf."
      };
    }

    return res.json({ result: parsedResponse });
  } catch (error) {
    console.error("Error scanning disease image:", error);
    return res
      .status(500)
      .json({ message: "Error analyzing plant image", error: error.message });
  }
});

export default router;
