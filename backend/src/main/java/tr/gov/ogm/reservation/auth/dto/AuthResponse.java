package tr.gov.ogm.reservation.auth.dto;

import tr.gov.ogm.reservation.user.Role;

public record AuthResponse(String token, Role role) { }
