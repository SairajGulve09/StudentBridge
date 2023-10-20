package com.sairaj.blog.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sairaj.blog.entities.Category;
import com.sairaj.blog.entities.Post;
import com.sairaj.blog.payload.PostDto;
import com.sairaj.blog.payload.PostResponse;


public interface PostService {
	
	
	//create
	
	PostDto createPost(PostDto postDto, Integer userId, Integer categoryId);
	
	//update
	
	PostDto updatePost(PostDto postDto,Integer postId);
	
	//delete
	
	void deletePost(Integer postId);
	
	//get all posts
	
	PostResponse getAllPost(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);
	
	//get single post
	
	PostDto getPostById(Integer postId);
	
	//get all post by category
	
	List<PostDto> getPostByCategory(Integer categoryId);
	
	//get post by user
	
	List<PostDto> getPostsByUser(Integer userId);
	
	//search post
	
	List<PostDto> searchPosts(String keyword);

}
