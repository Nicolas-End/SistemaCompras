package Nicolas_End.demo.domains.staff;

import Nicolas_End.demo.dtos.staff.PostNewStaffDTO;
import Nicolas_End.demo.infra.response.ApiResponse;
import Nicolas_End.demo.infra.response.ResponseUtil;
import org.springframework.stereotype.Service;

@Service
public class StaffService {


    public <T>ApiResponse<T> registerNewStaff(PostNewStaffDTO datas)

    {
        try {
            return ResponseUtil.sucess(null, "Colaborador Cadastrado com sucesso", "POST /staff");

        } catch (Exception e) {
            return ResponseUtil.error(e, "Deu um erro ai Campeão", "POST /staff");
        }
    }
}
