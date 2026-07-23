export interface Industry {
  id: string;
  name: string;
  nameAr?: string;
  iconName: string;
  category: string;
  popularKeywords: string[];
  popularKeywordsAr?: string[];
  sampleBusiness: string;
  sampleBusinessAr?: string;
  sampleTitle: string;
  sampleTitleAr?: string;
  defaultCity: string;
  defaultCityAr?: string;
  averageCompetitorScore: number;
}

export interface AuditInputs {
  businessName: string;
  websiteTitle: string;
  industryId: string;
  city: string;
  lang?: 'en' | 'ar';
}

export type BreakdownStatus = 'pass' | 'fail' | 'warning';

export interface BreakdownItem {
  key: 'length' | 'keywords' | 'competitors';
  title: string;
  status: BreakdownStatus;
  badgeLabel: string;
  scorePercent: number;
  description: string;
  suggestions: string[];
}

export interface TitleRecommendation {
  id: string;
  title: string;
  formulaName: string;
  formulaType: 'conversion' | 'mappack' | 'geo' | 'trust';
  explanation: string;
  characterCount: number;
  estimatedPixels: number;
  isTruncated: boolean;
}

export interface AuditResult {
  id: string;
  timestamp: number;
  inputs: AuditInputs;
  overallScore: number; // 0 - 100
  scoreGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  scoreColor: string;
  breakdown: {
    lengthQuality: BreakdownItem;
    keywordIntent: BreakdownItem;
    competitorVisibility: BreakdownItem;
  };
  recommendations: TitleRecommendation[];
  currentTitleStats: {
    characterCount: number;
    pixelWidth: number;
    isTruncated: boolean;
    hasLocation: boolean;
    hasBrandName: boolean;
    hasHighIntentKeyword: boolean;
    hasPowerWord: boolean;
  };
  aiData?: {
    aiSummary?: string;
    metaDescription?: string;
    keywords?: string[];
    titleVariations?: { formula: string; title: string }[];
    localSchemaSnippet?: any;
  };
}

export interface SavedAudit {
  id: string;
  businessName: string;
  websiteTitle: string;
  industryName: string;
  overallScore: number;
  dateStr: string;
  result: AuditResult;
}
