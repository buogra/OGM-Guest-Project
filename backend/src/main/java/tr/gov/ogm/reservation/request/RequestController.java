package tr.gov.ogm.reservation.request;
import tr.gov.ogm.reservation.common.api.ApiResponse;
import tr.gov.ogm.reservation.request.dto.RequestResponse;
import tr.gov.ogm.reservation.request.dto.CancellationRequest;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api")
public class RequestController {
    private final RequestService requestService;
    public RequestController(RequestService requestService) { this.requestService = requestService; }
    @PostMapping("/requests/cancellation") @PreAuthorize("hasRole('GUEST')") public ApiResponse<RequestResponse> cancellation(@Valid @RequestBody CancellationRequest request) { return ApiResponse.success("Cancellation request created.", requestService.createCancellation(request)); }
    @GetMapping("/admin/requests") @PreAuthorize("hasAnyRole('STAFF','ADMIN')") public ApiResponse<List<RequestResponse>> pending(@RequestParam(required = false) RequestType tip) { return ApiResponse.success("Requests retrieved.", requestService.pending(tip)); }
    @PatchMapping("/admin/requests/{id}/approve") @PreAuthorize("hasAnyRole('STAFF','ADMIN')") public ApiResponse<RequestResponse> approve(@PathVariable Long id) { return ApiResponse.success("Request approved.", requestService.approve(id)); }
    @PatchMapping("/admin/requests/{id}/reject") @PreAuthorize("hasAnyRole('STAFF','ADMIN')") public ApiResponse<RequestResponse> reject(@PathVariable Long id) { return ApiResponse.success("Request rejected.", requestService.reject(id)); }
}
