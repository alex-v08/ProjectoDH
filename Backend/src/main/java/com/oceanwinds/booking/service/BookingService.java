package com.oceanwinds.booking.service;

import com.oceanwinds.product.entity.Product;
import com.oceanwinds.product.repository.ProductRepository;
import com.oceanwinds.booking.entity.Booking;
import com.oceanwinds.booking.entity.dto.BookingDto;
import com.oceanwinds.booking.repository.BookingRepository;
import com.oceanwinds.user.entity.User;
import com.oceanwinds.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
    }

    @Transactional
    public Booking createReservee(BookingDto bookingDto) {
        Booking booking = new Booking();

        booking.setDateInit(bookingDto.getDateInit());
        booking.setDateEnd(bookingDto.getDateEnd());

        User user = userRepository.findById(bookingDto.getUser_id()).orElse(null);
        booking.setUser(user);

        Product product = productRepository.findById(bookingDto.getProduct_id()).orElse(null);
        assert product != null;
        product.setAvailable(false);
        booking.setProduct(product);

        booking.setActive(true);
        return bookingRepository.save(booking);
    }

    @Transactional
    public Booking updateReservee(Long id, BookingDto bookingDto) {
        // Busca la entidad Reservee por su ID
        Optional<Booking> existingReservee = bookingRepository.findById(id);
        if (existingReservee.isPresent()) {
            Booking booking = existingReservee.get();
            // Actualiza los campos necesarios desde el DTO
            booking.setDateInit(bookingDto.getDateInit());
            booking.setDateEnd(bookingDto.getDateEnd());

            booking.setActive(false);
            // Actualiza otros campos si es necesario
            // reservee.setUser(user);
            // reservee.setProduct(product);
            return bookingRepository.save(booking);
        } else {
            // Manejo de error si no se encuentra la entidad
            throw new IllegalArgumentException("Reservee with ID " + id + " not found");
        }
    }

    @Transactional
    public void deleteReservee(Long id) {
        // Busca la entidad Reservee por su ID
        Optional<Booking> reservee = bookingRepository.findById(id);
        if (reservee.isPresent()) {
            // Elimina la entidad
            reservee.get().setActive(false);
        } else {
            // Manejo de error si no se encuentra la entidad
            throw new IllegalArgumentException("Reservee with ID " + id + " not found");
        }
    }

    public List<Booking> getAllReservees() {
        // Recupera todas las entidades Reservee
        return bookingRepository.findAll();
    }

    public Booking getReserveeById(Long id) {
        // Recupera la entidad Reservee por su ID
        Optional<Booking> reservee = bookingRepository.findById(id);
        return reservee.orElse(null);
    }

    public List<Booking> getReserveesByUserId(Long userId) {
        // Recupera todas las entidades Reservee asociadas a un usuario específico
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getReserveesByProductId(Long productId) {
        // Recupera todas las entidades Reservee asociadas a un producto específico
        return bookingRepository.findByProductId(productId);
    }


}
