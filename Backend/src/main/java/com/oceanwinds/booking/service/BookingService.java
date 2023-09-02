package com.oceanwinds.booking.service;

import com.oceanwinds.booking.entity.BookingMessage;
import com.oceanwinds.booking.entity.BookingRating;
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

        product.setAvailable(false);
        booking.setProduct(product);

        booking.setActive(true);
        return bookingRepository.save(booking);
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
    @Transactional
    public List<Booking> getReserveesByUserId(Long userId) {
        // Recupera todas las entidades Reservee asociadas a un usuario específico
        return null;
    }
    @Transactional
    public List<Booking> getReserveesByProductId(Long productId) {
        // Recupera todas las entidades Reservee asociadas a un producto específico
        return null;
    }

    @Transactional
    public void addMessageToBooking(Long bookingId, BookingMessage message) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            message.setBooking(booking);
            booking.getMessages().add(message);
            bookingRepository.save(booking);
        } else {
            throw new IllegalArgumentException("Booking with ID " + bookingId + " not found");
        }
    }


    @Transactional
    public void addRatingToBooking(Long bookingId, BookingRating rating) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            rating.setBooking(booking);
            booking.getRating().add(rating);
            bookingRepository.save(booking);
        } else {
            throw new IllegalArgumentException("Booking with ID " + bookingId + " not found");
        }

    }
}
