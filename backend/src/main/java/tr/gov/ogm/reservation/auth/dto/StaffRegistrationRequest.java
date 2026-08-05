package tr.gov.ogm.reservation.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record StaffRegistrationRequest(
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8, max = 72) String password,
        @NotBlank @Size(max = 100) String firstName,
        @NotBlank @Size(max = 100) String lastName,
        @NotBlank @Size(max = 30) String phone,
        @NotBlank @Pattern(regexp = "\\d{11}", message = "Identity number must contain exactly 11 digits.") String identityNumber,
        @NotBlank @Size(max = 64) String registryNumber) { }
