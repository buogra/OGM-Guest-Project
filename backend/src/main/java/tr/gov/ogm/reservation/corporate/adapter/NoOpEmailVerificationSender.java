package tr.gov.ogm.reservation.corporate.adapter;
import tr.gov.ogm.reservation.corporate.port.EmailVerificationSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
@Component
public class NoOpEmailVerificationSender implements EmailVerificationSender {
    private static final Logger log = LoggerFactory.getLogger(NoOpEmailVerificationSender.class);
    // TODO: Replace with an SMTP/provider implementation; this is intentionally non-delivering for development.
    @Override public void sendCode(String email, String code) { log.info("Development verification code generated for {}: {}", email, code); }
}
