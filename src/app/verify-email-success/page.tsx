import { Suspense } from "react";
import VerifyEmailSuccessClient from "./VerifyEmailSuccessClient";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center" }}>Loading...</div>}>
      <VerifyEmailSuccessClient />
    </Suspense>
  );
}
