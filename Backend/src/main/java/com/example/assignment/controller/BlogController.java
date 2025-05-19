package com.example.assignment.controller;

import com.example.assignment.entity.Blog;
import com.example.assignment.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "http://localhost:5173")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @PostMapping("/draft")
    public ResponseEntity<Blog> saveDraft(@RequestBody Blog blog) {
        return ResponseEntity.ok(blogService.saveDraft(blog));
    }

    @PostMapping("/publish/{id}")
    public ResponseEntity<Blog> publish(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.publishBlog(id));
    }

    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlogs() {
        return ResponseEntity.ok(blogService.getAllBlogs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlog(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.getBlogById(id));
    }

}
