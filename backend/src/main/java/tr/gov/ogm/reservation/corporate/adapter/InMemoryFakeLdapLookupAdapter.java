package tr.gov.ogm.reservation.corporate.adapter;
import tr.gov.ogm.reservation.corporate.port.LdapLookupPort;
import java.util.Map;
import org.springframework.stereotype.Component;
@Component
public class InMemoryFakeLdapLookupAdapter implements LdapLookupPort {
    // TODO: Replace this adapter with the real LDAP integration when that external system is available.
    private static final Map<String, String> DIRECTORY = Map.of("test.personel", "test@ogm.gov.tr");
    @Override public boolean emailMatches(String ldapUsername, String email) { return email != null && email.equalsIgnoreCase(DIRECTORY.get(ldapUsername)); }
}
