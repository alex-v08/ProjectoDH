package com.oceanwinds.reservee.service;

import com.oceanwinds.product.entity.Product;
import com.oceanwinds.product.repository.ProductRepository;
import com.oceanwinds.reservee.entity.Reservee;
import com.oceanwinds.reservee.entity.dto.ReserveeDto;
import com.oceanwinds.reservee.repository.ReserveeRepository;
import com.oceanwinds.user.entity.User;
import com.oceanwinds.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ReserveeService {

    private final ReserveeRepository reserveeRepository;
    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    @Autowired
    public ReserveeService(ReserveeRepository reserveeRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.reserveeRepository = reserveeRepository;
    }

    @Transactional
    public Reservee createReservee(ReserveeDto reserveeDto) {
        Reservee reservee = new Reservee();

        reservee.setDateInit(reserveeDto.getDateInit());
        reservee.setDateEnd(reserveeDto.getDateEnd());

        User user = userRepository.findById(reserveeDto.getUser_id()).orElse(null);
        reservee.setUser(user);

        Product product = productRepository.findById(reserveeDto.getProduct_id()).orElse(null);
        assert product != null;
        product.setAvailable(false);
        reservee.setProduct(product);

        reservee.setActive(true);
        return reserveeRepository.save(reservee);
    }

    @Transactional
    public Reservee updateReservee(Long id, ReserveeDto reserveeDto) {
        // Busca la entidad Reservee por su ID
        Optional<Reservee> existingReservee = reserveeRepository.findById(id);
        if (existingReservee.isPresent()) {
            Reservee reservee = existingReservee.get();
            // Actualiza los campos necesarios desde el DTO
            reservee.setDateInit(reserveeDto.getDateInit());
            reservee.setDateEnd(reserveeDto.getDateEnd());

            reservee.setActive(false);
            // Actualiza otros campos si es necesario
            // reservee.setUser(user);
            // reservee.setProduct(product);
            return reserveeRepository.save(reservee);
        } else {
            // Manejo de error si no se encuentra la entidad
            throw new IllegalArgumentException("Reservee with ID " + id + " not found");
        }
    }

    @Transactional
    public void deleteReservee(Long id) {
        // Busca la entidad Reservee por su ID
        Optional<Reservee> reservee = reserveeRepository.findById(id);
        if (reservee.isPresent()) {
            // Elimina la entidad
            reservee.get().setActive(false);
        } else {
            // Manejo de error si no se encuentra la entidad
            throw new IllegalArgumentException("Reservee with ID " + id + " not found");
        }
    }

    public List<Reservee> getAllReservees() {
        // Recupera todas las entidades Reservee
        return reserveeRepository.findAll();
    }

    public Reservee getReserveeById(Long id) {
        // Recupera la entidad Reservee por su ID
        Optional<Reservee> reservee = reserveeRepository.findById(id);
        return reservee.orElse(null);
    }

    public List<Reservee> getReserveesByUserId(Long userId) {
        // Recupera todas las entidades Reservee asociadas a un usuario específico
        return reserveeRepository.findByUserId(userId);
    }

    public List<Reservee> getReserveesByProductId(Long productId) {
        // Recupera todas las entidades Reservee asociadas a un producto específico
        return reserveeRepository.findByProductId(productId);
    }


}
