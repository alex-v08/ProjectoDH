package com.oceanwinds.booking.service;

import Global.exceptions.ResourceNotFoundException;
import com.oceanwinds.booking.entity.BookingMessage;
import com.oceanwinds.booking.entity.BookingRating;
import com.oceanwinds.booking.entity.dto.MediaRatingDto;
import com.oceanwinds.booking.entity.dto.RatingDto;
import com.oceanwinds.booking.repository.BookingMessageRepository;
import com.oceanwinds.booking.repository.BookingRatingRepository;
import com.oceanwinds.mail.service.EmailService;
import com.oceanwinds.product.entity.Product;
import com.oceanwinds.product.repository.ProductRepository;
import com.oceanwinds.booking.entity.Booking;
import com.oceanwinds.booking.entity.dto.BookingDto;
import com.oceanwinds.booking.repository.BookingRepository;
import com.oceanwinds.user.entity.User;
import com.oceanwinds.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final BookingRatingRepository bookingRatingRepository;
    private final BookingMessageRepository bookingMessageRepository;

    private final ProductRepository productRepository;
    private final EmailService emailSender;
    private final ExecutorService emailExecutor = Executors.newSingleThreadExecutor();





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

        booking.setDateCreated(LocalDateTime.now());
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
        return  bookingRepository.findAll();
    }

    public Booking getReserveById(Long id) {
        // Recupera la entidad Reservee por su ID
        Optional<Booking> reserve = bookingRepository.findById(id);
        return reserve.orElse(null);
    }
    @Transactional
    public List<Booking> getReservesByUserId(Long userId) {
        // Recupera todas las entidades Reservee asociadas a un usuario específico
        List<Booking> bookings = bookingRepository.findAll().stream().filter(booking -> booking.getUser().getId().equals(userId)).toList();
       return  bookings;
    }
    @Transactional
    public List<Booking> getReservesByProductId(Long productId) {
        // Recupera todas las entidades Reservee asociadas a un producto específico
        List<Booking> bookings = bookingRepository.findAll().stream().filter(booking -> booking.getProduct().getId().equals(productId)).toList();
        return bookings;
    }
    @Transactional
        public List<Map<String, Object>> getReservesDateByProductId(Long productId) {
            List<Map<String, Object>> result = new ArrayList<>();


            List<Booking> bookings = bookingRepository.findAll().stream()
                    .filter(booking -> booking.getProduct().getId().equals(productId))
                    .collect(Collectors.toList());

            for (Booking booking : bookings) {
                Map<String, Object> bookingInfo = new HashMap<>();
                bookingInfo.put("starDate", booking.getDateInit());
                bookingInfo.put("endDate", booking.getDateEnd());
                result.add(bookingInfo);
            }

            return result;
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
        List<Booking> bookings = bookingRepository.findAllByProduct_Id(id);
        List<Booking>  filteredBookings = bookings.stream().filter(booking -> booking.getComplete().equals(true)).toList();
        filteredBookings = filteredBookings.stream().filter(booking -> booking.getRating() != null).toList();
        List<RatingDto> ratings = new ArrayList<>();

        for(Booking reserve: filteredBookings){
            RatingDto ratingDto = new RatingDto();

            ratingDto.setDate(reserve.getMessage().getDateMessage());
            ratingDto.setName(reserve.getUser().getName() + " " + reserve.getUser().getLastName());
            ratingDto.setRating(reserve.getRating().getRating());
            ratingDto.setMessage(reserve.getMessage().getMessage());
            ratingDto.setPhotoUrl(reserve.getMessage().getPhotoURL());

            ratings.add(ratingDto);
        }
        return  ratings;
    }

    public MediaRatingDto getMediaRating(Long id) {
        List<Booking> bookings = bookingRepository.findAllByProduct_Id(id);
        bookings = bookings.stream().filter(booking -> booking.getComplete().equals(true)).toList();
        bookings = bookings.stream().filter(booking -> booking.getRating() != null).toList();
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

    public BookingMessage editBookingMessage(Long messageId, String message) {
        BookingMessage bookingMessage = bookingMessageRepository.findById(messageId).get();
        if (bookingMessage.getMessage().isEmpty()){
            throw new RuntimeException("Message with id " + messageId + "not found");
        }else{
            bookingMessage.setMessage(message);
            bookingMessage.setDateMessage(LocalDate.now());
            return bookingMessageRepository.save(bookingMessage);
        }
    }

    public BookingRating editBookingRating(Long ratingId, int rating) {
        BookingRating bookingRating = bookingRatingRepository.findById(ratingId).orElse(null);
        if (bookingRating == null){
            throw new RuntimeException("Rating with id " + ratingId + "not found");
        }else{
            bookingRating.setRating(rating);
            return bookingRatingRepository.save(bookingRating);
        }
    }
    @Scheduled(cron = "0 0 0 * * *")
    public void sendEmailsForUpcomingBookings() {
        LocalDate currentDate = LocalDate.now();
        LocalDate twoDaysFromNow = currentDate.plusDays(2);

        List<Booking> upcomingBookings = bookingRepository.findByDateEndBetweenAndCompleteFalse(currentDate, twoDaysFromNow);

        for (Booking booking : upcomingBookings) {
            User user = booking.getUser();
            String to = user.getEmail();
            String subject = "Tu reserva está a punto de finalizar";
            String message = "Tu reserva está programada para finalizar en 2 días. ¡Por favor, asegúrate de tomar las medidas necesarias si deseas extenderla o prepararte para su finalización!";

            emailExecutor.execute(() -> sendEmail(to, subject, message));
        }
    }

    private Object sendEmail(String to, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        try {

            emailSender.sendEmail(to, subject, message);
        } catch (Exception e) {

            e.printStackTrace();
        }
        return null;
    }

    public void sendEmailAsync(String to, String subject, String message) {
            emailExecutor.execute(() -> sendEmail(to, subject, message));
        }


    @Scheduled(cron = "0 0 0 * * *")
    public void autoSetBookingComplete(){
        List<Booking> bookings = bookingRepository.findAll();

        for(Booking reserve: bookings){
            if(reserve.getDateEnd().isBefore(LocalDate.now())){
                reserve.setComplete(true);
            }
        }
    }
}
