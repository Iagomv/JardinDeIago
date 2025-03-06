package Models.Clientes;

import java.util.ArrayList;
import java.util.List;

public class Cliente {
    private String id;
    private String createdAt;
    private boolean emailVerified;
    private String passwordUpdatedAt;
    private String lastLoginAt;
    private String validSince;
    private List<String> jardines;
    private String lastRefreshAt;
    private String localId;
    private String email;
    private String passwordHash;

    public Cliente(String id, String createdAt, boolean emailVerified, String passwordUpdatedAt, String lastLoginAt,
            String validSince, List<String> jardines, String lastRefreshAt, String localId, String email,
            String passwordHash) {
        this.id = id;
        this.createdAt = createdAt;
        this.emailVerified = emailVerified;
        this.passwordUpdatedAt = passwordUpdatedAt;
        this.lastLoginAt = lastLoginAt;
        this.validSince = validSince;
        this.jardines = jardines != null ? jardines : new ArrayList<>();
        this.lastRefreshAt = lastRefreshAt;
        this.localId = localId;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getPasswordUpdatedAt() {
        return passwordUpdatedAt;
    }

    public void setPasswordUpdatedAt(String passwordUpdatedAt) {
        this.passwordUpdatedAt = passwordUpdatedAt;
    }

    public String getLastLoginAt() {
        return lastLoginAt;
    }

    public void setLastLoginAt(String lastLoginAt) {
        this.lastLoginAt = lastLoginAt;
    }

    public String getValidSince() {
        return validSince;
    }

    public void setValidSince(String validSince) {
        this.validSince = validSince;
    }

    public List<String> getJardines() {
        return jardines;
    }

    public void setJardines(List<String> jardines) {
        this.jardines = jardines;
    }

    public void addJardin(String biomaJardin) {

        if (!jardines.contains(biomaJardin))
            jardines.add(biomaJardin);
    }

    public void removeJardin(String biomaJardin) {
        jardines.remove((biomaJardin));
    }

    public String getLastRefreshAt() {
        return lastRefreshAt;
    }

    public void setLastRefreshAt(String lastRefreshAt) {
        this.lastRefreshAt = lastRefreshAt;
    }

    public String getLocalId() {
        return localId;
    }

    public void setLocalId(String localId) {
        this.localId = localId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
}