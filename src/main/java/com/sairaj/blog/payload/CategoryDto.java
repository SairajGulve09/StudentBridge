package com.sairaj.blog.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//@NoArgsConstructor
@Getter
@Setter
public class CategoryDto {
	
	
	private Integer categoryId;
	@NotBlank
	@Size(min = 3)
	private String categoryName;
	@NotBlank
	@Size(max = 15)
	private String categoryDecription;
	
	
	public CategoryDto() {
		super();
	}
	public Integer getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getCategoryDecription() {
		return categoryDecription;
	}
	public void setCategoryDecription(String categoryDecription) {
		this.categoryDecription = categoryDecription;
	}
	
	

}
