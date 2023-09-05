package com.oceanwinds.booking.service;

import Global.exceptions.ResourceNotFoundException;
import com.oceanwinds.booking.entity.BookingMessage;
import com.oceanwinds.booking.entity.BookingRating;
import com.oceanwinds.booking.entity.dto.MediaRatingDto;
import com.oceanwinds.booking.entity.dto.RatingDto;
import com.oceanwinds.booking.repository.BookingMessageRepository;
import com.oceanwinds.booking.repository.BookingRatingRepository;
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

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final BookingRatingRepository bookingRatingRepository;
    private final BookingMessageRepository bookingMessageRepository;

    private final ProductRepository productRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, BookingRatingRepository bookingRatingRepository, BookingMessageRepository bookingMessageRepository, ProductRepository productRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.bookingRatingRepository = bookingRatingRepository;
        this.bookingMessageRepository = bookingMessageRepository;
        this.productRepository = productRepository;
    }



    @Transactional
    public Booking createReserve(BookingDto bookingDto) {
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
    public void deleteReserve(Long id) {
        // Busca la entidad Reserve por su ID
        Optional<Booking> reserve = bookingRepository.findById(id);
        if (reserve.isPresent()) {
            // Elimina la entidad
            reserve.get().setActive(false);
        } else {
            // Manejo de error si no se encuentra la entidad
            throw new IllegalArgumentException("Reservee with ID " + id + " not found");
        }
    }

    public List<Booking> getAllReserves() {
        // Recupera todas las entidades Reservee
        return bookingRepository.findAll();
    }

    public Booking getReserveById(Long id) {
        // Recupera la entidad Reservee por su ID
        Optional<Booking> reserve = bookingRepository.findById(id);
        return reserve.orElse(null);
    }
    @Transactional
    public List<Booking> getReservesByUserId(Long userId) {
        // Recupera todas las entidades Reservee asociadas a un usuario específico
        return null;
    }
    @Transactional
    public List<Booking> getReservesByProductId(Long productId) {
        // Recupera todas las entidades Reservee asociadas a un producto específico
        return null;
    }

    @Transactional
    public void addMessageToBooking(Long bookingId, BookingMessage message) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        Booking booking = bookingOptional.get();
        if (bookingOptional.isPresent() && booking.getComplete()) {
            message.setBooking(booking);
            message.setUuid(booking.getUser().getUuid());
            booking.setMessage(bookingMessageRepository.save(message));
            bookingRepository.save(booking);
        } else {
            throw new IllegalArgumentException("Booking with ID " + bookingId + " not found or complete");
        }
    }


    @Transactional
    public void addRatingToBooking(Long bookingId, BookingRating rating) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        Booking booking = bookingOptional.get();
        if (bookingOptional.isPresent() && booking.getComplete()) {
            rating.setBooking(booking);
            rating.setUuid(booking.getUser().getUuid());
            booking.setRating(bookingRatingRepository.save(rating));
            bookingRepository.save(booking);
        } else {
            throw new IllegalArgumentException("Booking with ID " + bookingId + " not found or complete");
        }

    }

    @Transactional
    public Booking updateReserve(Long id, BookingDto bookingDto) throws IllegalAccessException {

        Booking booking = bookingRepository.findById(id).orElseThrow(IllegalAccessException::new);

        booking.setDateInit(bookingDto.getDateInit());
        booking.setDateEnd(bookingDto.getDateEnd());
        booking.setActive(true);
        return bookingRepository.save(booking);
    }

    @Transactional
    public Booking completeReserve(Long id) {
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        booking.setComplete(true);
        return bookingRepository.save(booking);
    }

    @Transactional
    public List<RatingDto> getAllRatings(Long id) {
        List<Booking> bookings = bookingRepository.findAll().stream().filter(booking -> booking.getProduct().getId().equals(id)).toList();
        List<RatingDto> ratings = new ArrayList<>();

        for(Booking reserve: bookings){
            RatingDto ratingDto = new RatingDto();

            ratingDto.setDate(reserve.getMessage().getDateMessage());
            ratingDto.setName(reserve.getUser().getName() + " " + reserve.getUser().getLastName());
            ratingDto.setRating(reserve.getRating().getRating());
            ratingDto.setMessage(reserve.getMessage().getMessage());

            ratings.add(ratingDto);
        }
        return  ratings;
    }

    public MediaRatingDto getMediaRating(Long id) {
        List<Booking> bookings = bookingRepository.findAll().stream().filter(booking -> booking.getProduct().getId().equals(id)).toList();
        bookings = bookings.stream().filter(booking -> booking.getComplete().equals(true)).toList();
        MediaRatingDto mediaRatingDto = new MediaRatingDto();

        Double media;
        int sum= 0;
        int cont=0;

        for(Booking reserve:bookings){
            sum += reserve.getRating().getRating();
            cont++;
        }

        media = Double.valueOf(sum) / Double.valueOf(cont);
        DecimalFormat decimalFormat = new DecimalFormat("#.#");

        mediaRatingDto.setTotalRatings(cont);
        mediaRatingDto.setMedia(decimalFormat.format(media));

        return mediaRatingDto;
    }
}
