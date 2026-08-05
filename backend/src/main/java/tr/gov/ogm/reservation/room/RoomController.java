package tr.gov.ogm.reservation.room;
import tr.gov.ogm.reservation.common.api.ApiResponse;
import tr.gov.ogm.reservation.room.dto.*;
import jakarta.validation.Valid;
import java.util.List;
import java.time.LocalDate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api")
public class RoomController {
    private final RoomService roomService;
    public RoomController(RoomService roomService) { this.roomService = roomService; }
    @GetMapping("/rooms") public ApiResponse<List<RoomResponse>> publicRooms(@RequestParam(required = false) LocalDate checkIn, @RequestParam(required = false) LocalDate checkOut) { return ApiResponse.success("Rooms retrieved.", roomService.findAvailable(checkIn, checkOut)); }
    @GetMapping("/admin/rooms") @PreAuthorize("hasAnyRole('STAFF','ADMIN')") public ApiResponse<List<RoomResponse>> adminRooms() { return ApiResponse.success("Rooms retrieved.", roomService.findAll()); }
    @PostMapping("/admin/rooms") @PreAuthorize("hasAnyRole('STAFF','ADMIN')") public ApiResponse<RoomResponse> create(@Valid @RequestBody RoomRequest request) { return ApiResponse.success("Room created.", roomService.create(request)); }
    @PutMapping("/admin/rooms/{roomNumber}") @PreAuthorize("hasAnyRole('STAFF','ADMIN')") public ApiResponse<RoomResponse> update(@PathVariable int roomNumber, @Valid @RequestBody RoomUpdateRequest request) { return ApiResponse.success("Room updated.", roomService.update(roomNumber, request)); }
    @PatchMapping("/admin/rooms/{roomNumber}/status") @PreAuthorize("hasAnyRole('STAFF','ADMIN')") public ApiResponse<RoomResponse> status(@PathVariable int roomNumber, @RequestBody RoomStatusRequest request) { return ApiResponse.success("Room status updated.", roomService.updateManualStatus(roomNumber, request)); }
}
