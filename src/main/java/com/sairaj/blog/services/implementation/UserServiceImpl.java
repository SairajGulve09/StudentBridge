package com.sairaj.blog.services.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sairaj.blog.entities.User;
import com.sairaj.blog.exception.ResourceNotFoundException;
import com.sairaj.blog.payload.UserDto;
import com.sairaj.blog.repositories.UserRepo;
import com.sairaj.blog.services.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public UserDto createUser(UserDto userDto) {
		// TODO Auto-generated method stub
		
		User user = this.dtoToUser(userDto);
		User savedUser = this.userRepo.save(user);
		return this.userToDto(savedUser);
		
		
	}

	@Override
	public UserDto updateUser(UserDto userDto, Integer userId) {
		// TODO Auto-generated method stub
		
		User user = this.userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User","Id",userId));
		
		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		user.setAbout(userDto.getAbout());
		
		User updatedUser =  this.userRepo.save(user);
		UserDto userDto2 =  this.userToDto(updatedUser);
		
		
		return userDto2;
	}

	@Override
	public List<UserDto> getAllUsers() {
		// TODO Auto-generated method stub
		
		List<User> users = this.userRepo.findAll();
		List<UserDto> userDtos = users.stream().map(user->this.userToDto(user)).collect(Collectors.toList());
		return userDtos;
	}

	@Override
	public UserDto getUserById(Integer userId) {
		// TODO Auto-generated method stub
		
		User user = this.userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User","Id",userId));
		
		return this.userToDto(user);
	}

	@Override
	public void deleteUser(Integer userId) {
		// TODO Auto-generated method stub
		
		User user = this.userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User","Id",userId));
		this.userRepo.delete(user);
		
	}
	
	private User dtoToUser(UserDto userDto)
	{
		
		User user = this.modelMapper.map(userDto,User.class);
//		User user =new User();
//		user.setId(userDto.getId());
//		user.setName(userDto.getName());
//		user.setEmail(userDto.getEmail());
//		user.setAbout(userDto.getAbout());
//		user.setPassword(userDto.getPassword());
		return user;
		
	}
	
	private UserDto userToDto(User user)
	{
		
		UserDto userDto = this.modelMapper.map(user, UserDto.class);
		
//		UserDto userDto =new UserDto();
//		userDto.setId(user.getId());
//		userDto.setName(user.getName());
//		userDto.setEmail(user.getEmail());
//		userDto.setAbout(user.getAbout());
//		userDto.setPassword(user.getPassword());
		return userDto;
		
	}

}
