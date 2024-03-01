import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt'; 
import connectDB from '../../utils/mongoose'; 
import User from '../../models/User'; 


 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();
    console.log("abc");
  if (req.method === 'POST') {
    const { username, password } = req.body;
     console.log(req.body);
    try {
      
      const user = await User.findOne({ username });
      console.log(user);
      
      if (!user || (user.password !== password)) {
        console.log("fail");
        return res.status(401).json({ message: 'Invalid username or password' });
        
      }
      else if(user.password !== password){
        console.log("succes");
      }

      
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' }); 
  }
}
