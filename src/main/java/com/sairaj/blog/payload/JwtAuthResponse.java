package com.sairaj.blog.payload;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtAuthResponse {
	
	private String token;
	
	private String username;

}
