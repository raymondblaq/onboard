export interface CodeBlock {
  language: string;
  code: string;
}

export interface Section {
  title: string;
  content: string;
  code?: CodeBlock;
  examples?: string[];
}

export interface Documentation {
  title: string;
  slug: string;
  category: string;
  content: string;
  sections: Section[];
}