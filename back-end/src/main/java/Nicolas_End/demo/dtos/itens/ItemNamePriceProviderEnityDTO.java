package Nicolas_End.demo.dtos.itens;

import Nicolas_End.demo.domains.provider.ProviderEntity;

import java.util.Optional;

public record ItemNamePriceProviderEnityDTO (String name, double price, ProviderEntity providerEntity) {
}
