package tr.gov.ogm.reservation.reservation;
import tr.gov.ogm.reservation.room.Room;
import tr.gov.ogm.reservation.user.User;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserAndIsDeleteFalseOrderByCheckInDateDesc(User user);
    long countByReservationNumberStartingWith(String prefix);
    @Query("select count(r) > 0 from Reservation r where r.room = :room and r.isDelete = false and r.status <> tr.gov.ogm.reservation.reservation.ReservationStatus.IPTAL and r.status <> tr.gov.ogm.reservation.reservation.ReservationStatus.CHECK_OUT and r.checkInDate < :checkOut and r.checkOutDate > :checkIn")
    boolean hasOverlappingReservation(Room room, LocalDate checkIn, LocalDate checkOut);
    @Query("select r from Reservation r where r.room = :room and r.isDelete = false and r.status = :status")
    List<Reservation> findActiveByRoomAndStatus(Room room, ReservationStatus status);
}
