export type Language = 'en' | 'ar';

export interface Translations {
  // Header
  headerTitle: string;
  headerSubtitle: string;
  inspectorVersion: string;
  quickTest: string;
  savedAudits: string;
  langToggle: string;

  // Presets
  presetRoofer: string;
  presetDentist: string;
  presetPlumber: string;
  presetRealty: string;

  // Input Section
  instantAuditBadge: string;
  heroHeading: string;
  heroHeadingHighlight: string;
  heroSubheading: string;
  businessNameLabel: string;
  businessNamePlaceholder: string;
  industryLabel: string;
  websiteTitleLabel: string;
  websiteTitlePlaceholder: string;
  fillSampleBtn: string;
  charsCount: string;
  tooLongMsg: string;
  optimalRangeMsg: string;
  cityLabel: string;
  cityOptionalNote: string;
  cityPlaceholder: string;
  auditIncludesNote: string;
  analyzeBtnText: string;
  analyzingBtnText: string;

  // Score Gauge
  resultsTitle: string;
  overallScoreLabel: string;
  gradeLabel: string;
  auditTargetLabel: string;
  currentTitleEvaluated: string;
  searchRankRisk: string;
  highRisk: string;
  mapPackRank: string;
  mapPackPositions: string;
  estCtrLoss: string;
  clickPenalty: string;

  // Score Statuses
  scoreExcellentTitle: string;
  scoreExcellentDesc: string;
  scoreModerateTitle: string;
  scoreModerateDesc: string;
  scoreBelowAvgTitle: string;
  scoreBelowAvgDesc: string;
  scoreCriticalTitle: string;
  scoreCriticalDesc: string;

  // Breakdown Card
  breakdownSectionTitle: string;
  breakdownSectionSubtitle: string;
  keyActionItems: string;
  passBadge: string;
  failBadge: string;
  optOpportunityBadge: string;
  needsImpBadge: string;

  // Recommendations
  recommendationsBadge: string;
  recommendationsHeading: string;
  engineeredFor: string;
  oneClickCopyNote: string;
  topRecommendedBadge: string;
  copyTitleBtn: string;
  copiedBtn: string;
  whyThisRanks: string;

  // SERP Preview
  serpHeading: string;
  serpSubheading: string;
  desktopSerp: string;
  mobileLocalPack: string;
  currentSnippetHeader: string;
  currentStatus: string;
  optimizedSnippetHeader: string;
  optimizedBadge: string;
  welcomeSnippetPrefix: string;
  optimizedSnippetPrefix: string;
  googleReviewsIn: string;

  // AI Enhancer
  aiHeaderTitle: string;
  aiHeaderDesc: string;
  generatingAiText: string;
  hideAiDetails: string;
  viewAiAssets: string;
  generateAiBtn: string;
  aiDiagnosisTitle: string;
  metaDescTitle: string;
  buyerKeywordsTitle: string;
  schemaSnippetTitle: string;

  // Upgrade Card & Modal
  rankDefenseBadge: string;
  seoCalloutQuote: string;
  seoSubheadline: string;
  upgradeBtnText: string;
  cancelAnytimeGuarantee: string;
  modalTitle: string;
  modalSubtext: string;
  pricingMonthly: string;
  pricingTag: string;
  whatsIncludedTitle: string;
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  feature5: string;
  feature6: string;
  ownerEmailLabel: string;
  ownerPhoneLabel: string;
  startMonthlyAutoBtn: string;
  startingAutoBtn: string;
  successModalTitle: string;
  successModalSubtext: string;
  nextStepsTitle: string;
  nextStep1: string;
  nextStep2: string;
  nextStep3: string;
  backToScorecardBtn: string;

  // Saved Drawer
  drawerTitle: string;
  drawerSubtitle: string;
  noAuditsYet: string;
  runAuditNote: string;
  loadScorecardBtn: string;
  auditsSaved: string;
  clearAllHistory: string;

  // Footer
  footerAppTitle: string;
  footerTagline: string;
  footerRights: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    headerTitle: 'Local SEO',
    headerSubtitle: '& Title Scorecard',
    inspectorVersion: 'Inspector v2.4',
    quickTest: 'Quick Test:',
    savedAudits: 'Saved Audits',
    langToggle: 'العربية',

    presetRoofer: 'Emergency Roofer',
    presetDentist: 'Family Dentist',
    presetPlumber: '24/7 Plumber',
    presetRealty: 'Realty Agent',

