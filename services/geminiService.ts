
import { GoogleGenAI, Modality, GenerateContentResponse, Type } from "@google/genai";
import { ClothingOption, Country, BackgroundColor, AnalysisFeedback } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const COUNTRY_SPECIFICATIONS = {
  [Country.USA]: { name: 'الولايات المتحدة', size: '2x2 inches' },
  [Country.Schengen]: { name: 'منطقة شنغن', size: '35x45mm' },
  [Country.Canada]: { name: 'كندا', size: '50x70mm' },
  [Country.China]: { name: 'الصين', size: '33x48mm' },
  [Country.UK]: { name: 'المملكة المتحدة', size: '35x45mm' },
  [Country.India]: { name: 'الهند', size: '2x2 inches' },
  [Country.Japan]: { name: 'اليابان', size: '35x45mm' },
  [Country.Iraq]: { name: 'العراق', size: '2x2 inches' },
};

const BACKGROUND_COLORS = {
    [BackgroundColor.OffWhite]: { name: 'أبيض مطفي', hex: '#f5f5f5' },
    [BackgroundColor.LightBlue]: { name: 'أزرق فاتح', hex: '#e1f5fe' },
    [BackgroundColor.LightGray]: { name: 'رمادي فاتح', hex: '#eeeeee' },
};

const CLOTHING_PROMPTS = {
  [ClothingOption.SUIT]: '\n8. **Clothing Modification**: Dress the subject in a professional, dark-colored business suit over a white collared shirt with a simple, neutral-colored tie. The clothing must look realistic, fit well, and be seamlessly integrated with the subject\'s body and pose.',
  [ClothingOption.SHIRT]: '\n8. **Clothing Modification**: Dress the subject in a professional, light-colored collared button-up shirt (e.g., white, light blue). The clothing must look realistic, fit well, and be seamlessly integrated with the subject\'s body and pose.',
};

const getDynamicPrompt = (country: Country, backgroundColor: BackgroundColor, clothing: ClothingOption) => {
    let prompt = `
Analyze the user-provided image and transform it into a professional passport photo that adheres to international standards.
Strictly follow these rules:
1.  **Background**: Replace the existing background with a solid, uniform, ${BACKGROUND_COLORS[backgroundColor].name} color (${BACKGROUND_COLORS[backgroundColor].hex}). Ensure there are no shadows or patterns.
2.  **Subject Integrity**: Preserve the subject's natural facial features, skin tone, hair color, and overall appearance. The generated image must be a true and accurate likeness of the individual. Do not apply any beautification filters or artistic modifications.
3.  **Expression and Pose**: The subject must have a neutral facial expression with both eyes open, looking directly at the camera, and their mouth closed. The head should be centered and facing forward.
4.  **Lighting**: Correct the lighting to be even and balanced across the face, eliminating any harsh shadows, glare, or reflections.
5.  **Quality**: Produce a high-resolution, sharp, and clear image free of any digital noise, pixelation, or artifacts.
6.  **Cropping**: Crop the image to a standard passport photo aspect ratio of ${COUNTRY_SPECIFICATIONS[country].size}. The frame should include the subject's head and the top of their shoulders.
7.  **Output Format**: The final output MUST be only the image data. Do not include any text, captions, or any other content in the response.
`;
    if (clothing !== ClothingOption.NONE && CLOTHING_PROMPTS[clothing]) {
        prompt += CLOTHING_PROMPTS[clothing];
    }
    return prompt;
};

export const generatePassportPhoto = async (
  base64ImageData: string,
  mimeType: string,
  clothing: ClothingOption,
  country: Country,
  backgroundColor: BackgroundColor
): Promise<string | null> => {
  try {
    const finalPrompt = getDynamicPrompt(country, backgroundColor, clothing);

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: finalPrompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return part.inlineData.data;
        }
    }
    
    if (response.text) {
        throw new Error(`API returned a text response instead of an image: ${response.text}`);
    }

    return null;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("فشل الاتصال بواجهة برمجة تطبيقات Gemini. يرجى المحاولة مرة أخرى لاحقًا.");
  }
};

export const analyzePhoto = async (base64ImageData: string, mimeType: string): Promise<AnalysisFeedback | null> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                    {
                        inlineData: { data: base64ImageData, mimeType: mimeType },
                    },
                    {
                        text: `Analyze this image for its suitability as a passport photo. Check for these common issues:
- Bad Lighting (shadows on face, uneven light, too dark, too bright)
- Non-Neutral Expression (smiling, frowning, mouth open)
- Obstructed Face (hair covering eyes, glasses with glare, hats)
- Busy or Colored Background (background is not plain and uniform)
- Incorrect Pose (head tilted, not looking at camera)

Based on your analysis, provide a JSON response. The ` + "`isAcceptable`" + ` field should be true only if there are NO significant issues. List all identified problems in the ` + "`issues`" + ` array.`,
                    },
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        isAcceptable: { type: Type.BOOLEAN },
                        issues: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    issueType: { type: Type.STRING, description: 'e.g., Lighting, Expression, Background' },
                                    recommendation: { type: Type.STRING, description: 'A brief, user-friendly tip to fix the issue.' },
                                }
                            }
                        }
                    }
                }
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as AnalysisFeedback;

    } catch (error) {
        console.error("Error calling Gemini API for analysis:", error);
        // In case of error, we can return a default that allows the user to proceed
        return { isAcceptable: true, issues: [] };
    }
};
