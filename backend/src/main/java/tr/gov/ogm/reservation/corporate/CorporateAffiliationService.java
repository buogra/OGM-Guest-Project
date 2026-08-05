package tr.gov.ogm.reservation.corporate;
import tr.gov.ogm.reservation.common.exception.BusinessException;
import tr.gov.ogm.reservation.corporate.dto.*;
import tr.gov.ogm.reservation.corporate.port.EmailVerificationSender;
import tr.gov.ogm.reservation.corporate.port.LdapLookupPort;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service @Transactional
public class CorporateAffiliationService {
    private final CorporateAffiliationVerificationRepository repository; private final LdapLookupPort ldapLookup; private final EmailVerificationSender emailSender; private final SecureRandom random = new SecureRandom();
    public CorporateAffiliationService(CorporateAffiliationVerificationRepository repository, LdapLookupPort ldapLookup, EmailVerificationSender emailSender) { this.repository = repository; this.ldapLookup = ldapLookup; this.emailSender = emailSender; }
    public void request(CorporateAffiliationRequest request) {
        if (!ldapLookup.emailMatches(request.ldapUsername().trim(), request.email().trim())) throw new BusinessException(HttpStatus.BAD_REQUEST, "LDAP_MATCH_FAILED", "Corporate affiliation could not be verified.");
        String code = String.format("%04d", random.nextInt(10_000));
        repository.save(CorporateAffiliationVerification.request(request.ldapUsername().trim(), request.email().trim().toLowerCase(), code));
        emailSender.sendCode(request.email().trim(), code);
    }
    public VerificationResponse verify(CorporateAffiliationVerifyRequest request) {
        CorporateAffiliationVerification verification = repository.findTopByLdapUsernameAndGeneratedCodeAndVerifiedFalseAndExpiresAtAfterOrderByRequestedAtDesc(request.ldapUsername().trim(), request.code(), LocalDateTime.now())
                .orElseThrow(() -> new BusinessException(HttpStatus.BAD_REQUEST, "INVALID_VERIFICATION_CODE", "Verification code is invalid or expired."));
        String token = UUID.randomUUID().toString();
        verification.verify(token);
        // TODO: UI/UX must confirm the transport and lifetime of this reference in the booking flow.
        return new VerificationResponse(token);
    }
}
