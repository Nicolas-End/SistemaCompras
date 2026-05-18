package Nicolas_End.demo.domains.staff;

import Nicolas_End.demo.dtos.staff.StaffDatasDTO;
import Nicolas_End.demo.dtos.staff.StaffEmailAndPasswordDTO;
import Nicolas_End.demo.dtos.staff.StaffTokenDTO;
import Nicolas_End.demo.infra.response.ApiResponse;
import Nicolas_End.demo.infra.response.ResponseUtil;
import Nicolas_End.demo.infra.security.TokenService;
import jakarta.transaction.Transactional;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StaffService {
    StaffRepository staffRespository;
    TokenService tokenService;
    String path;


    public StaffService(StaffRepository staffRespository, TokenService tokenService){
        this.path = "/staff";
        this.tokenService = tokenService;
        this.staffRespository = staffRespository;

    }

    public <T>ApiResponse<T> registerNewStaff(StaffDatasDTO datas ){


            if(this.staffIsRegistered(datas.email())){
                return  ResponseUtil.error("User already registered", "Usuario Já cadastrado no sistema", path, HttpStatus.CONFLICT);
            }


            // gera a Entidade para eu conseguir salvar seus dados
            StaffEntity staff = this.createStaffEntity(datas);

            this.staffRespository.save(staff);


            return ResponseUtil.sucess(null, "Usuario Cadastrado com Sucesso", this.path,HttpStatus.CREATED);

        // caso ja haja cadastro voltara um erro ao cliente


    }


    @Transactional
    public  <T>ApiResponse<T> validateStaffLogin(StaffEmailAndPasswordDTO datas){


            StaffEntity staffEntity = this.getEspecificStaffByEmailAndValidateCredentials(datas);
            if (staffEntity == null){
                return  ResponseUtil.error("User Not Found","Usuario não encontrado",path,HttpStatus.NOT_FOUND);
            }

            List<T> responsDatas = new java.util.ArrayList<>(List.of());

            StaffTokenDTO userToken = this.setStaffTokenReturn(staffEntity);

            responsDatas.add((T) userToken);

            return ResponseUtil.sucess(responsDatas, "Usuario encontrado", path, HttpStatus.OK);



    }



    public <T> ApiResponse getAllStaff(){

            List<StaffDatasDTO> staffs = this.getAllStaffs();

            return ResponseUtil.sucess(staffs, "Usuario Encontrados", path, HttpStatus.OK);



    }


    // valida se o usuario existe e se as credenciais estão correta
    private StaffEntity getEspecificStaffByEmailAndValidateCredentials(StaffEmailAndPasswordDTO datas){
        StaffEntity staffEntity = staffRespository.findByEmail(datas.email());
        boolean staffCredentials = this.validateStaffCredentials(staffEntity, datas.password());

        if (!staffCredentials){
            return  null;
        }
        return staffEntity;
    }


    private boolean validateStaffCredentials(StaffEntity staffEntity, String staffPasswordInput ){

        if(staffEntity == null){
            return false;
        }

        return this.validateStaffPassword(staffPasswordInput, staffEntity.getPassword());
    }

    private boolean validateStaffPassword(String staffPasswordInput, String staffPasswordEncode){
        return new BCryptPasswordEncoder().matches(staffPasswordInput, staffPasswordEncode);
    }


    private StaffEntity createStaffEntity(StaffDatasDTO staffDatas){
        return StaffEntity.createStaff(
                staffDatas.email(),
                staffDatas.name(),
                staffDatas.role()
        );

    }


    private StaffTokenDTO setStaffTokenReturn(StaffEntity staffEntity){

        return new StaffTokenDTO(this.tokenService.generateToken(staffEntity));
    }


    private boolean staffIsRegistered(String email){
        return this.staffRespository.findByEmail(email) != null;

    }


    private List<StaffDatasDTO> getAllStaffs(){
        return this.staffRespository.findAllBy();
    }

}
