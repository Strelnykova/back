const express = require('express');
const usedResourcesController = require('../controllers/usedResourcesController');

const router = express.Router();

router.post('/', usedResourcesController.createUsedResource);
router.get('/', usedResourcesController.getAllUsedResources);
router.get('/:id', usedResourcesController.getUsedResourceById);
router.put('/:id', usedResourcesController.updateUsedResource);
router.delete('/:id', usedResourcesController.deleteUsedResource);

module.exports = router;
