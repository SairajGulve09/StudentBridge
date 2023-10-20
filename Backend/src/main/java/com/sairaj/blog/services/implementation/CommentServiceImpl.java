package com.sairaj.blog.services.implementation;

import org.modelmapper.ModelMapper;
//import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sairaj.blog.entities.Comment;
import com.sairaj.blog.entities.Post;
import com.sairaj.blog.exception.ResourceNotFoundException;
import com.sairaj.blog.payload.CommentDto;
import com.sairaj.blog.repositories.CommentRepo;
import com.sairaj.blog.repositories.PostRepository;
import com.sairaj.blog.services.CommentService;
@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentRepo commentRepo;
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public CommentDto createComment(CommentDto commentDto, Integer postId) {
		// TODO Auto-generated method stub
		
		Post post = this.postRepository.findById(postId).orElseThrow(()-> new ResourceNotFoundException("Post", "post id", postId));
		Comment newComment = this.modelMapper.map(commentDto, Comment.class);
		newComment.setPost(post);
		Comment savedComment = this.commentRepo.save(newComment);
		
		return this.modelMapper.map(savedComment, CommentDto.class);
	}

	@Override
	public void deleteComment(Integer commentId) {
		// TODO Auto-generated method stub
		Comment com = this.commentRepo.findById(commentId).orElseThrow(()-> new ResourceNotFoundException("Comment", "comment id", commentId));
		this.commentRepo.delete(com);
	}

}
