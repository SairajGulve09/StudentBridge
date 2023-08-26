package com.sairaj.blog.services;

import java.util.List;

import com.sairaj.blog.payload.UserDto;

public interface UserService {
	
	UserDto createUser(UserDto user);
	UserDto updateUser(UserDto user,Integer userId);
	List<UserDto> getAllUsers();
	UserDto getUserById(Integer userId);
	void deleteUser(Integer userId);
	

}
