import { Request, Response } from 'express';
import ComplaintCategory from '../models/complaintCategory';
import io from 'socket.io';

const getClientComplaintCategoriesPaginated = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1; 
    const limit = parseInt(req.query.limit as string) || 15; 

    const skip = (page - 1) * limit;

    // Find client complaint categories paginated
    const clientComplaintCategories = await ComplaintCategory.find({createdBy: (req as any).userId })
      .skip(skip)
      .limit(limit);

    res.status(200).json(clientComplaintCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getClientComplaintCategoryDetails = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.id;
  
      // Find the client complaint category by its ID
      const category = await ComplaintCategory.findOne({ _id: categoryId, createdBy: (req as any).userId });
  
      if (!category) {
        return res.status(404).json({ message: 'Client complaint category not found' });
      }
  
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  const addComplaintCategory = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
  
      // Create a new complaint category
      const category = new ComplaintCategory({
        name,
        createdBy: (req as any).userId
      });
  
      // Save the category to the database
      await category.save();
  
      res.status(201).json({ message: 'Complaint category added successfully', category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  const updateComplaintCategory = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.id;
      const { name } = req.body;
  
      // Find the category by its ID
      const category = await ComplaintCategory.findOneAndUpdate(
        { _id: categoryId, createdBy: (req as any).userId }, // Filter by ID and createdBy
        { name }, // Update the name
        { new: true } // Return the updated document
      );
  
      if (!category) {
        return res.status(404).json({ message: 'Complaint category not found' });
      }
  
      res.status(200).json({ message: 'Complaint category updated successfully', category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  const deleteComplaintCategory = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.id;
  
      // Find and delete the category by its ID and createdBy
      const deletedCategory = await ComplaintCategory.findOneAndDelete({
        _id: categoryId,
        createdBy: (req as any).userId
      });
  
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Complaint category not found' });
      }
  
      res.status(200).json({ message: 'Complaint category deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  const getAllClientsComplaints = async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10, status, userId } = req.query;
  
      // Parse page and limit query parameters
      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);
  
      // Create filter object based on query parameters
      const filter: any = {};
      if (status) {
        filter.status = status;
      }
      if (userId) {
        filter.userId = userId;
      }
  
      // Find all clients' complaints based on filters, sorted by creation date
      const complaints = await ComplaintCategory.find(filter)
        .sort({ createdAt: -1 }) // Sort by creation date descending
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);
  
      res.status(200).json(complaints);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const updateComplaintStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the complaint by its ID and update its status
    const updatedComplaint = await ComplaintCategory.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
// event to notify the concerned user
  io.emit('complaintStatusUpdated', {complaintId: id, newStatus: status});

    res.status(200).json({ message: 'Complaint status updated successfully', complaint: updatedComplaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
  
export default { getClientComplaintCategoriesPaginated,getClientComplaintCategoryDetails,addComplaintCategory,updateComplaintCategory,deleteComplaintCategory,getAllClientsComplaints,updateComplaintStatus };
