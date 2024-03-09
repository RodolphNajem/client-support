import express from 'express';
import adminController from '../controllers/admin';

const router = express.Router();

router.get('/client-complaint-categories', adminController.getClientComplaintCategoriesPaginated);
router.get('/client-complaint-categories/:id', adminController.getClientComplaintCategoryDetails);
router.post('/client-complaint-categories', adminController.addComplaintCategory);
router.put('/client-complaint-categories/:id', adminController.updateComplaintCategory);
router.delete('/client-complaint-categories/:id', adminController.deleteComplaintCategory);
router.get('/clients-complaints', adminController.getAllClientsComplaints);
router.put('/complaints/:id/status', adminController.updateComplaintStatus);

export default router;
