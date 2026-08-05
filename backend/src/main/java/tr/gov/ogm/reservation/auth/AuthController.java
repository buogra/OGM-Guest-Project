package tr.gov.ogm.reservation.auth;

import tr.gov.ogm.reservation.auth.dto.AuthResponse;
import tr.gov.ogm.reservation.auth.dto.GuestRegistrationRequest;
import tr.gov.ogm.reservation.auth.dto.LoginRequest;
import tr.gov.ogm.reservation.auth.dto.StaffRegistrationRequest;
import tr.gov.ogm.reservation.common.api.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) { this.authService = authService; }
    @PostMapping("/register/guest")
    ApiResponse<AuthResponse> registerGuest(@Valid @RequestBody GuestRegistrationRequest request) {
        return ApiResponse.success("Guest registration completed.", authService.registerGuest(request));
    }
    @PostMapping("/register/staff")
    ApiResponse<AuthResponse> registerStaff(@Valid @RequestBody StaffRegistrationRequest request) {
        return ApiResponse.success("Staff registration completed.", authService.registerStaff(request));
    }
    @PostMapping("/login")
    ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.success("Login completed.", authService.login(request));
    }
}
