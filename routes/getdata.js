const router=require('express').Router();
const getDataController=require('../controller/getdata');


router.get('/Services',getDataController.getServices);

router.get('/Services/:serviceId',getDataController.getServiceId);

router.get('/STL',getDataController.getSTL);

router.get('/STL/:stlId',getDataController.getSTLId);

router.get('/material',getDataController.getMaterials);

router.get('/material/:materialId',getDataController.getmaterialId);

router.get('/downloadSTLFile/:stlId',getDataController.downloadSTLFile)

module.exports=router;