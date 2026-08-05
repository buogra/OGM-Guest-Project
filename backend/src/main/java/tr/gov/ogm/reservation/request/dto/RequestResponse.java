package tr.gov.ogm.reservation.request.dto;
import tr.gov.ogm.reservation.request.CancellationOrApprovalRequest;
import tr.gov.ogm.reservation.request.RequestStatus;
import tr.gov.ogm.reservation.request.RequestType;
import java.time.LocalDateTime;
public record RequestResponse(Long id, RequestType tip, String rezNo, String misafirAdi, int odaNo, LocalDateTime tarih, RequestStatus durum, String notlar) {
    public static RequestResponse from(CancellationOrApprovalRequest request) { return new RequestResponse(request.getId(), request.getType(), request.getReservation().getReservationNumber(), request.getReservation().getGuestName(), request.getReservation().getRoom().getRoomNumber(), request.getRequestDate(), request.getStatus(), request.getNotes()); }
}
