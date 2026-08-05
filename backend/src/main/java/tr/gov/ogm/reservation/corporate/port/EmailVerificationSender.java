package tr.gov.ogm.reservation.corporate.port;
public interface EmailVerificationSender { void sendCode(String email, String code); }
