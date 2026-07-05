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
        this.key = builder.annexKey;
        this.name = builder.annexName;
    }

    public static class Builder{
        private final String url;
        private  AnnexTypes type = null;
        private String annexName = null;
        private final String annexKey;

        public Builder(String url, String annexKey){
            this.url = url;
            this.annexKey = annexKey;
        }
        public Builder type(AnnexTypes type){
            this.type = type;
            return this;
        }
        public Builder name(String fileName){
            this.annexName = fileName;
            return this;
        }
        public AnnexEntity build(){
            return new AnnexEntity(this);
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column
    private String name;

    @Column
    private String key;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnnexTypes annexType;

    @Column(nullable = false)
    private  String url;
}
