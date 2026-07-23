import { INDUSTRIES, POWER_WORDS } from '../data/industries';
import { AuditInputs, AuditResult, BreakdownItem, TitleRecommendation } from '../types';

export function estimatePixelWidth(text: string): number {
  let pixels = 0;
  for (const char of text) {
    // Wide characters
    if (/[WMmwGDOQ#@]/.test(char)) pixels += 12;
    // Narrow characters
    else if (/[iltf1jIr\s\.\,\-]/.test(char)) pixels += 5;
    // Arabic characters are usually around 10-11px wide in standard system fonts
    else if (/[\u0600-\u06FF]/.test(char)) pixels += 10.5;
    else pixels += 9;
  }
  return Math.round(pixels);
}

export function analyzeSeoScore(inputs: AuditInputs): AuditResult {
  const { businessName, websiteTitle, industryId, city, lang } = inputs;
  const isArabic = lang === 'ar' || /[\u0600-\u06FF]/.test(websiteTitle) || /[\u0600-\u06FF]/.test(businessName);

  const industry = INDUSTRIES.find((i) => i.id === industryId) || INDUSTRIES[0];
  const indName = isArabic && industry.nameAr ? industry.nameAr : industry.name;
  const keywordsList = isArabic && industry.popularKeywordsAr ? industry.popularKeywordsAr : industry.popularKeywords;
  const defaultCityName = isArabic && industry.defaultCityAr ? industry.defaultCityAr : industry.defaultCity;

  const cleanedTitle = websiteTitle.trim();
  const titleLen = cleanedTitle.length;
  const estPixels = estimatePixelWidth(cleanedTitle);

  // Checks
  const isTruncated = titleLen > 60 || estPixels > 580;
  const isTooShort = titleLen < 25;
  const isOptimalLen = titleLen >= 40 && titleLen <= 60 && !isTruncated;

  // Location / Geo check
  const cityName = city.trim() || defaultCityName;
  const cityTerms = cityName.toLowerCase().split(/[\s,]+/);
  const titleLower = cleanedTitle.toLowerCase();
  const hasLocation = cityTerms.some((term) => term.length > 2 && titleLower.includes(term.toLowerCase()));

  // Brand Name check
  const brandTerms = businessName.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
  const hasBrandName = brandTerms.some((term) => titleLower.includes(term.toLowerCase()));

  // High Intent Keywords check
  const industryKeywords = keywordsList.map((k) => k.toLowerCase());
  const hasHighIntentKeyword = industryKeywords.some((kw) => titleLower.includes(kw)) ||
    titleLower.includes('repair') || titleLower.includes('خدمة') || titleLower.includes('تصليح') ||
    titleLower.includes('شركة') || titleLower.includes('مكتب') || titleLower.includes('عيادة') ||
    titleLower.includes('مقاول') || titleLower.includes('سباك') || titleLower.includes('دكتور');

  // Power Words
  const hasPowerWord = POWER_WORDS.some((pw) => titleLower.includes(pw.toLowerCase()));

  // ---------------- Score Calculation ----------------
  let rawScore = 42;

  // Length Scoring (max 25 pts)
  if (isOptimalLen) {
    rawScore += 25;
  } else if (titleLen >= 25 && titleLen < 40) {
    rawScore += 18;
  } else if (titleLen > 60 && titleLen <= 70) {
    rawScore += 12;
  } else if (titleLen > 70) {
    rawScore += 5;
  } else {
    rawScore += 10;
  }

  // Geo / Location Scoring (max 25 pts)
  if (hasLocation) {
    rawScore += 25;
  } else {
    rawScore += 5;
  }

  // Keyword Intent Scoring (max 25 pts)
  if (hasHighIntentKeyword) {
    rawScore += 20;
  } else {
    rawScore += 8;
  }
  if (hasPowerWord) {
    rawScore += 5;
  }

  // Brand & Separator Scoring (max 25 pts)
  if (hasBrandName) {
    rawScore += 15;
  }
  if (cleanedTitle.includes('|') || cleanedTitle.includes('-') || cleanedTitle.includes(':') || cleanedTitle.includes('•')) {
    rawScore += 10;
  }

  // Clamp realistic score between 48 and 95
  let overallScore = Math.min(Math.max(Math.round(rawScore), 48), 95);

  if (titleLen < 15 || titleLower === 'home' || titleLower === 'الرئيسية' || titleLower === businessName.toLowerCase()) {
    overallScore = Math.min(overallScore, 52);
  }

  // Grade & Color
  let scoreGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' = 'D';
  let scoreColor = '#ef4444';

  if (overallScore >= 88) {
    scoreGrade = 'A+';
    scoreColor = '#10b981';
  } else if (overallScore >= 80) {
    scoreGrade = 'A';
    scoreColor = '#10b981';
  } else if (overallScore >= 70) {
    scoreGrade = 'B';
    scoreColor = '#06b6d4';
  } else if (overallScore >= 60) {
    scoreGrade = 'C';
    scoreColor = '#f59e0b';
  } else if (overallScore >= 50) {
    scoreGrade = 'D';
    scoreColor = '#f97316';
  } else {
    scoreGrade = 'F';
    scoreColor = '#ef4444';
  }

  // ---------------- 3-Point Breakdown Cards ----------------
  // Item 1: Title Length & Quality
  const lengthQualityStatus = (isOptimalLen && !isTruncated) ? 'pass' : 'fail';
  const lengthQualityBadge = isArabic
    ? (isOptimalLen && !isTruncated ? 'مكتمِل' : 'بحاجة لتعديل')
    : (isOptimalLen && !isTruncated ? 'Pass' : 'Fail');

  const lengthQuality: BreakdownItem = {
    key: 'length',
    title: isArabic ? 'طول العنوان وجودة البكسل' : 'Title Length & Quality',
    status: lengthQualityStatus,
    badgeLabel: lengthQualityBadge,
    scorePercent: isOptimalLen ? 92 : (isTruncated ? 45 : 35),
    description: isArabic
      ? (isTruncated
        ? `عنوان موقعك الحالي يتكون من ${titleLen} حرفاً (~${estPixels} بكسل) وسيقوم جوجل باقتطاعه بوضع "..." مما يحجب كلماتك الرئيسية.`
        : (isTooShort
          ? `عنوانك قصير جداً (${titleLen} حرفاً). يفتقر إلى الكلمات المفتاحية والإشارات المكانية الضرورية لتصدر نتائج البحث.`
          : `يبلغ طول العنوان ${titleLen} حرفاً. التوصية القياسية في شاشات جوجل هي بين 45 إلى 60 حرفاً لأعلى نسبة نقل.`))
      : (isTruncated
        ? `Your title is ${titleLen} characters (~${estPixels}px) and will be clipped by Google SERP with "..." cutting off key words.`
        : (isTooShort
          ? `Your title is only ${titleLen} characters. It is missing critical high-intent search keywords and local geographic signals.`
          : `Your title is ${titleLen} characters long. Standard pixel display recommendation is 50-60 characters for optimal click-through rates.`)),
    suggestions: isArabic
      ? [
        `الطول المثالي في نتائج جوجل: 45 إلى 60 حرفاً (عرض أقصى ~580 بكسل).`,
        isTruncated ? `قم بتقصير العنوان لتجنب الاقتطاع بـ "...".` : `أضف الكلمة المفتاحية الرئيسية واسم المدينة.`,
        `استخدم الفواصل المُنظمة (| أو -) بين الخدمة والمدينة واسم نشاطك.`
      ]
      : [
        `Ideal Google display length: 50 to 60 characters (~580px width max).`,
        isTruncated ? `Shorten title to prevent truncation cut-off.` : `Expand title with primary service keyword & city name.`,
        `Use clean separators (| or -) between service, location, and business name.`
      ],
  };

  // Item 2: Keyword Density & Intent
  const keywordStatus = (hasHighIntentKeyword && hasPowerWord) ? 'pass' : 'warning';
  const keywordBadge = isArabic
    ? ((hasHighIntentKeyword && hasPowerWord) ? 'مكتمِل' : 'فرصة تحسين')
    : ((hasHighIntentKeyword && hasPowerWord) ? 'Pass' : 'Optimization Opportunity');

  const keywordIntent: BreakdownItem = {
    key: 'keywords',
    title: isArabic ? 'كثافة الكلمات ونية البحث' : 'Keyword Density & Intent',
    status: keywordStatus,
    badgeLabel: keywordBadge,
    scorePercent: hasHighIntentKeyword ? 65 : 40,
    description: isArabic
      ? (hasHighIntentKeyword
        ? `يحتوي العنوان على الكلمة الرئيسية للمجال، ولكنه يفتقر لكلمات التحفيز الشديدة (مثل "معتمد"، "طوارئ"، "أفضل").`
        : `يفتقر العنوان للكلمة المفتاحية المباشرة لـ ${indName}. لا يستطيع جوجل تحديد تخصصك المباشر بدقة.`)
      : (hasHighIntentKeyword
        ? `Contains primary industry keyword, but lacks high-conversion buyer intent modifiers (e.g. "Emergency", "Top-Rated", "Free Estimate").`
        : `Missing primary buyer-intent keyword for ${industry.name}. Google cannot determine your exact primary local service focus.`),
    suggestions: isArabic
      ? [
        `استهدف الكلمات الأكثر طلباً مثل: ${keywordsList.slice(0, 3).join('، ')}.`,
        `ضع الكلمة المفتاحية الرئيسية في بداية العنوان (Front-loading).`,
        `أضف كلمة تعزيز ثقة مثل "معتمد"، "خبرة"، أو "خدمة 24/7".`
      ]
      : [
        `Target high-conversion keywords like: ${industry.popularKeywords.slice(0, 3).join(', ')}.`,
        `Front-load your primary service keyword (place it near the beginning of the title).`,
        `Include a buyer trust power word like "Licensed", "Top-Rated", or "24/7 Service".`
      ],
  };

  // Item 3: Competitor Visibility Index
  const competitorStatus = (hasLocation && hasBrandName) ? 'pass' : 'warning';
  const competitorBadge = isArabic
    ? ((hasLocation && hasBrandName) ? 'مكتمِل' : 'يحتاج تطوير')
    : ((hasLocation && hasBrandName) ? 'Pass' : 'Needs Improvement');

  const competitorVisibility: BreakdownItem = {
    key: 'competitors',
    title: isArabic ? 'مؤشر الظهور أمام المنافسين' : 'Competitor Visibility Index',
    status: competitorStatus,
    badgeLabel: competitorBadge,
    scorePercent: hasLocation ? 60 : 38,
    description: isArabic
      ? (hasLocation
        ? `المدينة مذكورة، ولكن المنافسين في ${cityName} يتفوقون بربط العنوان بخرائط جوجل.`
        : `اسم المدينة غائب ("${cityName}"). المنافسون في ${cityName} يحصلون على نقرات أضعاف بسبب ظهورهم في نتائج الخرائط.`)
      : (hasLocation
        ? `City signal present, but competitors in ${cityName} are outranking you by pairing localized keyword placement with Google Maps Pack signals.`
        : `Missing local city identifier ("${cityName}"). Competitors in ${cityName} gain 3.4x more clicks from local Map Pack searchers.`),
    suggestions: isArabic
      ? [
        `أضف اسم المدينة المستهدفة بوضوح: "${cityName}".`,
        `طابق صياغة العنوان مع اسم نشاطك في ملف Google Business Profile.`,
        `متوسط درجة المنافسين في مجال ${indName} هو ${industry.averageCompetitorScore}/100.`
      ]
      : [
        `Add explicit local target city: "${cityName}".`,
        `Match title tag structure with your Google Business Profile name.`,
        `Competitor average local optimization score in ${industry.name} is ${industry.averageCompetitorScore}/100.`
      ],
  };

  // ---------------- Rewritten Title Recommendations ----------------
  const primaryKw = keywordsList[0];
  const secondaryKw = keywordsList[1] || keywordsList[0];
  const cleanCity = cityName.replace(/,\s*[A-Z]{2}$/i, '');

  let rec1Text = '';
  let rec2Text = '';
  let rec3Text = '';

  let rec1Formula = '';
  let rec2Formula = '';
  let rec3Formula = '';

  let rec1Explanation = '';
  let rec2Explanation = '';
  let rec3Explanation = '';

  if (isArabic) {
    rec1Text = `${primaryKw} في ${cityName} | ${businessName}`;
    rec2Text = `أفضل ${indName} في ${cleanCity} | ${businessName} | اتصل الآن`;
    rec3Text = `${businessName} | ${primaryKw} و ${secondaryKw} ${cleanCity}`;

    rec1Formula = 'صيغة الاستهداف الجغرافي المحلي (أعلى ترتيب)';
    rec2Formula = 'صيغة زيادة معدل النقرات CTR (أعلى تحويل واتصالات)';
    rec3Formula = 'صيغة التغطية الشاملة والموثوقية';

    rec1Explanation = `تضع الكلمة الرئيسية "${primaryKw}" مع المدينة "${cityName}" في البداية لأعلى ملاءمة في خرائط جوجل.`;
    rec2Explanation = `تجمع بين عبارة الثقة "أفضل" مع نية البحث المباشرة والحث على الاتصال المباشر.`;
    rec3Explanation = `تربط اسم العلامة التجارية بشكل بارز مع خدمتين رئيسيتين للظهور في استعلامات متسعة.`;
  } else {
    rec1Text = `${primaryKw} in ${cityName} | ${businessName}`;
    rec2Text = `#1 Rated ${industry.name.split(' ')[0]} ${cleanCity} | ${businessName} | Call Today`;
    rec3Text = `${businessName} | ${primaryKw} & ${secondaryKw} ${cleanCity}`;

    rec1Formula = 'Local Geo-Targeted Formula (Highest Rank Score)';
    rec2Formula = 'High CTR Conversion Formula (Max Clicks & Calls)';
    rec3Formula = 'Multi-Service Authority Formula';

    rec1Explanation = `Front-loads primary service keyword "${primaryKw}" with localized target "${cityName}" for max Google Local Pack relevancy.`;
    rec2Explanation = `Combines top trust power phrase "#1 Rated" with strong local city intent and explicit phone call CTA.`;
    rec3Explanation = `Pairs brand name prominently with dual core services (${primaryKw} & ${secondaryKw}) for broader keyword reach.`;
  }

  const recommendations: TitleRecommendation[] = [
    {
      id: 'rec-1',
      title: rec1Text,
      formulaName: rec1Formula,
      formulaType: 'geo',
      explanation: rec1Explanation,
      characterCount: rec1Text.length,
      estimatedPixels: estimatePixelWidth(rec1Text),
      isTruncated: rec1Text.length > 65,
    },
    {
      id: 'rec-2',
      title: rec2Text,
      formulaName: rec2Formula,
      formulaType: 'conversion',
      explanation: rec2Explanation,
      characterCount: rec2Text.length,
      estimatedPixels: estimatePixelWidth(rec2Text),
      isTruncated: rec2Text.length > 65,
    },
    {
      id: 'rec-3',
      title: rec3Text,
      formulaName: rec3Formula,
      formulaType: 'trust',
      explanation: rec3Explanation,
      characterCount: rec3Text.length,
      estimatedPixels: estimatePixelWidth(rec3Text),
      isTruncated: rec3Text.length > 65,
    },
  ];

  return {
    id: 'audit-' + Date.now(),
    timestamp: Date.now(),
    inputs,
    overallScore,
    scoreGrade,
    scoreColor,
    breakdown: {
      lengthQuality,
      keywordIntent,
      competitorVisibility,
    },
    recommendations,
    currentTitleStats: {
      characterCount: titleLen,
      pixelWidth: estPixels,
      isTruncated,
      hasLocation,
      hasBrandName,
      hasHighIntentKeyword,
      hasPowerWord,
    },
  };
}
