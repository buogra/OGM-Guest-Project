package tr.gov.ogm.reservation.room.dto;
import tr.gov.ogm.reservation.room.Floor;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
public record RoomRequest(@Min(1) @Max(100) int no, @NotNull Floor kat, @NotBlank String tip, @Min(1) int kapasite) { }
