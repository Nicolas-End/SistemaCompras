package Nicolas_End.demo.domains.provider;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_PROVIDER")


@Getter
@Setter
public class ProviderEntity {

    @Id
    @Column(length = 14)
    private String cnpj;

    @Column(nullable = false)
    private String name;

    @Column (length = 11 )
    private String telephone;

    @Column
    private  String adrress;

}
