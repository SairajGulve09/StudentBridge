package com.sairaj.blog.services;


import com.sairaj.blog.payload.CommentDto;


public interface CommentService {
	
	//create comment
	
	CommentDto createComment(CommentDto commentDto,Integer postId);
	void deleteComment(Integer commentId);
	
	
	

}
