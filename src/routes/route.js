const express = require("express");
const router = express.Router();
const {createUser , login} = require("../controllers/userController")
const {createStudent , getStudent , updateStudent , deleteStudent} = require("../controllers/studentController")
const authenticate = require("../middleware/authentication")

// user apis 
router.post("/user/createUser" , createUser )
router.post("/user/login" , login)

// studentsapis
router.post("/user/createstudent" , authenticate , createStudent)
router.get("/user/studentlist" , authenticate , getStudent)
router.put("/user/updatestudent/:studentId" , authenticate , updateStudent)
router.delete("/user/deletestudent/:studentId" , authenticate , deleteStudent)

module.exports = router
