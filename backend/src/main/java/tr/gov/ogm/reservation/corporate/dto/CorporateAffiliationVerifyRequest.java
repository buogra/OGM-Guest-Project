package tr.gov.ogm.reservation.corporate.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
public record CorporateAffiliationVerifyRequest(@NotBlank String ldapUsername, @NotBlank @Pattern(regexp = "\\d{4}") String code) { }
