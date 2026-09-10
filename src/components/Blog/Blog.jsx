import { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import "./Blog.css";
import PageMeta from "../PageMeta/PageMeta";
import postsData from "../../generated/blog-posts.json";
import { playScroll, stopScroll } from "../../lib/sound";

const { posts } = postsData;

marked.setOptions({ gfm: true, breaks: false });

function Blog() {
  const [open, setOpen] = useState(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const close = () => setOpen(null);
    const onKey = (event) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="blog">
      {/* PAGE HEADER */}
      <div className="blog__top">
        <PageMeta number="0.4" label="blog" />
      </div>

      {/* MAIN */}
      <div className="blog__main">
        {/* SECTION TITLE */}
        <div className="blog__heading">
          <h2>Log_of_learning</h2>

          <span className="blog__total">
            {String(posts.length).padStart(2, "0")} posts
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="blog__empty">
            <p>
              Rack is empty — add a post to{" "}
              <code>blog.config.json</code> and re-deploy.
            </p>
          </div>
        ) : (
          <ul className="blog__list">
            {posts.map((post, index) => (
              <li className="blog__post" key={post.slug}>
                <button
                  className="blog__post-open"
                  type="button"
                  onMouseEnter={playScroll}
                  onMouseLeave={stopScroll}
                  onClick={() => setOpen(post)}
                >
                  <span className="blog__post-number">
                    0.4.{String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="blog__post-title">{post.title}</span>
                  <span className="blog__post-read">read →</span>
                </button>

                <div className="blog__post-meta">
                  <span className="blog__post-date">{post.date}</span>

                  <span className="blog__post-meta-sep" aria-hidden="true">
                    ·
                  </span>

                  <span className="blog__post-minutes">
                    {post.readingMinutes} min read
                  </span>

                  {post.repo && (
                    <>
                      <span className="blog__post-meta-sep" aria-hidden="true">
                        ·
                      </span>
                      <a
                        className="blog__post-repo"
                        href={post.repo}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        referrerPolicy="no-referrer"
                      >
                        repo ↗
                      </a>
                    </>
                  )}
                </div>

                <p className="blog__post-description">{post.description}</p>

                <div className="blog__post-tags">
                  {post.tags.map((tag) => (
                    <span className="blog__tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* READER OVERLAY */}
      {open && (
        <div
          className="blog__reader"
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
        >
          <div
            className="blog__reader-backdrop"
            onClick={() => setOpen(null)}
          />

          <div className="blog__reader-panel" role="document">
            <header className="blog__reader-head">
              <button
                ref={closeRef}
                className="blog__reader-close"
                type="button"
                onMouseEnter={playScroll}
                  onMouseLeave={stopScroll}
                onClick={() => setOpen(null)}
              >
                ← back
              </button>

              <span className="blog__reader-meta">
                {open.date} · {open.readingMinutes} min read
              </span>
            </header>

            <article className="blog__article">
              <h1>{open.title}</h1>

              <div
                className="blog__prose"
                dangerouslySetInnerHTML={{ __html: marked.parse(open.body) }}
              />
            </article>
          </div>
        </div>
      )}
    </section>
  );
}

export default Blog;