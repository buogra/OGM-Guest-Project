package tr.gov.ogm.reservation.user;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailAndIsDeleteFalse(String email);
    Optional<User> findByIdentityNumber(String identityNumber);
    Optional<User> findByRegistryNumber(String registryNumber);
    boolean existsByEmail(String email);
    boolean existsByIdentityNumber(String identityNumber);
    boolean existsByRegistryNumber(String registryNumber);
}