    instantAuditBadge: 'Instant Local Business SEO Audit',
    heroHeading: 'Check Your Website Title Score &',
    heroHeadingHighlight: 'Outrank Competitors on Google',
    heroSubheading: 'Enter your business details below to audit title pixel length, keyword intent, and local Google Map Pack visibility in under 3 seconds.',
    businessNameLabel: 'Business Name',
    businessNamePlaceholder: 'e.g. Apex Roofing & Restoration',
    industryLabel: 'Business Industry / Niche',
    websiteTitleLabel: 'Current Website Title or Main Keyword',
    websiteTitlePlaceholder: 'e.g. Apex Roofing - Home Page or Emergency Roofing Dallas',
    fillSampleBtn: 'Fill Sample',
    charsCount: 'chars',
    tooLongMsg: '(Too Long - Will Truncate)',
    optimalRangeMsg: '(Optimal Range)',
    cityLabel: 'Target City / Metro Location',
    cityOptionalNote: '(Optional for localized scoring)',
    cityPlaceholder: 'e.g. Dallas, TX',
    auditIncludesNote: 'Includes Title Pixel Analysis + Competitor Map Pack Audit',
    analyzeBtnText: 'Analyze SEO Score Now',
    analyzingBtnText: 'Calculating Scorecard...',

    resultsTitle: 'Audit Results & Title Scorecard',
    overallScoreLabel: 'Overall SEO Score',
    gradeLabel: 'Grade',
    auditTargetLabel: 'Audit Target:',
    currentTitleEvaluated: 'Current Title Evaluated:',
    searchRankRisk: 'Search Rank Risk',
    highRisk: 'High Risk',
    mapPackRank: 'Map Pack Rank',
    mapPackPositions: 'Positions #4 - #12',
    estCtrLoss: 'Est. CTR Loss',
    clickPenalty: '~ 42% Click Penalty',

    scoreExcellentTitle: 'Excellent Local SEO Optimization',
    scoreExcellentDesc: 'Your website title contains strong local intent and pixel balance.',
    scoreModerateTitle: 'Moderate Optimization Level',
    scoreModerateDesc: 'Slightly above average, but missing key CTR triggers and city signals.',
    scoreBelowAvgTitle: 'Below Average Local Score',
    scoreBelowAvgDesc: 'High risk of being outranked by competitors in local Map Pack searches.',
    scoreCriticalTitle: 'Critical Local SEO Deficit',
    scoreCriticalDesc: 'Title is truncated or completely missing local service keywords.',

    breakdownSectionTitle: '3-Point SEO Audit Breakdown',
    breakdownSectionSubtitle: 'Evaluated against Google Local Pack Ranking Factors',
    keyActionItems: 'Key Action Items',
    passBadge: 'Pass',
    failBadge: 'Fail',
    optOpportunityBadge: 'Optimization Opportunity',
    needsImpBadge: 'Needs Improvement',

    recommendationsBadge: 'Ready-to-Use High Rank Formulas',
    recommendationsHeading: 'Rewritten & Optimized Title Recommendations',
    engineeredFor: 'Engineered specifically for',
    oneClickCopyNote: 'Copy with 1 click to update your CMS/WordPress tag',
    topRecommendedBadge: '#1 Recommended',
    copyTitleBtn: 'Copy Title',
    copiedBtn: 'Copied to Clipboard!',
    whyThisRanks: 'Why this ranks:',

    serpHeading: 'Live Google Search & Map Pack SERP Inspector',
    serpSubheading: 'Compare how your business snippet appears to local potential customers on Google.',
    desktopSerp: 'Desktop SERP',
    mobileLocalPack: 'Mobile Local Pack',
    currentSnippetHeader: 'Current Google Snippet (Before)',
    currentStatus: 'Status: Lower CTR',
    optimizedSnippetHeader: 'Optimized Snippet (After)',
    optimizedBadge: 'Max CTR + Rank Boost',
    welcomeSnippetPrefix: 'Welcome to',
    optimizedSnippetPrefix: 'Top-Rated local service in',
    googleReviewsIn: 'Google Reviews in',

