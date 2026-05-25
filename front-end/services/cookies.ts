"use server";
import { User } from "@/lib/types";
import { cookies } from "next/headers";

export async function getTokenFromCookies():Promise<String | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    return token || null;
}

export async function setTokenFromCookies(token: string):Promise<void> {
    const cookieStore = await cookies(); 
    cookieStore.set("token", token,{ httpOnly: true, secure: true});
    return ; 
    
}

export async function setStaffInfos(staffDatas: User):Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set("staffName", staffDatas.name || "",{ httpOnly: true, secure: true});
    cookieStore.set("staffEmail", staffDatas.email || "",{ httpOnly: true, secure: true});
    cookieStore.set("staffRole", staffDatas.role || "",{ httpOnly: true, secure: true});
    return;
}



export async function deleteTokenFromCookies():Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return; 
}