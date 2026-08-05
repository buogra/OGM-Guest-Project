package tr.gov.ogm.reservation.room.dto;
import tr.gov.ogm.reservation.room.Floor;
import tr.gov.ogm.reservation.room.Room;
import tr.gov.ogm.reservation.room.RoomStatus;
public record RoomResponse(int no, Floor kat, String tip, int kapasite, RoomStatus otomatikDurum, RoomStatus manuelDurum, RoomStatus durum) {
    public static RoomResponse from(Room room) { return new RoomResponse(room.getRoomNumber(), room.getFloor(), room.getRoomType(), room.getCapacity(), room.getAutomaticStatus(), room.getManualStatus(), room.visibleStatus()); }
}
