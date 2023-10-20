package com.sairaj.blog.security;

import java.io.IOException;
//import java.util.logging.Logger;

//import org.hibernate.validator.internal.util.logging.LoggerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.jpa.repository.query.JpqlParser.New_valueContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;



@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);
    @Autowired
    private JwtHelper jwtHelper;


    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

//        try {
//            Thread.sleep(500);
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
//        }
        //Authorization

        String requestHeader = request.getHeader("Authorization");
        //Bearer 2352345235sdfrsfgsdfsdf
        logger.info(" Header :  {}", requestHeader);
        String username = null;
        String token = null;
        if (requestHeader != null && requestHeader.startsWith("Bearer")) {
            //looking good
            token = requestHeader.substring(7);
            try {

                username = this.jwtHelper.getUsernameFromToken(token);

            } catch (IllegalArgumentException e) {
                logger.info("Illegal Argument while fetching the username !!");
                e.printStackTrace();
            } catch (ExpiredJwtException e) {
                logger.info("Given jwt token is expired !!");
                e.printStackTrace();
            } catch (MalformedJwtException e) {
                logger.info("Some changed has done in token !! Invalid Token");
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();

            }


        } else {
            logger.info("Invalid Header Value !! ");
        }


        //
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {


            //fetch user detail from username
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            Boolean validateToken = this.jwtHelper.validateToken(token, userDetails);
            if (validateToken) {

                //set the authentication
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                SecurityContextHolder.getContext().setAuthentication(authentication);


            } else {
                logger.info("Validation fails !!");
            }


        }

        filterChain.doFilter(request, response);


    }
}

////
////
////
//////@Component
//////public class JwtAuthenticationFilter extends OncePerRequestFilter{
//////	
//////	@Autowired
//////	private UserDetailsService userDetailsService;
//////	
//////	@Autowired
//////	private JwtHelper jwtTokenHelper;
//////
//////	@Override
//////	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//////			throws ServletException, IOException {
//////		
//////		//get token
//////		
//////		String requestTokenHeader = request.getHeader("Authorization");
//////		System.out.println("Authorization: " + requestTokenHeader);
//////		//Bearer 1324354545
//////		
//////		String username=null;
//////		String token=null;
//////		
//////		if(requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer "))
//////		{
//////			token = requestTokenHeader.substring(7);
//////			
//////			try {
//////				username =  this.jwtTokenHelper.getUsernameFromToken(token);
//////			} catch (IllegalArgumentException e) {
//////				System.out.println("Enable to get JWT token");
//////			}
//////			catch (ExpiredJwtException e) {
//////				System.out.println("JWT token has expired");
//////			}
//////			catch (MalformedJwtException e) {
//////				System.out.println("Invalid JWT");
//////			}
//////		}
//////		else {
//////			System.out.println("JWT token does not begin with Bearer");
//////		}
//////		
//////		
//////		//validate token
//////		if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null)
//////		{
//////			UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
//////			if(this.jwtTokenHelper.validateToken(token, userDetails))
//////			{
//////				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
//////				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//////				
//////				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//////			}
//////			else {
//////				System.out.println("invalid jwt token");
//////			}
//////		}
//////		else {
//////			System.out.println("Error");
//////		}
//////		
//////		filterChain.doFilter(request, response);
//////	}
//////
//////}
