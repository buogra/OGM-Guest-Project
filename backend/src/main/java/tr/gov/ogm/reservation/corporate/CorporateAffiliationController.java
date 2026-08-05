package tr.gov.ogm.reservation.corporate;
import tr.gov.ogm.reservation.common.api.ApiResponse;
import tr.gov.ogm.reservation.corporate.dto.*;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/corporate-affiliation")
public class CorporateAffiliationController {
    private final CorporateAffiliationService service;
    public CorporateAffiliationController(CorporateAffiliationService service) { this.service = service; }
    @PostMapping("/request") public ApiResponse<Void> request(@Valid @RequestBody CorporateAffiliationRequest request) { service.request(request); return ApiResponse.success("Verification code sent.", null); }
    @PostMapping("/verify") public ApiResponse<VerificationResponse> verify(@Valid @RequestBody CorporateAffiliationVerifyRequest request) { return ApiResponse.success("Corporate affiliation verified.", service.verify(request)); }
}
