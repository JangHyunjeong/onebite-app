import { notFound } from "next/navigation";
import style from "./page.module.css";

// 정의되지 않은 param은 404 처리
// export const dynamicParams = false;
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );

  if (!response.ok) {
    if (response.status === 404) notFound();
    return <>오류가 발생했습니다.</>;
  }

  const book = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

function ReviewEditor() {
  async function createReviewAction(formData: FormData) {
    "use server";
    // 이 함수는 server action으로 선언됨

    const content = formData.get("content")?.toString;
    const author = formData.get("author")?.toString;

    console.log(content, author);

    // 서버 액션 쓰는 이유?
    // 코드가 간단하다 - 함수 하나만으로 API 역할 수행!
    // 서버측에서만 실행되기 때문에 보안상 유용함.
  }

  return (
    <section>
      <form action={createReviewAction}>
        <input type="text" name="content" placeholder="리뷰 내용" />
        <input type="text" name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id = "" } = await params;
  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor />
    </div>
  );
}
