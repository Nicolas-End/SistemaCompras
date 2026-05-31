package Nicolas_End.demo.dtos.itens;

import java.time.LocalDateTime;
import java.util.UUID;

public record ItensListDTO(UUID id, String name, double price, LocalDateTime createdAt) {
}