    aiHeaderTitle: 'Gemini AI Local SEO & Meta Generator',
    aiHeaderDesc: 'Generate AI meta descriptions, buyer-intent keywords, and Schema.org snippets tailored to your business.',
    generatingAiText: 'Generating AI Assets...',
    hideAiDetails: 'Hide AI Details',
    viewAiAssets: 'View AI Assets',
    generateAiBtn: 'Generate AI Meta & Keywords',
    aiDiagnosisTitle: 'AI Executive Diagnosis:',
    metaDescTitle: 'High Conversion Meta Description',
    buyerKeywordsTitle: 'Top Local Buyer Intent Keywords',
    schemaSnippetTitle: 'LocalBusiness Schema.org JSON-LD',

    rankDefenseBadge: 'Continuous Local SEO Rank Defense',
    seoCalloutQuote: '"SEO requires continuous optimization to stay ahead of local competitors."',
    seoSubheadline: 'Get full automated monthly SEO maintenance, rank monitoring, and technical fixes.',
    upgradeBtnText: 'Upgrade to Automated Monthly SEO ($49/mo)',
    cancelAnytimeGuarantee: 'Cancel anytime • 30-Day Money-Back Guarantee',
    modalTitle: 'Activate Monthly SEO Defense',
    modalSubtext: 'Automated rank monitoring & continuous optimization for your business.',
    pricingMonthly: '/ month',
    pricingTag: 'No Contract • Cancel Anytime',
    whatsIncludedTitle: "What's Included Every Month:",
    feature1: 'Weekly Google Local Pack Audits',
    feature2: 'Auto Title & Meta Description Fixes',
    feature3: 'Local Business Schema JSON-LD Sync',
    feature4: 'Monthly Executive SEO PDF Report',
    feature5: 'Local Competitor Defection Alerts',
    feature6: 'Dedicated Local SEO Specialist',
    ownerEmailLabel: 'Owner Email Address',
    ownerPhoneLabel: 'Phone Number for SMS Rank Alerts',
    startMonthlyAutoBtn: 'Start Monthly SEO Automation ($49/mo)',
    startingAutoBtn: 'Starting Automated SEO Defense...',
    successModalTitle: 'Monthly SEO Defense Activated!',
    successModalSubtext: 'Confirmation sent. Our automated system is now syncing rank tracking for your business.',
    nextStepsTitle: 'Next Automated Steps:',
    nextStep1: '1. Initial Google Local Pack crawling underway.',
    nextStep2: '2. Title and Meta description optimization dispatching to CMS.',
    nextStep3: '3. Your first weekly rank report will arrive in 7 days.',
    backToScorecardBtn: 'Back to Inspector Scorecard',

    drawerTitle: 'Saved Title Scorecards',
    drawerSubtitle: 'Access previous local business title audits stored in your local session.',
    noAuditsYet: 'No saved title audits yet.',
    runAuditNote: 'Run an audit above to automatically save results here.',
    loadScorecardBtn: 'Load Scorecard',
    auditsSaved: 'Audits Saved',
    clearAllHistory: 'Clear All History',

