import { Suspense } from "react";

import { createClient } from "@/shared/lib/supabase/server";

async function TestPageData() {
  const supabase = await createClient();
  const { data: test, error } = await supabase.from("test").select();

  console.log(test);
  console.log("error : ", error);
  if (error) {
    return <div>데이터를 불러오는 중 에러가 발생했습니다: {error.message}</div>;
  }

  return <pre>{JSON.stringify(test, null, 2)}</pre>;
}

export default function TestPage() {
  return (
    <Suspense fallback={<div>Loading instruments...</div>}>
      <TestPageData />
    </Suspense>
  );
}
