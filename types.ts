export interface Emoji {
  emoji: string;
  name: string;
}

export type AppStep = 'selection' | 'generating' | 'checking_domain' | 'domain_result';