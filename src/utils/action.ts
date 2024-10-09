"use server";
import { auth, signIn } from "@/auth";
import { sendRequest } from "./api";
import { revalidateTag } from "next/cache";

export async function authenticate(username: string, password: string) {
  try {
    const r = await signIn("credentials", {
      username: username,
      password: password,
      //   callbackUrl: "/",
      redirect: false,
    });
    return r;
  } catch (error) {
    if ((error as any).name === "InvalidEmailPasswordError") {
      return { error: (error as any).type, code: 1 };
    } else if ((error as any).name === "InActiveAccountError") {
      return { error: (error as any).type, code: 2 };
    } else {
      return { error: "Internal server error", code: 0 };
    }
    // if (error.cause.err instanceof InvalidLoginError) {
    // } else {
    //   throw new Error("Failed to authenticate");
    // }
  }
}

export const handleCreateUserAction = async (data: any) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
    headers: { Authorization: `Bearer ${session?.user?.access_token}` },
    body: { ...data },
  });
  revalidateTag("list-users");
  return res;
};

export const handleUpdateUserAction = async (data: any) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: { ...data },
  });
  revalidateTag("list-users");
  return res;
};

export const handleDeleteUserAction = async (id: any) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    method: "DELETE",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${id}`,
    headers: { Authorization: `Bearer ${session?.user?.access_token}` },
  });
  revalidateTag("list-users");
  return res;
};
