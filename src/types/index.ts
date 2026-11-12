export type ConsultationMethod = 'in-person' | 'video' | 'telephone' | 'written';
export type ClientCategory = 'individual' | 'startup' | 'business' | 'enterprise';

export interface LegalService {
  id: string;
  category: 'corporate' | 'contracts' | 'property' | 'employment' | 'compliance' | 'dispute' | 'family';
  categoryLabel: string;
  title: string;
  tagline: string;
  shortDescription: string;
  clientProblem: string;
  scopeOfAssistance: string[];
  keyDeliverables: string[];
  requiredDocuments: string[];
  turnaroundTime: string;
  startingFee: string;
  feeModel: 'Fixed Engagement' | 'Hourly Advisory' | 'Monthly Retainer' | 'Milestone-Based';
  whoNeedsIt: string[];
  faqs: { question: string; answer: string }[];
  featured?: boolean;
}

export interface LegalConsultant {
  id: string;
  name: string;
  designation: string;
  roleTitle: string;
  portraitUrl: string;
  practiceAreas: string[];
  barAdmissions: string[];
  qualifications: string[];
  almaMater: string;
  experienceYears: number;
  consultationFee: string;
  languages: string[];
  bio: string;
  publicationsCount: number;
  mattersAdvised: string;
  officeLocation: string;
}

export interface IndustrySector {
  id: string;
  name: string;
  description: string;
  commonMatters: string[];
  highlightMetric: string;
  representativeCase: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  sector: string;
  clientProfile: string;
  legalChallenge: string;
  consultancyApproach: string;
  scopeOfWork: string[];
  outcome: string;
  timeframe: string;
  disclaimer: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  sector: string;
  quote: string;
  verifiedEngagement: string;
  serviceCategory: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  jurisdictionNote: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  checklist?: string[];
}

export interface FaqItem {
  id: string;
  category: 'General' | 'Booking & Fees' | 'Contracts & Corporate' | 'Confidentiality' | 'Jurisdiction';
  question: string;
  answer: string;
  practicalTip?: string;
}

export interface ConsultationBookingRequest {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  clientCategory: ClientCategory;
  serviceId: string;
  consultantId?: string;
  preferredMethod: ConsultationMethod;
  preferredDate: string;
  preferredTimeSlot: string;
  urgentMatter: boolean;
  briefDescription: string;
  jurisdiction: string;
  agreeToPrivacy: boolean;
  acknowledgedDisclaimer: boolean;
}

export interface OfficeLocation {
  city: string;
  type: string;
  address: string;
  suite: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: string;
  leadPartner: string;
  transitInfo: string;
}
