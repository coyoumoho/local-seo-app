var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_genai = require("@google/genai");
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  };
  app.post("/api/seo/ai-analyze", async (req, res) => {
    try {
      const { businessName, websiteTitle, industry, city, lang } = req.body;
      if (!businessName || !websiteTitle || !industry) {
        return res.status(400).json({ error: "Missing required parameters." });
      }
      const isArabic = lang === "ar" || /[\u0600-\u06FF]/.test(websiteTitle) || /[\u0600-\u06FF]/.test(businessName);
      const ai = getGeminiClient();
      if (!ai) {
        return res.status(200).json({
          isAiAvailable: false,
          message: "AI key not configured. Standard algorithm fallback active."
        });
      }
      const prompt = `You are a top-tier Local SEO Expert and Copywriter specializing in local service businesses.
Analyze the following local business title for Google search and Local Pack optimization:

- Business Name: "${businessName}"
- Industry / Niche: "${industry}"
- Current Website Title / Keyword: "${websiteTitle}"
- Target City / Location: "${city || (isArabic ? "\u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0645\u062D\u0644\u064A\u0629" : "Local Metro Area")}"
${isArabic ? "- Output Language: Modern Standard Arabic (\u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0641\u0635\u062D\u0649 \u0627\u0644\u0623\u0646\u064A\u0642\u0629 \u0648\u0627\u0644\u0645\u0647\u0646\u064A\u0629)" : ""}

Provide a JSON response with:
1. "aiSummary": A 2-sentence concise breakdown of the title's strengths and missing high-intent local SEO elements${isArabic ? " in professional Arabic" : ""}.
2. "metaDescription": A compelling, 150-160 character meta description containing local call-to-action and phone placeholder if appropriate${isArabic ? " in natural Arabic" : ""}.
3. "keywords": An array of 5 high-converting local buyer intent keywords for this niche${isArabic ? ' in Arabic (e.g. "\u0623\u0641\u0636\u0644 \u0633\u0628\u0627\u0643 \u0641\u064A \u0627\u0644\u0631\u064A\u0627\u0636", "\u0637\u0648\u0627\u0631\u0626 \u0623\u0633\u0646\u0627\u0646")' : ' (e.g. "emergency roofer in [City]", "best dental clinic [City]")'}.
4. "titleVariations": An array of 3 distinct high-converting titles formatted like:
   - "High Conversion Formula"
   - "Local Map Pack Formula"
   - "Trust & Rating Formula"
5. "localSchemaSnippet": A minimal JSON-LD snippet object representation for LocalBusiness schema.

CRITICAL INSTRUCTION: ${isArabic ? 'Write ALL string content in "aiSummary", "metaDescription", "keywords", and "titleVariations" strictly in natural, professional Arabic.' : "Write response in English."}

Return strictly JSON matching this structure without Markdown formatting wrappers.`;
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      const text = response.text || "";
      let parsed = {};
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = { raw: text };
      }
      return res.json({
        isAiAvailable: true,
        data: parsed
      });
    } catch (error) {
      console.error("Error in /api/seo/ai-analyze:", error);
      return res.status(500).json({
        error: "Failed to generate AI SEO insights.",
        details: error?.message || "Unknown error"
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Local SEO Inspector server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
