import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/OptimizedImage";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { formatEventDate } from "@/lib/events";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  tags: string[];
  category: string;
}

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Getting Started with IEEE: A Complete Guide for New Members",
      excerpt: "Everything you need to know about joining IEEE and making the most of your membership experience.",
      content: "IEEE (Institute of Electrical and Electronics Engineers) is the world's largest technical professional organization...",
      author: "IEEE @ IPEC Team",
      date: "2025-01-15",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      tags: ["IEEE", "Membership", "Guide"],
      category: "guide",
    },
    {
      id: "2",
      title: "Tech Fest 2025: Highlights and Key Takeaways",
      excerpt: "A comprehensive recap of our annual tech fest featuring workshops, competitions, and networking sessions.",
      content: "IEEE Tech Fest 2025 was a resounding success, bringing together over 500 participants...",
      author: "Event Team",
      date: "2025-01-10",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      tags: ["Events", "Tech Fest", "Highlights"],
      category: "events",
    },
    {
      id: "3",
      title: "Women in Engineering: Breaking Barriers in Tech",
      excerpt: "Celebrating the achievements of women engineers and promoting diversity in technology fields.",
      content: "The Women in Engineering (WIE) chapter at IEEE @ IPEC is dedicated to empowering women in technology...",
      author: "WIE Chapter",
      date: "2025-01-05",
      imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
      tags: ["WIE", "Diversity", "Engineering"],
      category: "diversity",
    },
    {
      id: "4",
      title: "Building Your First Web Application: A Beginner's Journey",
      excerpt: "Learn the fundamentals of web development and build your first application from scratch.",
      content: "Web development is one of the most accessible and rewarding fields in technology today...",
      author: "Technical Team",
      date: "2024-12-28",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
      tags: ["Web Development", "Tutorial", "Beginner"],
      category: "tutorial",
    },
  ];

  const categories = ["all", "guide", "events", "diversity", "tutorial", "news"];

  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  if (selectedPost) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Button
            variant="outline"
            onClick={() => setSelectedPost(null)}
            className="mb-6 glass-subtle"
          >
            ← Back to Blog
          </Button>
          <article className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-3xl overflow-hidden layer-3 border-highlight">
              <OptimizedImage
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                aspectRatio="auto"
                className="w-full h-64 md:h-96"
                priority
              />
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{selectedPost.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{selectedPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{formatEventDate(selectedPost.date)}</span>
                  </div>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-muted-foreground mb-6">{selectedPost.excerpt}</p>
                  <div className="space-y-4">
                    <p>{selectedPost.content}</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                      in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">IEEE Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest news, guides, and insights from IEEE @ IPEC
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="glass-subtle capitalize"
            >
              {category === "all" ? "All Posts" : category}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="glass-strong border-highlight card-interactive focus-ring cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="aspect-video overflow-hidden">
                <OptimizedImage
                  src={post.imageUrl}
                  alt={post.title}
                  aspectRatio="video"
                  className="hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatEventDate(post.date)}</span>
                    </div>
                  </div>
                  <ArrowRight size={16} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No posts found in this category.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;

