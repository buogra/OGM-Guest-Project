package tr.gov.ogm.reservation.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private final SecretKey signingKey;

    public JwtService(@Value("${app.jwt.secret}") String secret) {
        this.signingKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    public Claims parse(String token) {
        return Jwts.parser().verifyWith(signingKey).build().parseSignedClaims(token).getPayload();
    }

    public String generateToken(String email, String role) {
        Instant now = Instant.now();
        return Jwts.builder().subject(email).claim("role", role)
                .issuedAt(Date.from(now)).expiration(Date.from(now.plus(8, ChronoUnit.HOURS)))
                .signWith(signingKey).compact();
    }

    public String subject(String token) { return parse(token).getSubject(); }
    public String role(String token) { return parse(token).get("role", String.class); }
    public boolean isValid(String token) { return parse(token).getExpiration().after(new Date()); }
}
