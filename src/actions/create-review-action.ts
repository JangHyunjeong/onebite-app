"use server";

import { revalidatePath, revalidateTag } from "next/cache";

// 이 함수는 server action으로 선언됨

export async function createReviewAction(formData: FormData) {
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  const bookId = formData.get("bookId")?.toString();

  if (!content || !author) return;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );

    // 해당 path에 해당하는 페이지를 서버에서 다시 검증후 렌더
    // 서버측에서만 작동하는 함수이므로, 클라이언트에서 이 함수를 호출 할 수 없음
    // 특정 페이지를 전부 재검증, 재생성 하기에 페이지의 모든 캐시 무효화 -> 페이지 캐시 옵션 무효됨
    // + 풀라우트 캐시도 삭제함 / 업데이트된 정보를 반영하진 않음

    // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);

    // 2. 특정 경로의 모든 동적 페이지 재검증 (폴더경로, page)
    // revalidatePath(`/book/[id]`, "page");

    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증 (레이아웃경로, layout)
    // revalidatePath(`/(with-searchbar)`, "layout");

    // 4. 모든 데이터 재검증 (루트레이아웃경로, layout )
    // revalidatePath('/', 'layout')

    // 5. 태그값을 기준으로 데이터 캐시 재검증
    revalidateTag(`review=${bookId}`);
    // const res = await fetch(url, {next: {tags: [`review=${bookId}`]}});
  } catch (error) {
    console.error("error", error);
    return;
  }
}
