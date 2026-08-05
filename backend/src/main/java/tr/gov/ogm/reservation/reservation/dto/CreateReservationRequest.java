package tr.gov.ogm.reservation.reservation.dto;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
public record CreateReservationRequest(@NotBlank String misafirAdi, @Min(1) @Max(100) int odaNo, @NotNull @FutureOrPresent LocalDate giris, @NotNull @Future LocalDate cikis) { }
