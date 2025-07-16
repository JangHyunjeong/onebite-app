import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review-action";

export function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section className={style.form_container}>
      <form action={createReviewAction}>
        <input type="hidden" name="bookId" value={bookId} required readOnly />
        <textarea name="content" placeholder="리뷰 내용" required />

        <div className={style.submit_container}>
          <input type="text" name="author" placeholder="작성자" required />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}
