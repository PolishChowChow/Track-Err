import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const get_error_record = async(req, res, next) => {
    const error_record = await prisma.errorRecords.findFirst({
        where: {
            id: req.params.id
        }
    })
    if(error_record === null){
        return res.status(404).json({
            error: "Record not found"
        })
    }
    return res.status(200).json({
        data: error_record
    })
}

const get_all_error_records = async(req, res, next) => {
    const error_records = await prisma.errorRecords.findMany();
    if(error_records.length < 1){
        return res.status(404).json({
            error: "Records not found"
        })
    }
    return res.status(200).json({
        data: error_records
    })
}

const save_error_record = async(req, res, next) => {
    console.log(req.body)
    await prisma.errorRecords.create({
        data: {
            ...req.body,
            date: new Date()
        }
    }).then(() =>{
        return res.status(201).json({
            message: "success",
        })
    }).catch(error => {
        return res.json({
            error
        })
    })
}

const update_error_record = async(req, res, next) => {
    await prisma.errorRecords.update({
        where: {
            id: req.params.id
        },
        body: {
            ...req.body
        }
    }).then((response) => {
        return res.json({
            response
        })
    }).catch(error => {
        return res.status(404).json({
            error
        })
    })
}

const delete_error_record = async(req, res, next) => {
    await prisma.errorRecords.delete({
        where: {
            id: req.params.id
        }
    }).then((response) => {
        return res.json({
            response
        })
    }).catch(error => {
        return res.status(404).json({
            error
        })
    })
}

const delete_all_error_records = async(req, res, next) => {
    await prisma.errorRecords.deleteMany()
    .then((response) => {
        return res.status(200).json({
            message: `${response.count} records were deleted`
        })
    }).catch(error => {
        return res.status(404).json({
            error
        })
    })
}

export default {
    get_error_record,
    get_all_error_records,
    save_error_record,
    update_error_record,
    delete_error_record,
    delete_all_error_records
}