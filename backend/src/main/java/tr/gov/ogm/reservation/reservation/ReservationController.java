package tr.gov.ogm.reservation.reservation;
import tr.gov.ogm.reservation.common.api.ApiResponse;
import tr.gov.ogm.reservation.reservation.dto.*;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api")
public class ReservationController {
    private final ReservationService reservationService;
    public ReservationController(ReservationService reservationService) { this.reservationService = reservationService; }
    @PostMapping("/reservations") @PreAuthorize("hasRole('GUEST')") public ApiResponse<ReservationResponse> create(@Valid @RequestBody CreateReservationRequest request) { return ApiResponse.success("Reservation created.", reservationService.create(request)); }
    @GetMapping("/reservations/mine") @PreAuthorize("hasRole('GUEST')") public ApiResponse<List<ReservationResponse>> mine() { return ApiResponse.success("Reservations retrieved.", reservationService.mine()); }
    @GetMapping("/admin/reservations") @PreAuthorize("hasAnyRole('STAFF','ADMIN')") public ApiResponse<List<ReservationResponse>> all() { return ApiResponse.success("Reservations retrieved.", reservationService.all()); }
    @PostMapping("/admin/reservations") @PreAuthorize("hasAnyRole('STAFF','ADMIN')") public ApiResponse<ReservationResponse> createForStaff(@Valid @RequestBody AdminCreateReservationRequest request) { return ApiResponse.success("Reservation created.", reservationService.createForStaff(new CreateReservationRequest(request.misafirAdi(), request.odaNo(), request.giris(), request.cikis()), request.durum())); }
    @PatchMapping("/admin/reservations/{id}/status") @PreAuthorize("hasAnyRole('STAFF','ADMIN')") public ApiResponse<ReservationResponse> status(@PathVariable Long id, @Valid @RequestBody ReservationStatusRequest request) { return ApiResponse.success("Reservation status updated.", reservationService.changeStatus(id, request)); }
    @DeleteMapping("/admin/reservations/{id}") @PreAuthorize("hasAnyRole('STAFF','ADMIN')") public ApiResponse<Void> delete(@PathVariable Long id) { reservationService.delete(id); return ApiResponse.success("Reservation deleted.", null); }
}
