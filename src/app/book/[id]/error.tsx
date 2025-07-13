"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

// 서버 & 클라이언트 어떤 환경에서 에러가 발생해도 오류를 대응할 수 있도록 use client 사용

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>

      {/* 1. reset은 서버컴포넌트는 다시 실행해주지 않음 */}
      <button onClick={() => reset()}>다시시도 (reset)</button>
      <br />

      {/* 2. 강제 새로고침 -> 캐싱된 데이터 다 없어짐 */}
      <button onClick={() => window.location.reload()}>
        다시 시도 (window.location.reload())
      </button>
      <br />

      {/* 3. startTransition() + router.refresh() + reset()*/}
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트들을 다시 불러옴
            reset(); // 에러 상태를 초기화, 컴포넌트 다시 렌더링
          }); // 실행 순서 보장을 위해 감쌈
        }}
      >
        다시시도 (router.refresh() + reset())
      </button>
    </div>
  );
}
