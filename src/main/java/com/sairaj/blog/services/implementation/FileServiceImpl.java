package com.sairaj.blog.services.implementation;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sairaj.blog.services.FileService;

@Service
public class FileServiceImpl implements FileService {

	@Override
	public String uploadImage(String path, MultipartFile file) throws IOException {
		// TODO Auto-generated method stub
		
		//file name
		String name = file.getOriginalFilename();
		//abc.png
		
		//random name generate file
		String randomIdString = UUID.randomUUID()
.toString();
		String fileName1 = randomIdString.concat(name.substring(name.lastIndexOf(".")));
		
		
		//full path
		String filePath = path + File.separator + fileName1;
		
		//create folder if not created
		File f = new File(path);
		if(!f.exists())
		{
			f.mkdir();
		}
		
		//file copy
		
		Files.copy(file.getInputStream(), Paths.get(filePath));
		
		return fileName1;
	}

	@Override
	public InputStream getResource(String path, String fileName) throws FileNotFoundException {
		// TODO Auto-generated method stub
		
		String fullPath = path + File.separator + fileName;
		InputStream is  = new FileInputStream(fullPath);
		//db logic to return inputstream
		
		return is;
		
		
		
	}

}
