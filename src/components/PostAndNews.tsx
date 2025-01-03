"use client";

import { useState, useEffect } from "react";
import { PostType } from "@/types/posts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth"; // Importation du type Session

// Typage de la prop 'user'
const PostsAndNews = ({ user }: { user: Session["user"] }) => {
  // Utilisation de la session user
  const [posts, setPosts] = useState<PostType[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<PostType[]>([]);
  const [postsToShow, setPostsToShow] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("http://localhost:3000/api/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
      setVisiblePosts(data.slice(0, postsToShow));
    };

    const fetchNews = async () => {
      const res = await fetch("http://localhost:3000/api/news");
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      setNews(data.articles);
    };

    fetchPosts();
    fetchNews();
  }, [postsToShow]);

  const loadMorePosts = () => {
    const nextPosts = posts.slice(visiblePosts.length, visiblePosts.length + 5);
    setVisiblePosts((prev) => [...prev, ...nextPosts]);
  };

  return (
    <div className="container mx-auto px-12 py-16">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* User Posts - Center Column */}
        <div className="lg:w-2/3">
          <h2 className="text-3xl font-bold text-white mb-6">
            Recent posts from the community
          </h2>
          <div className="space-y-6">
            {visiblePosts.length > 0 ? (
              visiblePosts.map((post) => (
                <div
                  key={post.slug}
                  className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out"
                >
                  <Link href={`/posts/${post.slug}`} className="block p-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{post.content}</p>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        By {post.author?.name || post.author?.username}
                      </span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No posts available.</p>
            )}
          </div>

          {visiblePosts.length < posts.length && (
            <div className="mt-8 text-center">
              <Button onClick={loadMorePosts} variant="outline" size="lg">
                Load More Posts
              </Button>
            </div>
          )}
        </div>

        {/* API Articles (News) - Right Column */}
        <div className="lg:w-1/4 lg:ml-32">
          <h2 className="text-3xl font-bold text-white mb-6">
            Recommended News
          </h2>
          <div className="space-y-6">
            {news.length > 0 ? (
              news.map((article, index) => (
                <div
                  key={index}
                  className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out"
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4"
                  >
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {article.description || "No description available"}
                    </p>
                  </a>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">
                No news articles available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsAndNews;
