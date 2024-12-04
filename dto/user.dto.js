class UserDTO {
    constructor(username, email, password, role, unitId) {
        this.username = username;
        this.email = email; 
        this.password = password;
        this.role = role; 
        this.unitId = unitId;
    }
}

    module.exports = UserDTO;
