package com.realshield.platform.specification;

import com.realshield.platform.model.Role;
import com.realshield.platform.model.User;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecification {

    public static Specification<User> hasEmail(String email) {
        return (root, query, cb) ->
                email == null ? null :
                        cb.like(cb.lower(root.get("email")),
                                "%" + email.toLowerCase() + "%");
    }

    public static Specification<User> hasName(String name) {
        return (root, query, cb) ->
                name == null ? null :
                        cb.like(cb.lower(root.get("name")),
                                "%" + name.toLowerCase() + "%");
    }

    public static Specification<User> isActive(Boolean active) {
        return (root, query, cb) ->
                active == null ? null :
                        cb.equal(root.get("active"), active);
    }

    public static Specification<User> hasRole(Role role) {
        return (root, query, cb) ->
                role == null ? null :
                        cb.equal(root.get("role"), role);
    }
}
