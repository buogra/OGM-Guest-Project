package tr.gov.ogm.reservation.reservation.dto;
import tr.gov.ogm.reservation.reservation.Reservation;
import tr.gov.ogm.reservation.reservation.ReservationStatus;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
public record ReservationResponse(Long id, String rezNo, String misafirAdi, int odaNo, LocalDate giris, LocalDate cikis, long gece, ReservationStatus durum) {
    public static ReservationResponse from(Reservation reservation) { return new ReservationResponse(reservation.getId(), reservation.getReservationNumber(), reservation.getGuestName(), reservation.getRoom().getRoomNumber(), reservation.getCheckInDate(), reservation.getCheckOutDate(), ChronoUnit.DAYS.between(reservation.getCheckInDate(), reservation.getCheckOutDate()), reservation.getStatus()); }
}
