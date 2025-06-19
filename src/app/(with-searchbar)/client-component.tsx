"use client";

import { ReactNode } from "react";

export default function ClientComponent({ children }: { children: ReactNode }) {
  console.log("클라이언트 컴포넌트임");
  // 서버 컴포넌트를 클라이언트 컴포넌트로 에서 import하여 사용하면, next 가 자동으로 클라이언트 컴포넌트로 변환시킴.
  // 클라이언트 컴포넌트의 자식으로 서버 컴포넌트 두는건 피하자!!!!!
  // <ServerComponent/>

  // 굳이 쓰려면 서버 컴포넌트를 children으로 불러오는 방식으로 실행해야함!!
  return <>{children}</>;
}
