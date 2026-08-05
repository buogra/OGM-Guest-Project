package tr.gov.ogm.reservation.auth;

import tr.gov.ogm.reservation.auth.dto.AuthResponse;
import tr.gov.ogm.reservation.auth.dto.GuestRegistrationRequest;
import tr.gov.ogm.reservation.auth.dto.LoginRequest;
import tr.gov.ogm.reservation.auth.dto.StaffRegistrationRequest;
import tr.gov.ogm.reservation.common.exception.BusinessException;
import tr.gov.ogm.reservation.security.JwtService;
import tr.gov.ogm.reservation.user.Role;
import tr.gov.ogm.reservation.user.User;
import tr.gov.ogm.reservation.user.UserRepository;
import java.util.Locale;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository; this.passwordEncoder = passwordEncoder; this.jwtService = jwtService;
    }
    public AuthResponse registerGuest(GuestRegistrationRequest request) {
        return register(request.email(), request.password(), request.firstName(), request.lastName(), request.phone(),
                request.identityNumber(), null, Role.GUEST);
    }
    public AuthResponse registerStaff(StaffRegistrationRequest request) {
        return register(request.email(), request.password(), request.firstName(), request.lastName(), request.phone(),
                request.identityNumber(), request.registryNumber(), Role.STAFF);
    }
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmailAndIsDeleteFalse(normalizeEmail(request.email()))
                .filter(found -> found.isActive() && passwordEncoder.matches(request.password(), found.getPasswordHash()))
                .orElseThrow(() -> new BusinessException(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS", "Invalid email or password."));
        return tokenFor(user);
    }
    private AuthResponse register(String email, String password, String firstName, String lastName, String phone,
                                  String identityNumber, String registryNumber, Role role) {
        String normalizedEmail = normalizeEmail(email);
        ensureUnique(normalizedEmail, identityNumber, registryNumber, null);
        User user = User.register(normalizedEmail, passwordEncoder.encode(password), firstName.trim(), lastName.trim(),
                phone.trim(), identityNumber.trim(), normalizeNullable(registryNumber), role);
        return tokenFor(userRepository.save(user));
    }
    private AuthResponse tokenFor(User user) {
        return new AuthResponse(jwtService.generateToken(user.getEmail(), user.getRole().name()), user.getRole());
    }
    private String normalizeEmail(String email) { return email.trim().toLowerCase(Locale.ROOT); }
    private String normalizeNullable(String value) { return value == null || value.isBlank() ? null : value.trim(); }
    void ensureUnique(String email, String identityNumber, String registryNumber, Long excludingId) {
        boolean emailTaken = userRepository.findByEmailAndIsDeleteFalse(email).filter(user -> !user.getId().equals(excludingId)).isPresent();
        boolean identityTaken = userRepository.existsByIdentityNumber(identityNumber);
        boolean registryTaken = registryNumber != null && userRepository.existsByRegistryNumber(registryNumber);
        if (emailTaken || identityTaken || registryTaken) {
            throw new BusinessException(HttpStatus.CONFLICT, "USER_ALREADY_EXISTS", "A user with those details already exists.");
        }
    }
}
