package Nicolas_End.demo.dtos.quotes;

import Nicolas_End.demo.domains.annex.AnnexEntity;


import java.util.Date;
import java.util.UUID;

public record QuoteBasicInfosDTO (UUID id, String requestFor, Date createdAt, int annexQuantity, int itemsQuantity) {



}
