package tr.gov.ogm.reservation.corporate;
import tr.gov.ogm.reservation.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
@Getter @Entity @Table(name = "corporate_affiliation_verifications")
public class CorporateAffiliationVerification extends BaseEntity {
    @Column(nullable = false, length = 100) private String ldapUsername;
    @Column(nullable = false, length = 255) private String email;
    @Column(nullable = false, length = 4) private String generatedCode;
    @Column(nullable = false) private LocalDateTime expiresAt;
    @Column(nullable = false) private boolean verified;
    @Column(nullable = false) private LocalDateTime requestedAt;
    @Column(length = 36) private String verificationToken;
    protected CorporateAffiliationVerification() { }
    private CorporateAffiliationVerification(String ldapUsername, String email, String code) { this.ldapUsername = ldapUsername; this.email = email; this.generatedCode = code; this.requestedAt = LocalDateTime.now(); this.expiresAt = requestedAt.plusMinutes(10); this.verified = false; }
    public static CorporateAffiliationVerification request(String ldapUsername, String email, String code) { return new CorporateAffiliationVerification(ldapUsername, email, code); }
    public void verify(String verificationToken) { this.verified = true; this.verificationToken = verificationToken; }
}
