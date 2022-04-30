import { Article } from "../types";

type Props = {
  article: Article;
};

export const ListItem: React.FC<Props> = ({ article }) => (
  <div className="mb-10">
    <h2 className="text-4xl font-display italic font-bold text-slate-700 mb-3">
      <a href={`/${article.slug}`} className="hover:text-slate-900">
        {article.title}
      </a>
    </h2>
    <div className="font-body text-slate-600">{article.excerpt}</div>
  </div>
);
