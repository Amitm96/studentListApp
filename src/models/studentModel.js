const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        Name : {
            type: String,
            required : true
        },

        Subject : {
            type : String,
            required : true,
        },

        Marks : {
            type : Number,
            required : true
        },
        isDeleted : {
            type : Boolean,
            default : false
        },
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : "User"
        }
    },{timestamps : true}
);

module.exports = mongoose.model("Student" , studentSchema)