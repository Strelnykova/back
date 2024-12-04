class CreateUsedResourceDTO {
    constructor({ resourceId, quantityUsed, unitId, userId, description }) {
        this.resourceId = resourceId;
        this.quantityUsed = quantityUsed;
        this.unitId = unitId;
        this.userId = userId;
        this.description = description || null; 
    }
}

module.exports = CreateUsedResourceDTO;