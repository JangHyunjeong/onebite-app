"use server";
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
  } catch (error) {
    console.error("error", error);
    return;
  }
}
