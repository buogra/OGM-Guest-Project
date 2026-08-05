package tr.gov.ogm.reservation.request;
import tr.gov.ogm.reservation.common.exception.BusinessException;
import tr.gov.ogm.reservation.reservation.Reservation;
import tr.gov.ogm.reservation.reservation.ReservationService;
import tr.gov.ogm.reservation.reservation.ReservationStatus;
import tr.gov.ogm.reservation.request.dto.CancellationRequest;
import tr.gov.ogm.reservation.request.dto.RequestResponse;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service @Transactional
public class RequestService {
    private final RequestRepository requestRepository; private final ReservationService reservationService;
    public RequestService(RequestRepository requestRepository, ReservationService reservationService) { this.requestRepository = requestRepository; this.reservationService = reservationService; }
    public RequestResponse createCancellation(CancellationRequest input) {
        Reservation reservation = reservationService.findOwnedByCurrentUser(input.reservationId());
        if (reservation.getStatus() == ReservationStatus.IPTAL || reservation.getStatus() == ReservationStatus.CHECK_OUT) throw new BusinessException(HttpStatus.CONFLICT, "RESERVATION_NOT_CANCELLABLE", "This reservation cannot be cancelled.");
        if (requestRepository.existsByReservationIdAndTypeAndStatus(reservation.getId(), RequestType.IPTAL_TALEBI, RequestStatus.BEKLIYOR)) throw new BusinessException(HttpStatus.CONFLICT, "REQUEST_ALREADY_EXISTS", "A cancellation request is already pending.");
        return RequestResponse.from(requestRepository.save(CancellationOrApprovalRequest.create(RequestType.IPTAL_TALEBI, reservation, input.notlar())));
    }
    @Transactional(readOnly = true) public List<RequestResponse> pending(RequestType type) { List<CancellationOrApprovalRequest> requests = type == null ? requestRepository.findByStatusAndIsDeleteFalse(RequestStatus.BEKLIYOR) : requestRepository.findByStatusAndTypeAndIsDeleteFalse(RequestStatus.BEKLIYOR, type); return requests.stream().map(RequestResponse::from).toList(); }
    public RequestResponse approve(Long id) { CancellationOrApprovalRequest request = request(id); request.approve(); if (request.getType() == RequestType.IPTAL_TALEBI) reservationService.cancel(request.getReservation()); return RequestResponse.from(request); }
    public RequestResponse reject(Long id) { CancellationOrApprovalRequest request = request(id); request.reject(); return RequestResponse.from(request); }
    private CancellationOrApprovalRequest request(Long id) { return requestRepository.findById(id).filter(r -> !r.isDelete() && r.getStatus() == RequestStatus.BEKLIYOR).orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "REQUEST_NOT_FOUND", "Pending request not found.")); }
}
