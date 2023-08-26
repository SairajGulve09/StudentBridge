package com.sairaj.blog.controllers;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sairaj.blog.payload.UserDto;
import com.sairaj.blog.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	//POST- create user
	@PostMapping("/")
	public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto)
	{
		UserDto createUserDto = this.userService.createUser(userDto);
		return new ResponseEntity<>(createUserDto,HttpStatus.CREATED);
	}
	
	//PUT- update user
	//{userId} this is called URI which we get directly from web address
	//To use URI as a parameter we use "@PathVariable" annotation
	@PutMapping("/{userId}")
	public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto userDto, @PathVariable Integer userId)
	{
		UserDto updatedUser = this.userService.updateUser(userDto, userId);
		return ResponseEntity.ok(updatedUser);
	}
	
	//DELETE- delete user
	//<?> mean we dont know the type of parameter
	
	@DeleteMapping("/{userId}")
	public ResponseEntity<?> deleteUser(@Valid @PathVariable Integer userId)
	{
		this.userService.deleteUser(userId);
		Map<String, String> responseMap = new HashMap<>();
	    responseMap.put("message", "User deleted successfully");
	    return ResponseEntity.ok(responseMap);	}
	
	
	//GET- get users
	@GetMapping("/")
	public ResponseEntity<List<UserDto>> getAllUsers()
	{
		return ResponseEntity.ok(this.userService.getAllUsers());
	}
	
	//GET- get single users
		@GetMapping("/{userId}")
		public ResponseEntity<UserDto> getSingleUser(@Valid @PathVariable Integer userId)
		{
			return ResponseEntity.ok(this.userService.getUserById(userId));
		}

}
