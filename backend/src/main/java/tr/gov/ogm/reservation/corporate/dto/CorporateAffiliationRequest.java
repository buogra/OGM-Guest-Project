package tr.gov.ogm.reservation.corporate.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
public record CorporateAffiliationRequest(@NotBlank String ldapUsername, @NotBlank @Email String email) { }
