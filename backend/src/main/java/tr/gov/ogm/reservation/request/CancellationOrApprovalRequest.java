package tr.gov.ogm.reservation.request;
import tr.gov.ogm.reservation.common.entity.BaseEntity;
import tr.gov.ogm.reservation.reservation.Reservation;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
@Getter @Entity @Table(name = "reservation_requests")
public class CancellationOrApprovalRequest extends BaseEntity {
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private RequestType type;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "reservation_id", nullable = false) private Reservation reservation;
    @Column(nullable = false) private LocalDateTime requestDate;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 16) private RequestStatus status;
    @Column(length = 1000) private String notes;
    protected CancellationOrApprovalRequest() { }
    private CancellationOrApprovalRequest(RequestType type, Reservation reservation, String notes) { this.type = type; this.reservation = reservation; this.notes = notes; this.requestDate = LocalDateTime.now(); this.status = RequestStatus.BEKLIYOR; }
    public static CancellationOrApprovalRequest create(RequestType type, Reservation reservation, String notes) { return new CancellationOrApprovalRequest(type, reservation, notes); }
    public void approve() { this.status = RequestStatus.ONAYLANDI; }
    public void reject() { this.status = RequestStatus.REDDEDILDI; }
}
