package com.realshield.platform.service.admin;

public interface AdminAuditInterface {
    void logAdminAction(String adminEmail, String action, String entityType, Long entityId);
}
