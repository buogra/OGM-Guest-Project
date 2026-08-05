package tr.gov.ogm.reservation.admin;

import tr.gov.ogm.reservation.admin.dto.CreateUserRequest;
import tr.gov.ogm.reservation.admin.dto.UpdateUserRequest;
import tr.gov.ogm.reservation.admin.dto.UserResponse;
import tr.gov.ogm.reservation.common.api.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {
    private final AdminUserService userService;
    public AdminUserController(AdminUserService userService) { this.userService = userService; }
    @GetMapping ApiResponse<List<UserResponse>> findAll() { return ApiResponse.success("Users retrieved.", userService.findAll()); }
    @PostMapping ApiResponse<UserResponse> create(@Valid @RequestBody CreateUserRequest request) { return ApiResponse.success("User created.", userService.create(request)); }
    @PutMapping("/{id}") ApiResponse<UserResponse> update(@PathVariable Long id, @Valid @RequestBody UpdateUserRequest request) { return ApiResponse.success("User updated.", userService.update(id, request)); }
    @DeleteMapping("/{id}") ApiResponse<Void> delete(@PathVariable Long id) { userService.delete(id); return ApiResponse.success("User deleted.", null); }
    @PatchMapping("/{id}/toggle-active") ApiResponse<UserResponse> toggleActive(@PathVariable Long id) { return ApiResponse.success("User status updated.", userService.toggleActive(id)); }
}
