package com.mdy.budget_app.service;

import com.mdy.budget_app.entity.Category;
import com.mdy.budget_app.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {
    @Mock
    private CategoryRepository repository;

    @InjectMocks
    private CategoryService service;

    @Test
    void testGetCategory_found() {
        Category Category = new Category("Cash");
        Category.setId(1L);

        when(repository.findById(1L)).thenReturn(Optional.of(Category));
        Category result = service.getCategory(1L);
        assertEquals("Cash", result.getName());
    }

    @Test
    void testGetCategory_notFound() {
        when(repository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> service.getCategory(1L));
    }

    @Test
    void testGetAll_nonEmpty() {

        Category Category1 = new Category("Cash");
        Category1.setId(1L);
        Category Category2 = new Category("BDO");
        Category1.setId(2L);
        List<Category> CategoryList = new ArrayList<>();
        CategoryList.add(Category1);
        CategoryList.add(Category2);

        when(repository.findAll()).thenReturn(CategoryList);
        List<Category> resultList = service.getAll();
        assertEquals(resultList, CategoryList);
    }

    @Test
    void testGetAll_EmptyList() {
        List<Category> CategoryList = new ArrayList<>();

        when(repository.findAll()).thenReturn(CategoryList);
        List<Category> resultList = service.getAll();
        assertEquals(0, resultList.size());
    }

    // TODO: Test save and delete later
}
