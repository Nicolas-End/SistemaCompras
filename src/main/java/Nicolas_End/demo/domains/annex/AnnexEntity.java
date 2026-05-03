package Nicolas_End.demo.domains.annex;

import Nicolas_End.demo.enums.annex.AnnexTypes;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "TB_ANNEX", schema = "compras")
@Getter
@Setter
public class AnnexEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnnexTypes annexType;

    @Column(nullable = false)
    private  String url;
}
