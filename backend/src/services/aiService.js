import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateCoverLetter = async (jobDescription, userResumeSummary) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        Write a professional short cover letter (150 words max) for a job application.
        
        Job Description:
        ${jobDescription}

        My Skills/Experience Summary:
        ${userResumeSummary}

        The cover letter should be enthusiastic, professional, and highlight relevant matching skills.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("AI Generation Error:", error);
        return "I am very interested in this role and believe my skills make me a great fit."; // Fallback
    }
};
