"use server";
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