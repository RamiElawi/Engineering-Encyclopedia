const router=require('express').Router();
const getDataController=require('../controller/getdata');


router.get('/Services',getDataController.getServices);

router.get('/Services/:serviceId',getDataController.getServiceId);

router.get('/STL',getDataController.getSTL);

router.get('/STL/:stlId',getDataController.getSTLId);

router.get('/',getDataController.getMaterials);

router.get('/:materialId',getDataController.getmaterialId);

module.exports=router;