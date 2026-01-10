package com.realshield.platform.repository;

import com.realshield.platform.model.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> ,
        JpaSpecificationExecutor<AuditLog> {

}
