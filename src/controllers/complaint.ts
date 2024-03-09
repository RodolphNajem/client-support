import { Request, Response } from 'express';
import ComplaintCategory from '../models/complaintCategory';
import Complaint from '../models/complaintCategory';

const getComplaintCategoriesByAdmin = async (req: Request, res: Response) => {
     try {
        // Extract admin user ID from request
    const adminUserId = (req as any).userId;  

    // Find complaint categories created by the admin user
    const categories = await ComplaintCategory.find({ createdBy: adminUserId });
    
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const submitComplaint = async (req: Request, res: Response) => {
    try {
      const { title, body, categories } = req.body;
  
      // Create a new complaint object with default status pending
      const complaint = new Complaint({
        title,
        body,
        categories
      });
  
      // Save the complaint to the database
      await complaint.save();
  
      res.status(201).json({ message: 'Complaint submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
 

const getComplaints = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1; 
    const limit = parseInt(req.query.limit as string) || 15; 

    // Calculate skip value based on page and limit
    const skip = (page - 1) * limit;

    // Find complaints paginated
    const complaints = await Complaint.find()
      .skip(skip)
      .limit(limit);

    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getComplaintDetails = async (req: Request, res: Response) => {
    try {
      const complaintId = req.params.id;
  
      // Find the complaint by its ID
      const complaint = await Complaint.findById(complaintId);
  
      if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' });
      }
  
      res.status(200).json(complaint);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  const deleteComplaint = async (req: Request, res: Response) => {
    try {
      const complaintId = req.params.id;
  
      // Find the complaint by its ID and remove it
      const deletedComplaint = await Complaint.findByIdAndDelete(complaintId);
  
      if (!deletedComplaint) {
        return res.status(404).json({ message: 'Complaint not found' });
      }
  
      res.status(200).json({ message: 'Complaint deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

export default { getComplaintCategoriesByAdmin, submitComplaint,getComplaints,getComplaintDetails,deleteComplaint };
