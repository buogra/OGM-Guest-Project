package tr.gov.ogm.reservation.admin.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import tr.gov.ogm.reservation.user.Role;
import tr.gov.ogm.reservation.user.User;

public record UserResponse(Long id, @JsonProperty("tcSicilNo") String tcSicilNo,
                           @JsonProperty("adSoyad") String adSoyad, @JsonProperty("eposta") String eposta,
                           @JsonProperty("rol") Role rol, @JsonProperty("aktif") boolean aktif) {
    public static UserResponse from(User user) {
        String identifier = user.getRegistryNumber() == null ? user.getIdentityNumber() : user.getRegistryNumber();
        return new UserResponse(user.getId(), identifier, user.getFirstName() + " " + user.getLastName(),
                user.getEmail(), user.getRole(), user.isActive());
    }
}
