import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt'; // Import bcrypt for password comparison
import connectDB from '../../utils/mongoose'; // Import MongoDB connection function
import User from '../../models/User'; // Import User model

// Connect to MongoDB
 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();
    console.log("abc");
  if (req.method === 'POST') {
    const { username, password } = req.body;
     console.log(req.body);
    try {
      // Find the user by username
      const user = await User.findOne({ username });
      console.log(user);
      // If user does not exist or password is incorrect, return error
      if (!user || (user.password !== password)) {
        console.log("fail");
        return res.status(401).json({ message: 'Invalid username or password' });
        
      }
      else if(user.password !== password){
        console.log("succes");
      }

      // If username and password are correct, return success
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' }); // Return error if method is not POST
  }
}
