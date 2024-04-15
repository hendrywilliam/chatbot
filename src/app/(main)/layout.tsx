import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-screen w-full flex-col overflow-y-hidden">
      {children}
    </main>
  );
}
