import { sb } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { getEntriesFormData } from "@/lib/utils";

export async function POST(request: Request) {
  const formData = await request.formData();
  const { file, name } = getEntriesFormData<{ file: File; name: string }>(
    formData,
  );
  try {
    const { data, error } = await sb.storage
      .from("any")
      .upload(`documentz/${name ?? file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    /** @todo add ingest process to vector store. */

    return NextResponse.json(
      { path: data.path },
      { status: 200, statusText: "OK" },
    );
  } catch (error) {
    if (error instanceof Error && error.name === "StorageError") {
      return NextResponse.json(
        { message: "Storage Error." },
        { status: 500, statusText: "Storage Error." },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500, statusText: "Internal Server Error." },
      );
    }

    return NextResponse.json(null, {
      status: 500,
      statusText: "Internal Server Error.",
    });
  }
}
