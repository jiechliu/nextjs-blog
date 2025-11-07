import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, Category, Tag } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const slug = name.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        excerpt: data.excerpt || content.slice(0, 150) + '...',
        content,
        date: data.date || new Date().toISOString(),
        author: data.author || 'Anonymous',
        tags: data.tags || [],
        category: data.category || 'Uncategorized',
        readTime: Math.ceil(content.split(' ').length / 200),
        featured: data.featured || false,
      } as BlogPost;
    });

  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      excerpt: data.excerpt || content.slice(0, 150) + '...',
      content,
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      tags: data.tags || [],
      category: data.category || 'Uncategorized',
      readTime: Math.ceil(content.split(' ').length / 200),
      featured: data.featured || false,
    } as BlogPost;
  } catch (error) {
    return null;
  }
}

export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => 
    post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): Category[] {
  const allPosts = getAllPosts();
  const categoryCount: { [key: string]: number } = {};

  allPosts.forEach((post) => {
    const category = post.category;
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  return Object.entries(categoryCount).map(([name, count]) => ({
    name,
    slug: encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-')),
    count,
  }));
}

export function getAllTags(): Tag[] {
  const allPosts = getAllPosts();
  const tagCount: { [key: string]: number } = {};

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount).map(([name, count]) => ({
    name,
    slug: encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-')),
    count,
  }));
}

export function getFeaturedPosts(): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.featured);
}

export function getRecentPosts(limit: number = 5): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, limit);
}