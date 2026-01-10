package com.realshield.platform.controller.admin;


import com.realshield.platform.dto.ApiResponse;
import com.realshield.platform.dto.admin.AuditLogResponseDTO;
import com.realshield.platform.service.admin.AdminAuditService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/audit-logs")
public class AdminAuditLogController {

    private final AdminAuditService adminAuditService;

    public AdminAuditLogController(AdminAuditService adminAuditService) {
        this.adminAuditService = adminAuditService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<AuditLogResponseDTO>>> getAuditLogs(
            @RequestParam(required = false) String action,
            @RequestParam(required = false) String adminEmail,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        // TODO: replace with JWT
        Long superAdminId = 1L;

        Page<AuditLogResponseDTO> logs =
                adminAuditService.getAuditLogs(
                        superAdminId,
                        action,
                        adminEmail,
                        page,
                        size
                );


        return ResponseEntity.ok(ApiResponse.success("Audit logs fetched successfully", logs));
    }
}
