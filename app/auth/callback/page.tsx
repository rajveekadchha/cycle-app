import { Suspense } from "react";
import CallbackClient from "./CallbackClient";

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-wine border-t-transparent animate-spin" />
        </main>
      }
    >
      <CallbackClient />
    </Suspense>
  );
}
