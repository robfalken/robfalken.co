export const Layout: React.FC<{ children: any }> = ({ children }) => (
  <div>
    Layout:
    <article className="prose">{children}</article>
  </div>
);