    footerAppTitle: 'Local SEO & Title Scorecard Inspector',
    footerTagline: 'Standard 50-60 Character & Pixel Analyzer',
    footerRights: 'Built for Roofers, Dentists, Plumbers, Attorneys & Real Estate Agents.',
  },
  ar: {
    headerTitle: 'محلل SEO المحلي',
    headerSubtitle: 'وبطاقة تقييم العنوان',
    inspectorVersion: 'الفاحص v2.4',
    quickTest: 'اختبار سريع:',
    savedAudits: 'التقارير المحفوظة',
    langToggle: 'English',

    presetRoofer: 'مقاول أسقف',
    presetDentist: 'طبيب أسنان',
    presetPlumber: 'سباك طوارئ',
    presetRealty: 'وكيل عقارات',

    instantAuditBadge: 'فحص SEO فوري للأعمال المحلية',
    heroHeading: 'افحص درجة عنوان موقعك و',
    heroHeadingHighlight: 'تصدّر نتائج البحث على جوجل',
    heroSubheading: 'أدخل تفاصيل نشاطك التجاري أدناه لتحليل طول العنوان بالبكسل، ونية الكلمات المفتاحية، والظهور في خرائط جوجل خلال أقل من 3 ثوانٍ.',
    businessNameLabel: 'اسم النشاط التجاري',
    businessNamePlaceholder: 'مثال: شركة القمة لمقاولات الأسقف',
    industryLabel: 'المجال / التخصص التجاري',
    websiteTitleLabel: 'عنوان الموقع الحالي أو الكلمة المفتاحية',
    websiteTitlePlaceholder: 'مثال: شركة القمة - خدمات تركيب وصيانة الأسقف بالرياض',
    fillSampleBtn: 'تعبئة نموذج',
    charsCount: 'حرف',
    tooLongMsg: '(طويل جداً - سيتم اقتطاعه)',
    optimalRangeMsg: '(الطول المثالي)',
    cityLabel: 'المدينة / المنطقة المستهدفة',
    cityOptionalNote: '(اختياري لتحسين التقييم المحلي)',
    cityPlaceholder: 'مثال: الرياض، السعودية',
    auditIncludesNote: 'يتضمن تحليل البكسل وتدقيق التنافسية في خرائط جوجل',
    analyzeBtnText: 'تحليل نتيجة SEO الآن',
    analyzingBtnText: 'جاري حساب بطاقة التقييم...',

    resultsTitle: 'نتائج الفحص وبطاقة تقييم العنوان',
    overallScoreLabel: 'الدرجة الإجمالية لـ SEO',
    gradeLabel: 'التقدير',
    auditTargetLabel: 'الهدف المفحوص:',
    currentTitleEvaluated: 'العنوان الحالي المفحوص:',
    searchRankRisk: 'مخاطر الترتيب',
    highRisk: 'خطر مرتفع',
    mapPackRank: 'ترتيب الخرائط',
    mapPackPositions: 'المراكز #4 - #12',
    estCtrLoss: 'خسارة النقرات المقدرة',
    clickPenalty: '~ 42% عقوبة انخفاض النقرات',

    scoreExcellentTitle: 'تحسين ممتاز لـ SEO المحلي',
    scoreExcellentDesc: 'عنوان موقعك يحتوي على استهداف محلي قوي وتوازن ممتازة في عدد الأحرف والبكسلات.',
    scoreModerateTitle: 'مستوى تحسين متوسط',
    scoreModerateDesc: 'أعلى قليلاً من المتوسط، لكن يفتقر إلى محفزات النقر والإشارات المكانية المباشرة.',
    scoreBelowAvgTitle: 'نتيجة محليّة دون المتوسط',
    scoreBelowAvgDesc: 'مخاطرة عالية بالتراجع أمام المنافسين في نتائج خرائط جوجل المحلية.',
    scoreCriticalTitle: 'عجز حاد في SEO المحلي',
    scoreCriticalDesc: 'العنوان مقطوع أو يفتقر تماماً للكلمات المفتاحية الخاصة بالخدمة المحلية.',

    breakdownSectionTitle: 'تفصيل الفحص الثلاثي لـ SEO',
    breakdownSectionSubtitle: 'مقيم وفق عوامل الترتيب في حزمة جوجل المحلية (Google Local Pack)',
    keyActionItems: 'إجراءات التحسين الرئيسية',
    passBadge: 'مكتمِل',
    failBadge: 'بحاجة لتعديل',
    optOpportunityBadge: 'فرصة تحسين',
    needsImpBadge: 'يحتاج تطوير',

    recommendationsBadge: 'صيغ تصدر جاهزة للاستخدام',
    recommendationsHeading: 'توصيات العناوين المحسّنة والمصاغة برمجياً',
    engineeredFor: 'مصممة خصيصاً لـ',
    oneClickCopyNote: 'انسخ بنقرة واحدة لتحديث وسام Title في موقعك',
    topRecommendedBadge: '#1 الخيار الموصى به',
    copyTitleBtn: 'نسخ العنوان',
    copiedBtn: 'تم النسخ للحافظة!',
    whyThisRanks: 'سبب قوة هذه الصيغة:',

    serpHeading: 'معاين مباشر لنتائج جوجل وخرائط Map Pack',
    serpSubheading: 'قارن كيف يظهر مقتطف موقعك للعملاء المحليين على محرك بحث جوجل.',
    desktopSerp: 'معاينة الكمبيوتر',
    mobileLocalPack: 'معاينة الهاتف والخرائط',
    currentSnippetHeader: 'مقتطف جوجل الحالي (قبل التعديل)',
    currentStatus: 'الحالة: معدل نقر منخفض',
    optimizedSnippetHeader: 'المقتطف المحسّن (بعد التعديل)',
    optimizedBadge: 'أعلى نسبة نقر + رفع الترتيب',
    welcomeSnippetPrefix: 'أهلاً بكم في',
    optimizedSnippetPrefix: 'أفضل خدمة محلية معتمدة في',
    googleReviewsIn: 'تقييمات جوجل في',

    aiHeaderTitle: 'مولد الوصف والكلمات الذكي Gemini AI',
    aiHeaderDesc: 'أنشئ أوصاف Meta المحفزة للنقر، الكلمات المفتاحية الأكثر طلباً، وأكواد Schema.org لموقعك.',
    generatingAiText: 'جاري إنشاء الأصول بالذكاء الاصطناعي...',
    hideAiDetails: 'إخفاء التفاصيل',
    viewAiAssets: 'عرض الأصول الذكية',
    generateAiBtn: 'توليد الوصف والكلمات المفتاحية',
    aiDiagnosisTitle: 'التشخيص التنفيذي للذكاء الاصطناعي:',
    metaDescTitle: 'وصف Meta محفّز لأعلى نسبة تحويل',
    buyerKeywordsTitle: 'أبرز الكلمات المفتاحية ذات النية الشرائية',
    schemaSnippetTitle: 'كود Schema.org للأنشطة التجارية المحلية',

    rankDefenseBadge: 'حماية متواصلة لترتيب SEO المحلي',
    seoCalloutQuote: '"يتطلب SEO تحسيناً ومتابعة مستمرة للبقاء في صدارة المنافسين المحليين."',
    seoSubheadline: 'احصل على صيانة أوتوماتيكية شهرية لـ SEO ومراقبة الترتيب والمعالجة التقنية.',
    upgradeBtnText: 'الترقية إلى صيانة SEO الشهرية ($49/شهرياً)',
    cancelAnytimeGuarantee: 'إلغاء في أي وقت • ضمان استرجاع الأموال لمدة 30 يوماً',
    modalTitle: 'تفعيل حماية SEO الشهرية',
    modalSubtext: 'مراقبة أوتوماتيكية للترتيب وتحسين مستمر لنشاطك التجاري.',
    pricingMonthly: '/ شهرياً',
    pricingTag: 'بدون عقود • إلغاء في أي وقت',
    whatsIncludedTitle: 'المميزات المتضمنة شهرياً:',
    feature1: 'تدقيق أسبوعي لنتائج خرائط جوجل',
    feature2: 'إصلاح تلقائي للعناوين والأوصاف المقطوعة',
    feature3: 'مزامنة أكواد Schema.org للأنشطة المحلية',
    feature4: 'تقرير شهري تنفيذي لنتائج SEO بملف PDF',
    feature5: 'تنبيهاً فورية عند تحركات المنافسين',
    feature6: 'مستشار SEO محلي مخصص لحسابك',
    ownerEmailLabel: 'البريد الإلكتروني لمالك النشاط',
    ownerPhoneLabel: 'رقم الهاتف للتنبيهات عبر SMS',
    startMonthlyAutoBtn: 'بدء الأتمتة الشهرية لـ SEO ($49/شهرياً)',
    startingAutoBtn: 'جاري تفعيل الأتمتة...',
    successModalTitle: 'تم تفعيل حماية SEO الشهرية بنجاح!',
    successModalSubtext: 'تم إرسال التأكيد. يقوم نظامنا الأوتوماتيكي الآن بمزامنة تتبع الترتيب لموقعك.',
    nextStepsTitle: 'الخطوات التالية الأوتوماتيكية:',
    nextStep1: '1. بدء زحف أولي لفحص ترتيبك في خرائط جوجل.',
    nextStep2: '2. إرسال العناوين والأوصاف المحسّنة لإدارة نظام موقعك.',
    nextStep3: '3. ستصلك أول مراجعة أسبوعية للترتيب خلال 7 أيام.',
    backToScorecardBtn: 'العودة لبطاقة التقييم',

    drawerTitle: 'تقارير العناوين المحفوظة',
    drawerSubtitle: 'استعرض تقارير فحص عناوين المواقع السابقة المخزنة في الجلسة.',
    noAuditsYet: 'لا توجد تقارير محفوظة حتى الآن.',
    runAuditNote: 'قم بإجراء فحص في الأعلى لحفظ النتائج هنا تلقائياً.',
    loadScorecardBtn: 'تحميل التقرير',
    auditsSaved: 'تقارير محفوظة',
    clearAllHistory: 'مسح جميع السجلات',

    footerAppTitle: 'محلل SEO المحلي وبطاقة تقييم العناوين',
    footerTagline: 'محلل الأحرف والبكسلات معايير 50-60 حرف',
    footerRights: 'مصمم لمقاولي الأسقف، أطباء الأسنان، السباكين، المحامين، والوكلاء العقاريين.',
  },
};
