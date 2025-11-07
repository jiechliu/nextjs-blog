export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  readTime: number;
  featured?: boolean;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

export interface Tag {
  name: string;
  slug: string;
  count: number;
}

export interface Author {
  name: string;
  bio: string;
  avatar?: string;
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}