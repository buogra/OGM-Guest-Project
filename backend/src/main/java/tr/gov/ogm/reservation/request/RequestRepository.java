package tr.gov.ogm.reservation.request;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
public interface RequestRepository extends JpaRepository<CancellationOrApprovalRequest, Long> {
    List<CancellationOrApprovalRequest> findByStatusAndIsDeleteFalse(RequestStatus status);
    List<CancellationOrApprovalRequest> findByStatusAndTypeAndIsDeleteFalse(RequestStatus status, RequestType type);
    boolean existsByReservationIdAndTypeAndStatus(Long reservationId, RequestType type, RequestStatus status);
}
