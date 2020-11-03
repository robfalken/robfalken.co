import { Link } from "gatsby";
import React from "react";

interface Props {
  post: {
    title: string;
    slug: string;
    excerpt: string;
  };
}

export const PostExcerpt = ({ post }: Props): React.ReactElement => {
  return (
    <div>
      <h2 className="text-3xl mb-4">
        <Link className="hover:underline" to={`/${post.slug}`}>
          {post.title}
        </Link>
      </h2>
      <div className="mb-2">{post.excerpt}</div>
      <Link
        to={`/${post.slug}`}
        className="mt-2 text-sm text-orange-500 hover:text-orange-600 hover:underline"
      >
        Read more
      </Link>
    </div>
  );
};
