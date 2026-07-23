import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Client Helper
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Route: AI-powered SEO & Title Deep Analysis
  app.post('/api/seo/ai-analyze', async (req, res) => {
    try {
      const { businessName, websiteTitle, industry, city, lang } = req.body;

      if (!businessName || !websiteTitle || !industry) {
        return res.status(400).json({ error: 'Missing required parameters.' });
      }

      const isArabic = lang === 'ar' || /[\u0600-\u06FF]/.test(websiteTitle) || /[\u0600-\u06FF]/.test(businessName);

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(200).json({
          isAiAvailable: false,
          message: 'AI key not configured. Standard algorithm fallback active.',
        });
      }

      const prompt = `You are a top-tier Local SEO Expert and Copywriter specializing in local service businesses.
Analyze the following local business title for Google search and Local Pack optimization:

- Business Name: "${businessName}"
- Industry / Niche: "${industry}"
- Current Website Title / Keyword: "${websiteTitle}"
- Target City / Location: "${city || (isArabic ? 'المنطقة المحلية' : 'Local Metro Area')}"
${isArabic ? '- Output Language: Modern Standard Arabic (العربية الفصحى الأنيقة والمهنية)' : ''}

Provide a JSON response with:
1. "aiSummary": A 2-sentence concise breakdown of the title's strengths and missing high-intent local SEO elements${isArabic ? ' in professional Arabic' : ''}.
2. "metaDescription": A compelling, 150-160 character meta description containing local call-to-action and phone placeholder if appropriate${isArabic ? ' in natural Arabic' : ''}.
3. "keywords": An array of 5 high-converting local buyer intent keywords for this niche${isArabic ? ' in Arabic (e.g. "أفضل سباك في الرياض", "طوارئ أسنان")' : ' (e.g. "emergency roofer in [City]", "best dental clinic [City]")'}.
4. "titleVariations": An array of 3 distinct high-converting titles formatted like:
   - "High Conversion Formula"
   - "Local Map Pack Formula"
   - "Trust & Rating Formula"
5. "localSchemaSnippet": A minimal JSON-LD snippet object representation for LocalBusiness schema.

CRITICAL INSTRUCTION: ${isArabic ? 'Write ALL string content in "aiSummary", "metaDescription", "keywords", and "titleVariations" strictly in natural, professional Arabic.' : 'Write response in English.'}

Return strictly JSON matching this structure without Markdown formatting wrappers.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '';
      let parsed = {};
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = { raw: text };
      }

      return res.json({
        isAiAvailable: true,
        data: parsed,
      });
    } catch (error: any) {
      console.error('Error in /api/seo/ai-analyze:', error);
      return res.status(500).json({
        error: 'Failed to generate AI SEO insights.',
        details: error?.message || 'Unknown error',
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Local SEO Inspector server running on http://localhost:${PORT}`);
  });
}

startServer();
