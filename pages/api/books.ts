import type { NextApiRequest, NextApiResponse } from "next";
import Parser from "rss-parser";

type Book = {
  title: string;
  author: string;
  link: string;
  cover: string;
  rating: string;
  dateRead: string;
};

const parser = new Parser({
  customFields: {
    item: [
      "author_name",
      "book_image_url",
      "user_rating",
      "read_at",
      "user_shelves",
      "book_id",
    ],
  },
});

// Strip Goodreads size suffix (e.g. ._SY75_, ._SX100_) to get the full image
function fullCoverUrl(url: string): string {
  return url.replace(/\._[A-Z]{2}\d+_/, "");
}

const FEED_URL =
  "https://www.goodreads.com/review/list_rss/167635284?shelf=read&sort=date_read&per_page=20";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Book[] | { error: string }>
) {
  try {
    const feed = await parser.parseURL(FEED_URL);

    const books: Book[] = feed.items.map((item: any) => ({
      title: item.title ?? "",
      author: item.author_name ?? "",
      link: item.book_id ? `https://www.goodreads.com/book/show/${item.book_id}` : (item.link ?? ""),
      cover: item.book_image_url ? fullCoverUrl(item.book_image_url) : "",
      rating: item.user_rating ?? "",
      dateRead: item.read_at ?? item.pubDate ?? "",
    }));

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json(books);
  } catch {
    res.status(500).json({ error: "Failed to fetch books" });
  }
}
