class ResourceDTO {
    constructor(type, name, quantity, unit, description) {
        this.type = type; 
        this.name = name; 
        this.quantity = quantity;
        this.unit = unit;
        this.description = description; 
    }
}  

module.exports = ResourceDTO;