import BookItem from "@/components/book-item";
import { BookData } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  // 한번 검색이 된 결과에 대해서는 캐싱되도록 설정
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) return <>오류가 발생했습니다.</>;
  const books: BookData[] = await response.json();
  if (books.length < 1) return <>검색 결과가 없습니다.</>;
  else
    return (
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    );
}
