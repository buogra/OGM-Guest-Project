package tr.gov.ogm.reservation.room;

import tr.gov.ogm.reservation.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;

@Getter
@Entity
@Table(name = "rooms")
public class Room extends BaseEntity {
    @Column(nullable = false, unique = true) private int roomNumber;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 16) private Floor floor;
    @Column(nullable = false, length = 50) private String roomType;
    @Column(nullable = false) private int capacity;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 16) private RoomStatus automaticStatus;
    @Enumerated(EnumType.STRING) @Column(length = 16) private RoomStatus manualStatus;
    protected Room() { }
    private Room(int roomNumber, Floor floor, String roomType, int capacity) {
        this.roomNumber = roomNumber; this.floor = floor; this.roomType = roomType; this.capacity = capacity;
        this.automaticStatus = RoomStatus.BOS;
    }
    public static Room create(int roomNumber, Floor floor, String roomType, int capacity) { return new Room(roomNumber, floor, roomType, capacity); }
    public void update(Floor floor, String roomType, int capacity) { this.floor = floor; this.roomType = roomType; this.capacity = capacity; }
    public void overrideStatus(RoomStatus manualStatus) { this.manualStatus = manualStatus; }
    public void refreshAutomaticStatus(RoomStatus automaticStatus) { this.automaticStatus = automaticStatus; }
    public RoomStatus visibleStatus() { return manualStatus == null ? automaticStatus : manualStatus; }
}
