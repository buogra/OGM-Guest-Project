package tr.gov.ogm.reservation.room;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByRoomNumberAndIsDeleteFalse(int roomNumber);
    boolean existsByRoomNumber(int roomNumber);
}
