package Nicolas_End.demo.domains.itens;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "itens")
@Getter
@Setter
public class ItensEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @Column
    private double price;
}
