package tr.gov.ogm.reservation.corporate;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CorporateAffiliationVerificationRepository extends JpaRepository<CorporateAffiliationVerification, Long> {
    Optional<CorporateAffiliationVerification> findTopByLdapUsernameAndGeneratedCodeAndVerifiedFalseAndExpiresAtAfterOrderByRequestedAtDesc(String ldapUsername, String generatedCode, LocalDateTime now);
}
