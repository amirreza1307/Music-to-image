
import { GoogleGenAI, Type } from "@google/genai";
import type { SongAnalysis } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        genre: {
            type: Type.STRING,
            description: 'ژانر احتمالی آهنگ (مثلاً: پاپ، راک، سنتی)',
        },
        mood: {
            type: Type.STRING,
            description: 'حال و هوای غالب آهنگ (مثلاً: غمگین، پرانرژی، تفکربرانگیز)',
        },
        rhythmAndTempo: {
            type: Type.STRING,
            description: "توصیفی از ریتم و تمپو (مثلاً: 'ضرب‌آهنگ سریع و شاد با یک بیت محرک'، 'آهنگ آرام، روان و ملایم')",
        },
        lyricalThemes: {
            type: Type.STRING,
            description: "خلاصه‌ای از مضامین اصلی در متن آهنگ، در صورتی که قابل شنیدن باشد (مثلاً: 'عشق گمشده، نوستالژی و امید'). اگر متنی وجود ندارد، بنویسید 'بی‌کلام'.",
        },
        visualElements: {
            type: Type.STRING,
            description: "توصیفی از تصاویر بصری عینی یا استعاره‌هایی که می‌توانند نماینده آهنگ باشند (مثلاً: 'خیابان‌های بارانی شهر در شب، نورهای نئون، یک عکس در حال محو شدن')",
        },
    },
    required: ["genre", "mood", "rhythmAndTempo", "lyricalThemes", "visualElements"],
};

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
};


export const analyzeSong = async (songFile: File): Promise<SongAnalysis> => {
    const audioPart = await fileToGenerativePart(songFile);
    
    const prompt = `شما یک متخصص تحلیل موسیقی هستید. به این آهنگ گوش دهید و آن را تحلیل کنید. بر اساس موسیقی و هر متن قابل شنیدنی، حال و هوا، مضامین متن (در صورت وجود)، ژانر، ریتم و تمپوی آهنگ را مشخص کنید. همچنین، عناصر بصری کلیدی یا استعاره‌هایی که می‌توانند نماینده آهنگ باشند را شناسایی کنید.
    
    تمام پاسخ‌های خود را به زبان فارسی ارائه دهید. خروجی را در قالب یک JSON ساختاریافته ارائه دهید.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [{ text: prompt }, audioPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
            },
        });
        
        const text = response.text.trim();
        const parsedJson = JSON.parse(text);
        return parsedJson as SongAnalysis;

    } catch (error) {
        console.error("Error analyzing song:", error);
        throw new Error("Failed to get analysis from Gemini API.");
    }
};

export const generateImageForSong = async (imagePrompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: imagePrompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image from Gemini API.");
    }
};