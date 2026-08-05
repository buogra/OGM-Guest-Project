package tr.gov.ogm.reservation.reservation.dto;
import tr.gov.ogm.reservation.reservation.ReservationStatus;
import jakarta.validation.constraints.NotNull;
public record ReservationStatusRequest(@NotNull ReservationStatus durum) { }
