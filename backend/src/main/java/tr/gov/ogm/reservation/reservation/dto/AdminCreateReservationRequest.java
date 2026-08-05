package tr.gov.ogm.reservation.reservation.dto;

import tr.gov.ogm.reservation.reservation.ReservationStatus;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
public record AdminCreateReservationRequest(@NotBlank String misafirAdi, @Min(1) @Max(100) int odaNo,
                                            @NotNull LocalDate giris, @NotNull LocalDate cikis,
                                            @NotNull ReservationStatus durum) { }
