package tr.gov.ogm.reservation.admin;

import tr.gov.ogm.reservation.admin.dto.CreateUserRequest;
import tr.gov.ogm.reservation.admin.dto.UpdateUserRequest;
import tr.gov.ogm.reservation.admin.dto.UserResponse;
import tr.gov.ogm.reservation.common.exception.BusinessException;
import tr.gov.ogm.reservation.user.User;
import tr.gov.ogm.reservation.user.UserRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public AdminUserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository; this.passwordEncoder = passwordEncoder;
    }
    @Transactional(readOnly = true)
    public List<UserResponse> findAll() { return userRepository.findAll().stream().filter(user -> !user.isDelete()).map(UserResponse::from).toList(); }
    public UserResponse create(CreateUserRequest request) {
        validateUnique(request.email(), request.identityNumber(), request.registryNumber(), null);
        User user = User.register(request.email().trim().toLowerCase(), passwordEncoder.encode(request.password()),
                request.firstName().trim(), request.lastName().trim(), request.phone().trim(), request.identityNumber().trim(),
                blankToNull(request.registryNumber()), request.role());
        return UserResponse.from(userRepository.save(user));
    }
    public UserResponse update(Long id, UpdateUserRequest request) {
        User user = activeUser(id);
        validateUnique(user.getEmail(), request.identityNumber(), request.registryNumber(), id);
        user.updateProfile(request.firstName().trim(), request.lastName().trim(), request.phone().trim(), request.identityNumber().trim(),
                blankToNull(request.registryNumber()), request.role());
        if (request.password() != null && !request.password().isBlank()) user.changePassword(passwordEncoder.encode(request.password()));
        return UserResponse.from(user);
    }
    public void delete(Long id) { activeUser(id).softDelete(); }
    public UserResponse toggleActive(Long id) { User user = activeUser(id); user.toggleActive(); return UserResponse.from(user); }
    private User activeUser(Long id) { return userRepository.findById(id).filter(user -> !user.isDelete())
            .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "User not found.")); }
    private void validateUnique(String email, String identityNumber, String registryNumber, Long currentId) {
        boolean duplicate = userRepository.findByEmailAndIsDeleteFalse(email.trim().toLowerCase()).filter(user -> !user.getId().equals(currentId)).isPresent()
                || userRepository.findByIdentityNumber(identityNumber.trim()).filter(user -> !user.getId().equals(currentId)).isPresent()
                || (blankToNull(registryNumber) != null && userRepository.findByRegistryNumber(blankToNull(registryNumber)).filter(user -> !user.getId().equals(currentId)).isPresent());
        if (duplicate) throw new BusinessException(HttpStatus.CONFLICT, "USER_ALREADY_EXISTS", "A user with those details already exists.");
    }
    private String blankToNull(String value) { return value == null || value.isBlank() ? null : value.trim(); }
}
