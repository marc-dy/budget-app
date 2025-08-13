package com.mdy.budget_app.controller;

import com.mdy.budget_app.entity.Category;
import com.mdy.budget_app.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryService service;

    @GetMapping
    public List<Category> getAllCategories() {
        return service.getAll();
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return service.save(category);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        service.delete(id);
    }

}
