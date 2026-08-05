package tr.gov.ogm.reservation.room;
import tr.gov.ogm.reservation.common.exception.BusinessException;
import tr.gov.ogm.reservation.room.dto.RoomRequest;
import tr.gov.ogm.reservation.room.dto.RoomResponse;
import tr.gov.ogm.reservation.room.dto.RoomStatusRequest;
import tr.gov.ogm.reservation.room.dto.RoomUpdateRequest;
import java.util.List;
import java.time.LocalDate;
import tr.gov.ogm.reservation.reservation.ReservationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service @Transactional
public class RoomService {
    private final RoomRepository roomRepository;
    private final ReservationRepository reservationRepository;
    public RoomService(RoomRepository roomRepository, ReservationRepository reservationRepository) { this.roomRepository = roomRepository; this.reservationRepository = reservationRepository; }
    @Transactional(readOnly = true) public List<RoomResponse> findAll() { return roomRepository.findAll().stream().filter(room -> !room.isDelete()).map(RoomResponse::from).toList(); }
    @Transactional(readOnly = true) public List<RoomResponse> findAvailable(LocalDate checkIn, LocalDate checkOut) {
        if (checkIn == null && checkOut == null) return findAll();
        if (checkIn == null || checkOut == null || !checkOut.isAfter(checkIn)) throw new BusinessException(HttpStatus.BAD_REQUEST, "INVALID_DATE_RANGE", "Both valid check-in and check-out dates are required.");
        return roomRepository.findAll().stream().filter(room -> !room.isDelete()).filter(room -> room.getManualStatus() == null || room.getManualStatus() == RoomStatus.BOS)
                .filter(room -> !reservationRepository.hasOverlappingReservation(room, checkIn, checkOut)).map(RoomResponse::from).toList();
    }
    public RoomResponse create(RoomRequest request) {
        if (roomRepository.existsByRoomNumber(request.no())) throw new BusinessException(HttpStatus.CONFLICT, "ROOM_NUMBER_EXISTS", "Room number already exists.");
        return RoomResponse.from(roomRepository.save(Room.create(request.no(), request.kat(), request.tip().trim(), request.kapasite())));
    }
    public RoomResponse update(int roomNumber, RoomUpdateRequest request) { Room room = room(roomNumber); room.update(request.kat(), request.tip().trim(), request.kapasite()); return RoomResponse.from(room); }
    public RoomResponse updateManualStatus(int roomNumber, RoomStatusRequest request) { Room room = room(roomNumber); room.overrideStatus(request.manuelDurum()); return RoomResponse.from(room); }
    public Room room(int roomNumber) { return roomRepository.findByRoomNumberAndIsDeleteFalse(roomNumber).orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "ROOM_NOT_FOUND", "Room not found.")); }
}
