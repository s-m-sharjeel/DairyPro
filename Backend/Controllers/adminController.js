const express = require("express");
const adminRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AdminModel } = require("../Models/adminModel");
require("dotenv").config();

//admin registration
async function adminRegistration (req, res) {
	const { name, shopName, email, password } = req.body;
  try {

    
    // Check if an admin with the same email already exists
    const isAdmin = await AdminModel.findOne({ email });
    if (isAdmin) {
      return res
        .status(400)
        .json({ msg: "Admin  already exists" });
    } 
	else {
      bcrypt.hash(password, 5, async (error, hash) => {
        try {
          if (error) {
            res.status(500).json({ error: error.message });
          } else {
            const newAdmin = new AdminModel({
              ...req.body,

              password: hash,
              key: password,
            });

            const admin = await newAdmin.save();
            
            const payload= {id:admin.id};
            

            // Respond with the saved admin
            jwt.sign(
              payload,
              process.env.TOKEN_API_SECRET_KEY,
              { expiresIn: "12h" },
              (err, token) => 
              {
                if (err) throw err;
        
                res
                  .status(201)
                  .json({
                     msg: "Admin Registration Successfully done" ,
                     token,
                     user:{id: user._id,
                     username: user.user,
                     mobile: user.mobile,

                    }

                    });
              }
            );
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });
    }
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(400).json({ error: error.message });
  }
};



const registerAdmin = async (req, res) => {
  const { name, email, password} = req.body;
  try {
      let admin = await AdminModel.findOne({ email });
      if (admin) {
          return res.status(200).json({ message: 'Admin already exists' });
      }
      const salt = await bcrypt.genSalt(10);
		  const hashedPassword = await bcrypt.hash(password, salt);
      admin = new AdminModel({ ...req.body,key:password,password:hashedPassword});
      await admin.save();

      const payload = { id: admin.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

      res.status(200).json({ message: "Registration successfull", token,admin:{name:admin.name,email:admin.email,mobile:admin.mobile,id:admin.id,shopName:admin.shopName}});
  } catch (error) {
     
      res.status(500).json({message:'Server Error',error:error.message});
  }
};

// admin login
const adminLogin = async (req, res) => {
  try {
    // Extract login credentials from the request body
    const { email, password } = req.body;

    // Find the admin with the specified mobile
    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      return res.status(200).json({ error: "Invalid credentials"});
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(200).json({ error: "Invalid email or password" });
    }

    // Generate a unique token upon successful login
    const payload={id:admin.id}
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    // Respond with the generated token
    res.status(200).send({ 
      message: "Loign successfull",
       token,
      admin:{
        name:admin.name,
        mobile:admin.mobile,
        email:admin.email,
        shopName:admin.shopName,
        id:admin.id }
      });
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
};


// current user
const getCurrentUser = async (req, res) => {
 
	try {
		res.status(200).json({admin:req.admin ,"message":"user logged in successfully "});
	} catch (error) {
		res.status(500).send({"message":error.message,error:error.message})
  }
};

const logoutUser = async (req, res, next) => {
	try {
		res.clearCookie("token", { httpOnly: true });
		// req.session.destroy();
		return res.status(200).json({ message: "Logout successful!" });
	} catch (error) {
		res.status(500).send({"msg":error})
	}
};

module.exports = {
  adminRegistration,
  adminLogin,
  getCurrentUser,
  logoutUser,
  registerAdmin
  
};
