package com.oceanwinds.crud.service;

import Global.exceptions.ResourceNotFoundException;
import com.oceanwinds.crud.entity.Product;
import com.oceanwinds.crud.repository.ProductRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllYachts() {
        List<Product> productList = new ArrayList<>();


        Mockito.when(productRepository.findAll()).thenReturn(productList);

        List<Product> result = productService.getAllYachts();


        Assertions.assertEquals(productList.size(), result.size());

    }

    @Test
    public void testGetYachtById() {
        Long yachtId = 1L;
        Product yacht = new Product();
        yacht.setId(yachtId);


        Mockito.when(productRepository.findById(yachtId)).thenReturn(Optional.of(yacht));

        Product result = productService.getYachtById(yachtId);

        Assertions.assertEquals(yacht.getId(), result.getId());

    }

    @Test
    public void testGetYachtById_ResourceNotFoundException() {
        Long invalidYachtId = 999L;

        Mockito.when(productRepository.findById(invalidYachtId)).thenReturn(Optional.empty());

        Assertions.assertThrows(ResourceNotFoundException.class, () -> productService.getYachtById(invalidYachtId));
    }



}
