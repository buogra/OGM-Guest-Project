package tr.gov.ogm.reservation.user;

import tr.gov.ogm.reservation.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;

@Getter
@Entity
@Table(name = "app_users")
public class User extends BaseEntity {
    @Column(nullable = false, unique = true, length = 255)
    private String email;
    @Column(nullable = false, length = 100)
    private String passwordHash;
    @Column(nullable = false, length = 100)
    private String firstName;
    @Column(nullable = false, length = 100)
    private String lastName;
    @Column(nullable = false, length = 30)
    private String phone;
    @Column(nullable = false, unique = true, length = 32)
    private String identityNumber;
    @Column(unique = true, length = 64)
    private String registryNumber;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private Role role;
    @Column(nullable = false)
    private boolean active;

    protected User() { }

    private User(String email, String passwordHash, String firstName, String lastName, String phone,
                 String identityNumber, String registryNumber, Role role) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.identityNumber = identityNumber;
        this.registryNumber = registryNumber;
        this.role = role;
        this.active = true;
    }

    public static User register(String email, String passwordHash, String firstName, String lastName, String phone,
                                String identityNumber, String registryNumber, Role role) {
        return new User(email, passwordHash, firstName, lastName, phone, identityNumber, registryNumber, role);
    }

    public void updateProfile(String firstName, String lastName, String phone, String identityNumber,
                              String registryNumber, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.identityNumber = identityNumber;
        this.registryNumber = registryNumber;
        this.role = role;
    }
    public void changePassword(String passwordHash) { this.passwordHash = passwordHash; }
    public void activate() { this.active = true; }
    public void deactivate() { this.active = false; }
    public void toggleActive() { this.active = !this.active; }
}
