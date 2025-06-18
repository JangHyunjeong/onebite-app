import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>임시서치바</div>
      {children}
    </>
  );
}
