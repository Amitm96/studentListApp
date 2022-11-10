const studentModel = require("../models/studentModel");

const createStudent = async function(req , res){
    try{
        let {Name , Subject , Marks} = req.body
        let userId = req.userId
        if(typeof(Name) != "string" || Name.trim().length == 0){
            return res.status(400).send({status : false , message : "Enter valid Name"})
        }
        if(typeof(Subject) != "string" || Subject.trim().length == 0){
            return res.status(400).send({status : false , message : "Enter valid Subject"})
        }
        if(typeof(Marks) != "number"){
            return res.status(400).send({status : false , message : "Enter valid Number"})
        }
        let existStudent = await studentModel.findOne({Name : Name , Subject : Subject , userId : userId})
        if(existStudent){
            existStudent.Marks += Marks
            await existStudent.save()
            return res.status(201).send({status : true , message : "student created successfully" , data : existStudent})
        }
        let student = await studentModel.create({Name : Name , Subject : Subject , Marks : Marks , userId : userId})
        return res.status(201).send({status : true , message : "student created successfully" , data : student})
    }
    catch(err){
        return res.status(500).send({status : false , message : err.message})
    }
}

const getStudent = async function(req , res){
    try{
        let userId = req.userId
        let name = req.query.name
        let subject = req.query.subject
        let filter = {userId : userId , isDeleted : false}
        if(name){
            filter.Name = name
        }
        if(subject){
            filter.Subject = subject
        }

        let studentList = await studentModel.find(filter)
        res.status(200).send({status : true , message : studentList})
    }
    catch(err){
        return res.status(500).send({status : false , message : err.message})
    }
}

const updateStudent = async function(req , res){
    try{
        let updatedata = req.body
        let studentId = req.params.studentId
        if(!updatedata){
            return res.status(400).send({status : false , message : "provide data to be updated"})
        }
        let student = await studentModel.findOne({_id : studentId , isDeleted : false});
        if(updatedata.Name){
            student.Name = updatedata.Name
        }
        if(updatedata.Subject){
            student.Subject = updatedata.Subject
        }
        if(updatedata.Marks){
            student.Marks = updatedata.Marks
        }

        await student.save()
        return res.status(200).send({status : true , message : student})

    }
    catch(err){
        return res.status(500).send({status : false , message : err.message})
    }
}

const deleteStudent = async function(req , res){
    try{
        let studentId = req.params.studentId
        let student = await studentModel.findOne({studentId : studentId , isDeleted : false})
        student.isDeleted = true
        await student.save()
        return res.status(200).send({status : true , message : "Student deleted successfully"})
    }
    catch(err){
        return res.status(500).send({status : false , message : err.message})
    }
}

module.exports = {createStudent , getStudent , updateStudent , deleteStudent}