package Nicolas_End.demo.domains.orders;

import Nicolas_End.demo.domains.quote.QuoteEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

public class OrderEntity {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO)
    private UUID id;

    @Column
    private LocalDateTime createdAt;

    @OneToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name="quote_id", referencedColumnName = "id")
    private QuoteEntity quoteId;

    @PrePersist
    private void PrePersist(){
        this.createdAt = LocalDateTime.now();
    }


}
