package com.realshield.platform.controller.admin;


import com.realshield.platform.dto.ApiResponse;
import com.realshield.platform.dto.admin.AuditLogResponseDTO;
import com.realshield.platform.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/audit-logs")
public class AdminAuditLogController {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<AuditLogResponseDTO>>> getAuditLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Page<AuditLogResponseDTO> logs = auditLogRepository.findAll(pageable)
                .map(log -> new AuditLogResponseDTO(
                        log.getId(),
                        log.getAdminEmail(),
                        log.getAction(),
                        log.getEntityType(),
                        log.getEntityId(),
                        log.getCreatedAt()
                ));

        return ResponseEntity.ok(
                ApiResponse.success("Audit logs fetched successfully", logs)
        );
    }
}