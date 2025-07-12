import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Suspense 컴포넌트로 감싸주면, 해당 컴포넌트는 사전 렌더 되지 않는다. 
      (서버측에서 실행시 오류가 발생하는 useSearchParams 사용하고 있어 클아이언트에서만 실행) */}
      <Suspense fallback={<div>Loading ...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
