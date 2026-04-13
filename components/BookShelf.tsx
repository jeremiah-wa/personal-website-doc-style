import { useEffect, useState } from "react";

type Book = {
  title: string;
  author: string;
  link: string;
  cover: string;
  rating: string;
  dateRead: string;
};

function StarRating({ rating }: { rating: string }) {
  const n = parseInt(rating, 10);
  if (!n) return null;
  return (
    <div style={{ color: "#c8973a", fontSize: "11px", marginTop: "4px" }}>
      {"★".repeat(n)}{"☆".repeat(5 - n)}
    </div>
  );
}

export default function BookShelf() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/books")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) throw new Error();
        setBooks(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "40px 0", color: "#888", fontSize: "14px" }}>
        Loading books…
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px 0", color: "#888", fontSize: "14px" }}>
        Sorry, we couldn't load books right now.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
        gap: "20px",
        paddingTop: "16px",
      }}
    >
      {books.map((book) => (
        <a
          key={book.link}
          href={book.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {book.cover ? (
              <img
                src={book.cover}
                alt={book.title}
                style={{
                  width: "100%",
                  aspectRatio: "2/3",
                  objectFit: "cover",
                  borderRadius: "3px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  aspectRatio: "2/3",
                  background: "#f0f0f0",
                  borderRadius: "3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  color: "#aaa",
                  textAlign: "center",
                  padding: "8px",
                }}
              >
                {book.title}
              </div>
            )}
            <div
              style={{
                marginTop: "6px",
                fontSize: "11px",
                fontWeight: 600,
                lineHeight: 1.3,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {book.title}
            </div>
            <div style={{ fontSize: "10px", color: "#888", marginTop: "2px" }}>
              {book.author}
            </div>
            <StarRating rating={book.rating} />
          </div>
        </a>
      ))}
    </div>
  );
}
