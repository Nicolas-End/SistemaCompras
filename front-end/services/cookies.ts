"use server";

import { UserSys, UserRole } from "@/lib/types";
import { Chokokutai } from "next/font/google";
import { cookies } from "next/headers";

interface StaffCookiesInfos {
    staffName?: string;
    staffEmail?: string;
    staffRole?: UserRole;
    createdAt?:Date;
}

const VALID_ROLES = [
    "ADMINISTRADOR",
    "COMPRADOR",
    "VENDEDOR",
    "MOTORISTA"
] as const;

function isUserRole(
    role: string
): role is UserRole {

    return VALID_ROLES.includes(
        role as UserRole
    );
}

export async function getTokenFromCookies():
Promise<string | null> {

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    return token || null;
}

export async function setTokenFromCookies(
    token: string
): Promise<void> {

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
        httpOnly: true,
        secure: true
    });
}

export async function setStaffInfos(
    staffDatas: UserSys
): Promise<void> {

    const cookieStore = await cookies();

    cookieStore.set(
        "staffName",
        staffDatas.name || "",
        {
            httpOnly: true,
            secure: true
        }
    );

    cookieStore.set(
        "staffEmail",
        staffDatas.email || "",
        {
            httpOnly: true,
            secure: true
        }
    );

    cookieStore.set(
        "staffRole",
        staffDatas.role || "",
        {
            httpOnly: true,
            secure: true
        }
    );

    cookieStore.set(
        "staffCreatedAt",
        staffDatas.createdAt?.toISOString() || "",
        {
            httpOnly: true,
            secure: true
        }
    )
}

export async function getStaffInfosFromCookies():
Promise<StaffCookiesInfos> {

    const cookieStore = await cookies();

    const role =
        cookieStore.get("staffRole")?.value;

    return {

        staffName:
            cookieStore.get("staffName")?.value
            || undefined,

        staffEmail:
            cookieStore.get("staffEmail")?.value
            || undefined,

        staffRole:
            role && isUserRole(role)
                ? role
                : undefined
    };
}

export async function deleteAllUserCookies():
Promise<void> {

    const cookieStore = await cookies();

    cookieStore.delete("token");
    cookieStore.delete("staffRole")
    cookieStore.delete("staffName")
    cookieStore.delete("staffEmail")

}
