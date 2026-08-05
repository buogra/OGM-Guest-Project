package tr.gov.ogm.reservation.reservation;
import tr.gov.ogm.reservation.common.entity.BaseEntity;
import tr.gov.ogm.reservation.room.Room;
import tr.gov.ogm.reservation.user.User;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Getter;
@Getter @Entity @Table(name = "reservations")
public class Reservation extends BaseEntity {
    @Column(nullable = false, unique = true, length = 32) private String reservationNumber;
    @Column(nullable = false, length = 200) private String guestName;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "room_id", nullable = false) private Room room;
    @Column(nullable = false) private LocalDate checkInDate;
    @Column(nullable = false) private LocalDate checkOutDate;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 16) private ReservationStatus status;
    // TODO: Confirm whether unauthenticated reservations should be supported; current flow requires a GUEST account.
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id") private User user;
    protected Reservation() { }
    private Reservation(String number, String guestName, Room room, LocalDate checkIn, LocalDate checkOut, User user) { this.reservationNumber = number; this.guestName = guestName; this.room = room; this.checkInDate = checkIn; this.checkOutDate = checkOut; this.user = user; this.status = ReservationStatus.BEKLEMEDE; }
    public static Reservation create(String number, String guestName, Room room, LocalDate checkIn, LocalDate checkOut, User user) { return new Reservation(number, guestName, room, checkIn, checkOut, user); }
    public void changeStatus(ReservationStatus status) { this.status = status; }
}
