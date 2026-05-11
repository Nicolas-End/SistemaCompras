package Nicolas_End.demo.domains.staff;

import Nicolas_End.demo.dtos.staff.StaffDatasDTO;
import Nicolas_End.demo.dtos.staff.StaffEmailAndPasswordDTO;
import Nicolas_End.demo.infra.response.ApiResponse;
import Nicolas_End.demo.infra.response.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class StaffService {
    StaffRespository staffRespository;
    String path;


    public StaffService(StaffRespository staffRespository){
        this.path = "/staff";
        this.staffRespository = staffRespository;

    }

    public <T>ApiResponse<T> registerNewStaff(StaffDatasDTO datas ){

        try {
            // gera a Entidade para eu conseguir salvar seus dados
            StaffEntity staff = this.generateStaffEntity(datas);

            this.staffRespository.save(staff);


            return ResponseUtil.sucess(null, "Usuario Cadastrado com Sucesso", this.path);

        // caso ja haja cadastro voltara um erro ao cliente
        }catch (DataIntegrityViolationException e ){
            return  ResponseUtil.error("User already registered", "Usuario Já cadastrado no sistema", path, HttpStatus.CONFLICT);
        } catch (InternalError e) {
            return  ResponseUtil.error("Internal Server Error", "Erro Interno", path, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @Transactional
    public  <T>ApiResponse<T> staffLogin(StaffEmailAndPasswordDTO datas){

        try {
            StaffEntity staffEntity;
            return  ResponseUtil.error(null,null,null,HttpStatus.OK);

        }catch(Exception e){
            return  ResponseUtil.error("Error", "Erro Interno", path, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }




    private StaffEntity generateStaffEntity(StaffDatasDTO staffDatas){
        StaffEntity staff = new StaffEntity();

        staff.setEmail(staffDatas.email());
        staff.setName(staffDatas.name());
        staff.setRole(staffDatas.role());

        return  staff;
    }


}
