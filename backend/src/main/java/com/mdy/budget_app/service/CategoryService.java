package com.mdy.budget_app.service;

import com.mdy.budget_app.entity.Category;
import com.mdy.budget_app.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository repo;

    public List<Category> getAll() {
        return repo.findAll();
    }

    public Category save(Category category) {
        return repo.save(category);
    }

    public Category getCategory(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException(("Category not found")));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
