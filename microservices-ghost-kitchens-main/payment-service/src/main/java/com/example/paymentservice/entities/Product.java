package com.example.paymentservice.entities;

import lombok.*;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Product {
    private String id;
    private String name;
    private BigDecimal unitPrice;
    private int quantity;
    private BigDecimal totalPrice;
    private String chefId;
    private String imageUrl;
}