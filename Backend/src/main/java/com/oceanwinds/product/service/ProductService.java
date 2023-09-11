package com.oceanwinds.product.service;

import Global.exceptions.AttributeException;
import Global.exceptions.ResourceNotFoundException;
import Global.util.PaginatedResponse;
import com.oceanwinds.category.entity.Category;
import com.oceanwinds.category.repository.CategoryRepository;
import com.oceanwinds.feature.entity.Feature;
import com.oceanwinds.location.entity.Location;
import com.oceanwinds.location.entity.dto.LocationDto;
import com.oceanwinds.location.repository.LocationRepository;
import com.oceanwinds.pictures.entity.PictureData;
import com.oceanwinds.pictures.repository.PictureDataRepository;
import com.oceanwinds.product.entity.Product;
import com.oceanwinds.product.entity.dto.ProductDto;
import com.oceanwinds.feature.repository.FeatureRepository;
import com.oceanwinds.product.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final FeatureRepository featureRepository;
    private final LocationRepository locationRepository;
    private final PictureDataRepository pictureDataRepository;

    @Autowired
    public ProductService(PictureDataRepository pictureDataRepository,ProductRepository productRepository, CategoryRepository categoryRepository, FeatureRepository featureRepository, LocationRepository locationRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.featureRepository = featureRepository;
        this.locationRepository = locationRepository;
        this.pictureDataRepository = pictureDataRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    public Product getProductByName(String name) {
        return productRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    public Product createProduct(ProductDto dto) throws AttributeException {
        validateProductAttributes(dto);

        Product product = new Product();
        Location location = null;
        if (dto.getLocation() != null){
            if (dto.getLocation().getCountry() != null && !dto.getLocation().getCountry().isEmpty() && dto.getLocation().getCity() != null && !dto.getLocation().getCity().isEmpty()){
                location = locationRepository.findByCountryAndCity(dto.getLocation().getCountry(), dto.getLocation().getCity());
                if (location != null){
                    product.setLocation(location);
                }
                else {
                    Location newLocation = new Location();
                    newLocation.setCountry(dto.getLocation().getCountry());
                    newLocation.setCity(dto.getLocation().getCity());
                    location = locationRepository.findById(locationRepository.save(newLocation).getId()).get();
                }
            }
        }

        if (dto.getCategoryId() != null) {
          Category category = categoryRepository.findById(dto.getCategoryId())
                  .orElseThrow(() -> new EntityNotFoundException("Category not found"));
          product.setCategory(category);
        } else {
            product.setCategory(null);
        }
        if (dto.getFeaturesId() != null){
            Set<Feature> features = new HashSet<>(featureRepository.findAllById(dto.getFeaturesId()));
            product.setFeature(features);
        } else {
            product.setFeature(new HashSet<>());
        }

        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setDescription(dto.getDescription());
        product.setImageUrl(dto.getImageUrl());
        product.setPricePerDay(dto.getPricePerDay());
        product.setPricePerHour(dto.getPricePerHour());
        product.setPricePerWeek(dto.getPricePerWeek());
        product.setLocation(location);
        product.setAvailable(dto.getAvailable());
       

        Product savedProduct = productRepository.save(product);

        for(PictureData picture:dto.getPictures()){

            picture.setProduct(savedProduct);
            pictureDataRepository.save(picture);
        }

        return product;
    }

    public Product updateProduct(Long id, ProductDto dto) throws AttributeException {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        setLocation(dto, product);
        setCategoryAndFeatures(dto, product);
        setCommonProductAttributes(dto, product);

        return productRepository.save(product);
    }

    private void validateProductAttributes(ProductDto dto) throws AttributeException {
        if (StringUtils.isAnyEmpty(dto.getName(), dto.getDescription(), dto.getImageUrl())) {
            throw new AttributeException("Name, Description, and Image are required");
        }
    }

    private void setLocation(ProductDto dto, Product product) {
        LocationDto locationDto = dto.getLocation();
        if (locationDto != null && StringUtils.isNotBlank(locationDto.getCountry()) && StringUtils.isNotBlank(locationDto.getCity())) {
            Location location = locationRepository.findByCountryAndCity(locationDto.getCountry(), locationDto.getCity());
            if (location == null) {
                location = createNewLocation(locationDto);
            }
            product.setLocation(location);
        }
    }

    private Location createNewLocation(LocationDto locationDto) {
        Location newLocation = new Location();
        newLocation.setCountry(locationDto.getCountry());
        newLocation.setCity(locationDto.getCity());
        return locationRepository.save(newLocation);
    }

    private void setCategoryAndFeatures(ProductDto dto, Product product) {
        Long categoryId = dto.getCategoryId();
        Category category = categoryId != null ?
                categoryRepository.findById(categoryId)
                        .orElseThrow(() -> new EntityNotFoundException("Category not found")) :
                null;
        product.setCategory(category);

        Set<Long> featureIds = dto.getFeaturesId();
        Set<Feature> features = featureIds != null ?
                new HashSet<>(featureRepository.findAllById(featureIds)) :
                new HashSet<>();
        product.setFeature(features);
    }

    private void setCommonProductAttributes(ProductDto dto, Product product) {
        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setDescription(dto.getDescription());
        product.setImageUrl(dto.getImageUrl());
        product.setPricePerDay(dto.getPricePerDay());
        product.setPricePerHour(dto.getPricePerHour());
        product.setPricePerWeek(dto.getPricePerWeek());
        product.setAvailable(dto.getAvailable());
    }

    public void deleteProduct(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setDeleted(true);
            productRepository.save(product);
        } else {
            throw new ResourceNotFoundException("Product with ID " + id + " not found");
        }
    }

    public List<Product> getProductByCategoryId(List<Long> categoriesId) {
        List<Category> categories = categoryRepository.findAllById(categoriesId);
        return productRepository.findByCategoryIn(categories);
    }

    public List<Product> getProductsByCategoryName(List<String> categoriesName) {
        List<Category> categories = categoryRepository.findAllByNameIn(categoriesName);
        return productRepository.findByCategoryIn(categories);
    }

    public List<Product> getProductByFeaturesId(Set<Long> featuresId) {
        Set<Feature> features = new HashSet<>(featureRepository.findAllById(featuresId));
        List<Product> products = productRepository.findByFeatureIn(features);
        products.removeIf(product -> !product.getFeature().containsAll(features));
        return products;
    }

    public Set<Product> getProductByFeaturesName(Set<String> featuresName) {
        Set<Feature> features = new HashSet<>(featureRepository.findAllByNameIn(featuresName));
        Set<Product> products = new HashSet<>(productRepository.findByFeatureIn(features));
        products.removeIf(product -> !product.getFeature().containsAll(features));
        return products;
    }

    public List<Product> getAllProductFilter(String city, Set<Long> categoriesId, Set<Long> featuresId) {
        Specification<Product> spec = Specification.where(null);

        if (StringUtils.isNotBlank(city)) {
            spec = spec.and((root, query, builder) ->
                    builder.equal(root.get("location").get("city"), city)
            );
        }

        if (!categoriesId.isEmpty()) {
            spec = spec.and((root, query, builder) ->
                    root.join("category").get("id").in(categoriesId)
            );
        }

        if (!featuresId.isEmpty()) {
            spec = spec.and((root, query, builder) ->
                    root.join("feature").get("id").in(featuresId)
            );
        }

        return productRepository.findAll(spec);
    }

    public Set<Product> getAvailableProducts() {
        return productRepository.findByAvailable(true);
    }

    public Set<Map<String, Object>> findProductWithModifiedImages(Long id) {
        Set<Map<String, Object>> modifiedImagesList = new HashSet<>();

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        for (int i = 1; i <= 13; i++) {
            Map<String, Object> modifiedImage = new HashMap<>();
            modifiedImage.put("id", i);
            modifiedImage.put("url", product.getImageUrl() + i + ".png");
            modifiedImagesList.add(modifiedImage);
        }
        return modifiedImagesList;
    }

    public PaginatedResponse<Product> getAllProducts(int page, int perPage) {
        Page<Product> productsPage = productRepository.findAll(PageRequest.of(page - 1, perPage));

        PaginatedResponse<Product> paginatedResponse = new PaginatedResponse<>();
        paginatedResponse.setPage(productsPage.getNumber() + 1);
        paginatedResponse.setPer_page(productsPage.getSize());
        paginatedResponse.setTotal(productsPage.getTotalElements());
        paginatedResponse.setTotal_pages(productsPage.getTotalPages());
        paginatedResponse.setData(productsPage.getContent());

        return paginatedResponse;
    }

    public PaginatedResponse<Product> getAvailableProductsByPage(int page, int perPage) {
        PaginatedResponse<Product> allProducts = getAllProducts(page, perPage);
        List<Product> products = allProducts.getData();
        List<Product> availableProducts = products.stream()
                .filter(Product::getAvailable)
                .collect(Collectors.toList());
        allProducts.setData(availableProducts);
        return allProducts;
    }

    public boolean existsById(Long id) {
        return productRepository.existsById(id);
    }

    public Set<Product> getAllActiveProduct() {
        return productRepository.findAll().stream()
                .filter(product -> !product.getDeleted())
                .collect(Collectors.toSet());
    }

    public PaginatedResponse<Product> getproductsByPage(int page, int perPage) {
        Page<Product> productsPage = productRepository.findAll(PageRequest.of(page - 1, perPage));

        PaginatedResponse<Product> paginatedResponse = new PaginatedResponse<>();
        paginatedResponse.setPage(productsPage.getNumber() + 1);
        paginatedResponse.setPer_page(productsPage.getSize());
        paginatedResponse.setTotal(productsPage.getTotalElements());
        paginatedResponse.setTotal_pages(productsPage.getTotalPages());
        paginatedResponse.setData(productsPage.getContent());

        return paginatedResponse;
    }

    public Set<Product> getAvailableProduct() {
        return productRepository.findByAvailable(true);
    }
}
