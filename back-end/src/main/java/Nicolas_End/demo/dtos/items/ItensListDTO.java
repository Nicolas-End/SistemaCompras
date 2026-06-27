package Nicolas_End.demo.dtos.items;

import java.util.Date;
import java.util.UUID;

public record ItensListDTO(UUID id, String internalCode, String name, double price, Date createdAt, String providerName) {


}
