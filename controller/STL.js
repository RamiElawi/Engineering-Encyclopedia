const db=require('../models')
const Op=require('sequelize').Op;

// create STL 
exports.addSTL=(req,res,next)=>{
    const stlName=req.body.stlName;
    const description=req.body.description;
    const width=req.body.width;
    const height=req.body.height;
    const length=req.body.length;
    const price=req.body.price;
    const materialId=req.body.materialId;
    const colorName=req.body.colorName;
    const featureId=req.body.featureId;
    let requiredSTL;
    const fileNumber=4;
   
// if user don't choose 4 files show error 
    if(Object.keys(req.files).length < fileNumber){
        const error=new Error('Did not choose Files');
        error.statusCode=422;
        throw error;
    }
    // create STL
    return db.STL.create({
        stlName:stlName,
        description:description,
        width:width,
        height:height,
        length:length,
        price:price,
        size:width*height*length,
        stlImage:req.files.stlImg[0].path,
        image:req.files.image[0].path,
        userId:req.userId
    })
    .then(stl=>{
        requiredSTL=stl;
        // if their are many material for required stl will loop on it and create many rows on material_SLT table
        if(Array.isArray(materialId)){
            return materialId.forEach(element => {
                db.material_STL.create({
                    materialId:element,
                    stlId:requiredSTL.id
                })
            });
        }else{
            // else will create one row on material_STL table
            return db.material_STL.create({
                materialId:materialId,
                stlId:requiredSTL.id
            })
        }
    })
    .then(()=>{
        // create images 
        return req.files.images.forEach(ele => {
            db.image.create({
                path:ele.path,
                stlId:requiredSTL.id
            })
        });
    })
    .then(()=>{
        // create file 
        return req.files.file.forEach(ele=>{
            db.file.create({
                path:ele.path,
                fileName:ele.originalname,
                fileabelId:requiredSTL.id,
                fileableType:'STL'
            })
        })
    })
    .then(()=>{
         // if their are many feature for required stl will loop on it and create many rows on feature_STL table
         if(Array.isArray(featureId)){
            return featureId.forEach(element => {
                db.feature_STL.create({
                    featureId:element,
                    stlId:requiredSTL.id
                })
            });
        }else{
            // else will create one row on feature_STL table
            return db.feature_STL.create({
                featureId:featureId,
                stlId:requiredSTL.id
            })
        }
    })
    .then(()=>{
        // if their are many color for required stl will loop on it and create many rows on color table
        if(Array.isArray(colorName)){
            return colorName.forEach(element => {
                db.color.create({
                    colorName:element,
                    stlId:requiredSTL.id
                })
            });
        }else{
            // else will create one row on color table
            return db.color.create({
                colorName:colorName,
                stlId:requiredSTL.id
            })
        }
    })
    .then(()=>{
        return res.status(200).json({message:"STL has been created"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

// update STL by Id
exports.updateSTL=(req,res,next)=>{
    const stlId=req.params.stlId;
    const stlName=req.body.stlName;
    const description=req.body.description;
    const width=req.body.width;
    const height=req.body.height;
    const length=req.body.length;
    const price=req.body.price;
    const materialId=req.body.materialId;
    const colorName=req.body.colorName;
    const featureId=req.body.featureId;
    // find stl by id
    db.STL.findOne({where:{id:stlId}})
    .then(stl=>{
        //if required stl is not found show error
        if(!stl){
            const error=new Error('This stl is not exists');
            error.statusCode=500;
            throw error;
        }
        // if someone else wants to edit show error 
        if(stl.userId!=req.userId){
            const error=new Error('You don\'t have authorization to update this STL')
            error.statsuCode=422;
            throw error;
        }
        stl.stlName=stlName;
        stl.description=description;
        stl.width=width;
        stl.height=height;
        stl.length=length;
        stl.price=price;
        stl.size=width*height*length;
        // if user don't choose stlImage will keep old stlImage
        if(!req.files.stlImg){
            stl.stlImage=stl.stlImage;
        }
        else{
            // else will change the stlImage and delete old stlImage from stlImage storage
            require('../util/clearImage').clearImage(stl.stlImage)
            stl.stlImage=req.files.stlImg[0].path;
        }
        // if user don't choose image will keep old stlImage
        if(!req.files.image){
            stl.stlImage=stl.image;
        }
        else{
            // else will change the image and delete old image from stlImage storage
            require('../util/clearImage').clearImage(stl.image)
            stl.stlImage=req.files.image[0].path;
        }
        return stl.save();
    })
    .then(stl=>{
        // find STL's material
        return db.material_STL.findAll({where:{stlId:stlId}})
    })
    .then(stl=>{
        // if user did not choose material id will keep old material
        if(!materialId){
            return 
        }
        // delete old rows 
        stl.forEach(ele=>{
            ele.destroy();
        })
        // create new rows
        if(Array.isArray(materialId)){
            return materialId.forEach(ele=>{
                db.material_STL.create({
                    stlId:stlId,
                    materialId:ele
                })
            })
        }else{
            return db.material_STL.create({
                stlId:stlId,
                materialId:materialId
            })
        }
    })
    .then(()=>{
        // find STL's images
        return db.image.findAll({where:{stlId:stlId}})
    })
    .then((image)=>{
        //if user didn't choose images will keep old images
        if(!req.files.images){
            return 
        }else{
            // First will delete old rows and create new rows
            image.forEach(ele=>{
                // delete image form stlImage file (the place we storage the image)
                require('../util/clearImage').clearImage(ele.path)
                ele.destroy()
            })
            req.files.images.forEach(ele=>{
                db.image.create({
                    path:ele.path,
                    stlId:stlId
                })
            })
        }
    })
    .then(()=>{
        // find STL's file
        return db.file.findAll({where:{fileabelId:stlId,fileableType:'STL'}})
    })
    .then(Files=>{
        // if user don't choose file will keep old file
        if(!req.files.file){
            return 
        }
        // First delete old rows and create new rows
        Files.forEach(ele=>{
            require('../util/clearImage').clearImage(ele.path)
            ele.destroy();
        })
        req.files.file.forEach(ele=>{
            db.file.create({
                path:ele.path,
                fileName:ele.originalname
                ,fileabelId:stlId,
                fileableType:'STL'
            })
        })
    })
    .then(()=>{
        return db.feature_STL.findAll({where:{stlId:stlId}})
    })
    .then((feature)=>{
        if(!featureId){
            return 
        }
        feature.forEach(ele=>{
            ele.destroy();
        })
         // if their are many feature for required stl will loop on it and create many rows on feature_STL table
         if(Array.isArray(featureId)){
            return featureId.forEach(element => {
                db.feature_STL.create({
                    featureId:element,
                    stlId:stlId
                })
            });
        }else{
            // else will create one row on feature_STL table
            return db.feature_STL.create({
                featureId:featureId,
                stlId:stlId
            })
        }
    })
    .then(()=>{
        return db.color.findAll({where:{stlId:stlId}})
    })
    .then(colors=>{
        if(!colorName){
            return 
        }
        colors.forEach(ele=>{
            ele.destroy();
        })
        // if their are many color for required stl will loop on it and create many rows on color table
        if(Array.isArray(colorName)){
            return colorName.forEach(element => {
                db.color.create({
                    colorName:element,
                    stlId:stlId
                })
            });
        }else{
            // else will create one row on color table
            return db.color.create({
                colorName:colorName,
                stlId:stlId
            })
        }
    })
    .then(()=>{
        res.status(200).json({message:"STL has been updated"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

// delete STL
exports.deleteSTL=(req,res,next)=>{
    const stlId=req.params.stlId;
    let requiredSTL;
    return db.STL.findOne({where:{id:stlId}})
    .then(stl=>{
        // if requirdSTL is not found show error
        if(!stl){
            const error=new Error('this stl is not found')
            error.statusCode=422;
            throw error;
        }
        if(stl.userId!=req.userId){
            const error=new Error('You don\'t have authorization to delete this STL')
            error.statusCode=422;
            throw error;
        }
        requiredSTL=stl;
        require('../util/clearImage').clearImage(stl.stlImage)
        require('../util/clearImage').clearImage(stl.image)
        return db.image.findAll({where:{stlId:stlId}})
    })
    .then(images=>{
        return images.forEach(ele=>{
            require('../util/clearImage').clearImage(ele.path);
            ele.destroy();
        })
    })
    .then(()=>{
        return db.file.findAll({where:{fileabelId:stlId,fileableType:'STL'}})
    })
    .then(files=>{
        return files.forEach(ele=>{
            require('../util/clearImage').clearImage(ele.path);
            ele.destroy();
        })
    })
    .then(()=>{
        return db.material_STL.findAll({where:{stlId:stlId}})
    })
    .then((mStl)=>{
        return mStl.forEach(ele=>{
            ele.destroy();
        })
    })
    .then(()=>{
        return requiredSTL.destroy();
    })
    .then(()=>{
        res.status(200).json({message:"STL has been deleted"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

// get STL to one user 
exports.getMySTL=(req,res,next)=>{
    const size=parseInt(req.query.size);
    const page=parseInt(req.query.page)||1;
    db.STL.findAll({where:{userId:req.userId},offset:((page-1)*size),limit:size,include:[{model:db.user},{model:db.image},{model:db.file},{model:db.material},{model:db.color},{model:db.feature},{model:db.project}]})
    .then(stls=>{
        if(!stls){
            const error=new Error('You do not have any STL');
            error.statsuCode=422;
            throw error;
        }
        return res.status(200).json({stls:stls})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
