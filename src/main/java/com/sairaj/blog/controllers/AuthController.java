//package com.sairaj.blog.controllers;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.sairaj.blog.payload.JwtAuthRequest;
//import com.sairaj.blog.payload.JwtAuthResponse;
//import com.sairaj.blog.security.JwtHelper;
//
//
//
//@RestController
//@RequestMapping("/api/v1/auth")
//public class AuthController {
//
//    @Autowired
//    private UserDetailsService userDetailsService;
//
//    @Autowired
//    private AuthenticationManager manager;
//
//
//    @Autowired
//    private JwtHelper helper;
//
//    private Logger logger = LoggerFactory.getLogger(AuthController.class);
//
//
//    @PostMapping("/login")
//    public ResponseEntity<JwtAuthResponse> login(@RequestBody JwtAuthRequest request) {
//
//        this.doAuthenticate(request.getEmail(), request.getPassword());
//
//
//        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
//        String token = this.helper.generateToken(userDetails);
//
//        JwtAuthResponse response = JwtAuthResponse.builder()
//                .token(token)
//                .username(userDetails.getUsername()).build();
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }
//
//    private void doAuthenticate(String email, String password) {
//
//        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
//        try {
//            manager.authenticate(authentication);
//
//
//        } catch (BadCredentialsException e) {
//            throw new BadCredentialsException(" Invalid Username or Password  !!");
//        }
//
//    }
//
//    @ExceptionHandler(BadCredentialsException.class)
//    public String exceptionHandler() {
//        return "Credentials Invalid !!";
//    }
//
//}
////
////
//
//
//
////@RestController
////@RequestMapping("/api/v1/auth/")
////public class AuthController {
////	
////	@Autowired
////	private JwtHelper jwtTokenHelper;
////	
////	@Autowired
////	private UserDetailsService userDetailsService;
////	
////	@Autowired
////	private AuthenticationManager authenticationManager;
////	
////	@PostMapping("/login")
////	public ResponseEntity<JwtAuthResponse> createToken(
////			@RequestBody JwtAuthRequest request)
////	{
////		
//////		System.out.println("Received request:"+ request.toString());
////		this.authenticate(request.getEmail(),request.getPassword());
////		
////		UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getEmail());
////		String token = this.jwtTokenHelper.generateToken(userDetails);
////		
////		JwtAuthResponse response = new JwtAuthResponse();
////		response.setToken(token);
////		
////		return new ResponseEntity<JwtAuthResponse>(response,HttpStatus.OK);
////	}
////
////	private void authenticate(String username, String password) {
////		// TODO Auto-generated method stub
////		
////		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
////		this.authenticationManager.authenticate(authenticationToken);
////	}
////
////}
