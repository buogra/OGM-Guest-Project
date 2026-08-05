package tr.gov.ogm.reservation.admin.dto;

import tr.gov.ogm.reservation.user.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateUserRequest(@NotBlank String firstName, @NotBlank String lastName, @NotBlank String phone,
                                @NotBlank String identityNumber, String registryNumber, @NotNull Role role,
                                String password) { }
