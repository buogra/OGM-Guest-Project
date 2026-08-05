package tr.gov.ogm.reservation.reservation;
import tr.gov.ogm.reservation.common.exception.BusinessException;
import tr.gov.ogm.reservation.reservation.dto.*;
import tr.gov.ogm.reservation.room.*;
import tr.gov.ogm.reservation.user.User;
import tr.gov.ogm.reservation.user.UserRepository;
import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service @Transactional
public class ReservationService {
    private final ReservationRepository reservationRepository; private final RoomService roomService; private final UserRepository userRepository;
    public ReservationService(ReservationRepository reservationRepository, RoomService roomService, UserRepository userRepository) { this.reservationRepository = reservationRepository; this.roomService = roomService; this.userRepository = userRepository; }
    public ReservationResponse create(CreateReservationRequest request) {
        if (!request.cikis().isAfter(request.giris())) throw new BusinessException(HttpStatus.BAD_REQUEST, "INVALID_DATE_RANGE", "Check-out must be after check-in.");
        Room room = roomService.room(request.odaNo());
        if ((room.getManualStatus() != null && room.getManualStatus() != RoomStatus.BOS) || reservationRepository.hasOverlappingReservation(room, request.giris(), request.cikis())) throw new BusinessException(HttpStatus.CONFLICT, "ROOM_UNAVAILABLE", "Room is not available for the selected dates.");
        User user = currentUser();
        String prefix = "REZ-" + Year.now().getValue() + "-";
        Reservation reservation = Reservation.create(prefix + String.format("%06d", reservationRepository.countByReservationNumberStartingWith(prefix) + 1), request.misafirAdi().trim(), room, request.giris(), request.cikis(), user);
        room.refreshAutomaticStatus(RoomStatus.REZERVE);
        return ReservationResponse.from(reservationRepository.save(reservation));
    }
    public ReservationResponse createForStaff(CreateReservationRequest request, ReservationStatus status) {
        if (!request.cikis().isAfter(request.giris())) throw new BusinessException(HttpStatus.BAD_REQUEST, "INVALID_DATE_RANGE", "Check-out must be after check-in.");
        Room room = roomService.room(request.odaNo());
        if ((room.getManualStatus() != null && room.getManualStatus() != RoomStatus.BOS) || reservationRepository.hasOverlappingReservation(room, request.giris(), request.cikis())) throw new BusinessException(HttpStatus.CONFLICT, "ROOM_UNAVAILABLE", "Room is not available for the selected dates.");
        String prefix = "REZ-" + Year.now().getValue() + "-";
        Reservation reservation = Reservation.create(prefix + String.format("%06d", reservationRepository.countByReservationNumberStartingWith(prefix) + 1), request.misafirAdi().trim(), room, request.giris(), request.cikis(), null);
        reservation.changeStatus(status == null ? ReservationStatus.BEKLEMEDE : status);
        Reservation saved = reservationRepository.save(reservation);
        refreshRoomStatus(room);
        return ReservationResponse.from(saved);
    }
    @Transactional(readOnly = true) public List<ReservationResponse> mine() { return reservationRepository.findByUserAndIsDeleteFalseOrderByCheckInDateDesc(currentUser()).stream().map(ReservationResponse::from).toList(); }
    @Transactional(readOnly = true) public List<ReservationResponse> all() { return reservationRepository.findAll().stream().filter(r -> !r.isDelete()).map(ReservationResponse::from).toList(); }
    public ReservationResponse changeStatus(Long id, ReservationStatusRequest request) { Reservation reservation = find(id); reservation.changeStatus(request.durum()); refreshRoomStatus(reservation.getRoom()); return ReservationResponse.from(reservation); }
    public void delete(Long id) { Reservation reservation = find(id); reservation.softDelete(); refreshRoomStatus(reservation.getRoom()); }
    public void cancel(Reservation reservation) { reservation.changeStatus(ReservationStatus.IPTAL); refreshRoomStatus(reservation.getRoom()); }
    Reservation find(Long id) { return reservationRepository.findById(id).filter(r -> !r.isDelete()).orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "RESERVATION_NOT_FOUND", "Reservation not found.")); }
    public Reservation findOwnedByCurrentUser(Long id) {
        Reservation reservation = find(id);
        if (!reservation.getUser().getId().equals(currentUser().getId())) throw new BusinessException(HttpStatus.FORBIDDEN, "RESERVATION_FORBIDDEN", "You cannot modify this reservation.");
        return reservation;
    }
    private User currentUser() { String email = SecurityContextHolder.getContext().getAuthentication().getName(); return userRepository.findByEmailAndIsDeleteFalse(email).orElseThrow(() -> new BusinessException(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED", "Authentication required.")); }
    private void refreshRoomStatus(Room room) { if (!reservationRepository.findActiveByRoomAndStatus(room, ReservationStatus.CHECK_IN).isEmpty()) room.refreshAutomaticStatus(RoomStatus.DOLU); else if (!reservationRepository.findActiveByRoomAndStatus(room, ReservationStatus.ONAYLI).isEmpty() || !reservationRepository.findActiveByRoomAndStatus(room, ReservationStatus.BEKLEMEDE).isEmpty()) room.refreshAutomaticStatus(RoomStatus.REZERVE); else room.refreshAutomaticStatus(RoomStatus.BOS); }
}
