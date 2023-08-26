package com.sairaj.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sairaj.blog.entities.Comment;

public interface CommentRepo extends JpaRepository<Comment, Integer> {

}
