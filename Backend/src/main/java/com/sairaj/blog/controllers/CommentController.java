package com.sairaj.blog.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sairaj.blog.entities.Comment;
import com.sairaj.blog.payload.CommentDto;
import com.sairaj.blog.services.CommentService;

@RestController
@RequestMapping("/api/")
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	
	@PostMapping("/post/{postId}/comments")
	public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto,@PathVariable Integer postId)
	{
		CommentDto newComment = this.commentService.createComment(commentDto, postId);
		return new ResponseEntity<CommentDto>(newComment,HttpStatus.CREATED);
	}
	
	//delete comment
	@DeleteMapping("/comments/{commentId}")
	public ResponseEntity<?> deleteComment(@PathVariable Integer commentId)
	{
		this.commentService.deleteComment(commentId);
		Map<String, String> responseMap = new HashMap<>();
		responseMap.put("message", "User deleted successfully");
		return ResponseEntity.ok(responseMap);

	}
	

}
