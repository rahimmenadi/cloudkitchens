package com.example.orderservice.client;

import lombok.Data;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;

@FeignClient(name = "product-service")
public interface ProductClient {

    @GetMapping("/api/product/{productId}")
    ProductResponse getProductById(@PathVariable String productId);

    @Data
    class ProductResponse {
        private String id;
        private String name;
        private BigDecimal price;
        private String IdChef;
        private String imageUrl;
    }
}
