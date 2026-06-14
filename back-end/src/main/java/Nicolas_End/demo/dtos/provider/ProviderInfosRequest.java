package Nicolas_End.demo.dtos.provider;

import java.util.Optional;

public record ProviderInfosRequest(String cnpj, String name, Optional<String> telephone, Optional<String> address) {

}
