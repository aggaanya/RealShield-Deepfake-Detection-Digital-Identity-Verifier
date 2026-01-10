package com.realshield.platform.service.admin;

import com.realshield.platform.dto.admin.AuditLogResponseDTO;
import com.realshield.platform.exception.AccessDeniedExceptions;
import com.realshield.platform.exception.AdminNotFoundException;
import com.realshield.platform.model.AuditLog;
import com.realshield.platform.model.Role;
import com.realshield.platform.model.User;
import com.realshield.platform.repository.AuditLogRepository;
import com.realshield.platform.repository.UserRepository;
import com.realshield.platform.specification.AuditLogSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * Service responsible for recording all critical admin actions
 * for security, traceability, and auditing purposes.
 */
@Service
public class AdminAuditService implements AdminAuditInterface {

    private final AuditLogRepository auditLogRepository;
    private final UserRepository userRepository;

    public AdminAuditService(AuditLogRepository auditLogRepository, UserRepository userRepository) {
        this.auditLogRepository = auditLogRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void logAdminAction(String adminEmail, String action, String entityType, Long entityId) {
        auditLogRepository.save(AuditLog.builder().adminEmail(adminEmail).action(action).entityType(entityType).entityId(entityId).createdAt(LocalDateTime.now()).build());
    }

    public Page<AuditLogResponseDTO> getAuditLogs(Long superAdminId, String action, String adminEmail, int page,int size) {
        User superAdmin = userRepository.findById(superAdminId).orElseThrow(() -> new AdminNotFoundException("Super admin not found"));

        if (superAdmin.getRole() != Role.SUPER_ADMIN) {throw new AccessDeniedExceptions("Only super admin can view audit logs");}

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Specification<AuditLog> spec = Specification.where(AuditLogSpecification.hasAction(action)).and(AuditLogSpecification.hasAdminEmail(adminEmail));

        return auditLogRepository.findAll(spec, pageable).map(log -> new AuditLogResponseDTO(log.getId(), log.getAdminEmail(), log.getAction(), log.getEntityType(), log.getEntityId(), log.getCreatedAt()));
    }
}
