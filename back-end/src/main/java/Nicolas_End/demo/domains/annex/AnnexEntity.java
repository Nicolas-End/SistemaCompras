package Nicolas_End.demo.domains.annex;

import Nicolas_End.demo.enums.annex.AnnexTypes;
import Nicolas_End.demo.infra.util.model.BasicEntityModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "TB_ANNEX", schema = "compras")
@Getter
@Setter
@NoArgsConstructor
public class AnnexEntity extends BasicEntityModel {

    public AnnexEntity(Builder builder){
        this.annexType = builder.type;
        this.url = builder.url ;
    }

    public static class Builder{
        private final String url;
        private  AnnexTypes type = null;

        public Builder(String url){
            this.url = url;
        }
        public Builder type(AnnexTypes type){
            this.type = type;
            return this;
        }

        public AnnexEntity build(){
            return new AnnexEntity(this);
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnnexTypes annexType;

    @Column(nullable = false)
    private  String url;
}
