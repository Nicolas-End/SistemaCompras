import { ApiResponse, LoginDatas, UserRole } from "@/lib/types";
import { api } from "@/services/api";
import { setTokenFromCookies, setStaffInfos } from "@/services/cookies";

type LoginResponse = ApiResponse & {
    datas: {    
        token: string | null;
        email: string | null;
        name: string | null;
        role: UserRole | null;
    }
}


export const getStaffLogin = async (datas: LoginDatas): Promise<boolean> => {
    try {
        const staffDatas = await api.post<LoginResponse>("/staff/login", datas);

        if (!staffDatas.sucess || staffDatas.datas.token === null) {
            if (staffDatas.status === "404 NOT_FOUND") {
                return false;
            }
            console.error("Login falhou:", staffDatas.message);
            return false;
        }

        // Salva o token nos cookies
        await setTokenFromCookies(staffDatas.datas.token);

        // Salva as informacoes do usuario nos cookies
        await setStaffInfos({
            name: staffDatas.datas.name || undefined,
            email: staffDatas.datas.email || undefined,
            role: staffDatas.datas.role || undefined,
        });

        return true; 

    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return false;
    }
}
