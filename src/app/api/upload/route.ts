import { sb } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { getEntriesFormData } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { clerkClient, auth } from "@clerk/nextjs";
import type { UserObjectCustomized } from "@/types";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const formData = await request.formData();
  const { file, name } = getEntriesFormData<{
    file: File;
    name: string;
  }>(formData);

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

    const user = (await clerkClient.users.getUser(
      userId,
    )) as UserObjectCustomized;

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        images: [
          ...user.privateMetadata.images,
          { path: data.path, type: file.type, size: file.size, id: nanoid() },
        ],
      },
    });

    /** Ingest data to vector store goes here. */

    revalidatePath("/file-manager");
    return NextResponse.json(
      { path: data.path },
      { status: 200, statusText: "OK" },
    );
  } catch (error) {
    if (error instanceof Error && error.name === "StorageError") {
      return NextResponse.json(
        { message: error.message },
        { status: 500, statusText: "Storage Error." },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500, statusText: "Internal Server Error." },
      );
    }

    return NextResponse.json(
      { message: (error as any).message ?? "Something went wrong" },
      {
        status: (error as any).statusCode ?? 500,
        statusText: "Internal Server Error.",
      },
    );
  }
}
