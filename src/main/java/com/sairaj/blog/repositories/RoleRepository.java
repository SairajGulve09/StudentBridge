package com.sairaj.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sairaj.blog.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}
