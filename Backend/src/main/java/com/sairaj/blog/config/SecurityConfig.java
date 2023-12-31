package com.sairaj.blog.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import com.sairaj.blog.security.JwtAuthenticationEntryPoint;
import com.sairaj.blog.security.JwtAuthenticationFilter;




@Configuration
@EnableWebSecurity
@EnableWebMvc
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
	
	


    @Autowired
    private JwtAuthenticationEntryPoint point;
    @Autowired
    private JwtAuthenticationFilter filter;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    	http.csrf(csrf -> csrf.disable())
        .cors(cors-> cors.disable())
        .authorizeHttpRequests(auth ->
            auth
                .requestMatchers("/api/v1/auth/**").permitAll().requestMatchers(HttpMethod.GET).permitAll()
                .anyRequest().authenticated()
        )
        .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    	
    	
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
    
    return http.build();
    }
    
    

    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception
	{
		return configuration.getAuthenticationManager();
	}
    
    
    @Bean
	public DaoAuthenticationProvider daoAuthenticationProvider()
	{
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(this.userDetailsService);
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}
    
    @Bean
    public FilterRegistrationBean coresFilter()
    {
    	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    	
    	CorsConfiguration corsConfiguration = new CorsConfiguration();
    	corsConfiguration.setAllowCredentials(true);
    	corsConfiguration.addAllowedOriginPattern("*");
    	corsConfiguration.addAllowedHeader("Authorization");
    	corsConfiguration.addAllowedHeader("Content-Type");
    	corsConfiguration.addAllowedHeader("Accept");
    	corsConfiguration.addAllowedMethod("POST");
    	corsConfiguration.addAllowedMethod("GET");
    	corsConfiguration.addAllowedMethod("DELETE");
    	corsConfiguration.addAllowedMethod("PUT");
    	corsConfiguration.addAllowedMethod("OPTIONS");
    	corsConfiguration.setMaxAge(3600L);

    	
    	
    	source.registerCorsConfiguration("/**", corsConfiguration);
    	
    	FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
    	
    	bean.setOrder(-110);
    	
    	return bean;
    }
    
    
    }

////    
////    
//////    @Bean
//////	public DaoAuthenticationProvider daoAuthenticationProvider()
//////	{
//////		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//////		provider.setUserDetailsService(this.customUserDetailService);
//////		provider.setPasswordEncoder(passwordEncoder());
//////		return provider;
//////	}
//////	
//////	@Bean
//////	public PasswordEncoder passwordEncoder()
//////	{
//////		return new BCryptPasswordEncoder();
//////	}
//////	
//////	@Bean
//////	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception
//////	{
//////		return configuration.getAuthenticationManager();
//////	}
////
////
////}
////
////
////
////
////
//////@Configuration
//////@EnableWebSecurity
//////public class SecurityConfig {
//////	
//////	@Autowired
//////	private CustomUserDetailService customUserDetailService;
//////	
//////	@Autowired
//////	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
//////	
//////	@Autowired
//////	private JwtAuthenticationFilter jwtAuthenticationFilter;
//////	
//////	//@SuppressWarnings("removal")
//////	@Bean
//////	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
//////	{
////////		http.
////////				csrf()
////////				.disable()
////////				.authorizeHttpRequests()
////////				.requestMatchers("/api/v1/auth/login").permitAll()
////////				.anyRequest()
////////				.authenticated()
////////				.and()
////////				.exceptionHandling()
////////				.authenticationEntryPoint(this.jwtAuthenticationEntryPoint)
////////				.and()
////////				.sessionManagement()
////////				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//////		
//////		http
//////	    .csrf(customizer -> customizer.disable())
//////	    .authorizeHttpRequests(authorizeRequests ->
//////	        authorizeRequests
//////	            .requestMatchers("/api/v1/auth/login").permitAll()
//////	            .anyRequest().authenticated()
//////	    )
//////	    .exceptionHandling(exceptionHandling ->
//////	        exceptionHandling.authenticationEntryPoint(this.jwtAuthenticationEntryPoint)
//////	    )
//////	    .sessionManagement(sessionManagement ->
//////	        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//////	    );
//////
//////
//////		
//////		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
//////		
//////		http.authenticationProvider(daoAuthenticationProvider());
//////		DefaultSecurityFilterChain build =  http.build();
//////		return build;
//////				
//////	}
//////	
//////	protected void configure(AuthenticationManagerBuilder auth) throws Exception
//////	{
//////		auth.userDetailsService(this.customUserDetailService).passwordEncoder(passwordEncoder());
//////	}
////	
//////	@Bean
//////	public DaoAuthenticationProvider daoAuthenticationProvider()
//////	{
//////		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//////		provider.setUserDetailsService(this.customUserDetailService);
//////		provider.setPasswordEncoder(passwordEncoder());
//////		return provider;
//////	}
//////	
//////	@Bean
//////	public PasswordEncoder passwordEncoder()
//////	{
//////		return new BCryptPasswordEncoder();
//////	}
//////	
//////	@Bean
//////	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception
//////	{
//////		return configuration.getAuthenticationManager();
//////	}
////
//////}
