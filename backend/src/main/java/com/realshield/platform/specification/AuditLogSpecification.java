package com.realshield.platform.specification;

import com.realshield.platform.model.AuditLog;
import org.springframework.data.jpa.domain.Specification;

public class AuditLogSpecification {
    public static Specification<AuditLog> hasAction(String action) {
        return (root, query, cb) ->
                action == null ? null : cb.equal(root.get("action"), action);
    }

    public static Specification<AuditLog> hasAdminEmail(String adminEmail) {
        return (root, query, cb) ->
                adminEmail == null ? null : cb.equal(root.get("adminEmail"), adminEmail);
    }
}
