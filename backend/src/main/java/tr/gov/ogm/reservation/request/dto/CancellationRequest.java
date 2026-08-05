package tr.gov.ogm.reservation.request.dto;
import jakarta.validation.constraints.NotNull;
public record CancellationRequest(@NotNull Long reservationId, String notlar) { }
