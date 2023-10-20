package com.sairaj.blog.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sairaj.blog.entities.Category;
import com.sairaj.blog.entities.Post;
import com.sairaj.blog.entities.User;
import com.sairaj.blog.payload.PostDto;

public interface PostRepository extends JpaRepository<Post, Integer> {
	
	List<Post> findByUser(User user);
	List<Post> findByCategory(Category category);

	List<Post> findByTitleContaining(String title);
}
