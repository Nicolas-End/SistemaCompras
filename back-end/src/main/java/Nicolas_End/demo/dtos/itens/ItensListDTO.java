package Nicolas_End.demo.dtos.itens;

import Nicolas_End.demo.infra.util.clock.DateUtil;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

public record ItensListDTO(UUID id, String internalCode, String name, double price,

                           Date createdAt, String providerName) {


}
