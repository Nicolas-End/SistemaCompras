package Nicolas_End.demo.dtos.itens;

import java.util.UUID;

public record ItensListDTO(UUID id, String internalCode, String name, double price, String createdAt, String providerName) {
}
