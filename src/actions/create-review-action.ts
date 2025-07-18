"use server";

import { revalidatePath } from "next/cache";

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
    revalidatePath(`/book/${bookId}`);
    // 해당 path에 해당하는 페이지를 서버에서 다시 검증후 렌더
    // 서버측에서만 작동하는 함수이므로, 클라이언트에서 이 함수를 호출 할 수 없음
    // 특정 페이지를 전부 재검증, 재생성 하기에 페이지의 모든 캐시 무효화 -> 페이지 캐시 옵션 무효됨
    // + 풀라우트 캐시도 삭제함 / 업데이트된 정보를 반영하진 않음
  } catch (error) {
    console.error("error", error);
    return;
  }
}
