const router=require('express').Router();
const getDataController=require('../controller/getdata');
const isAuth=require('../util/isAuth')
const checkRole=require('../util/checkRole')


router.get('/Services',isAuth,checkRole(['admin','USER']),getDataController.getServices);

router.get('/Services/:serviceId',isAuth,checkRole(['admin','USER']),getDataController.getServiceId);

router.get('/STL',isAuth,getDataController.getSTL);

router.get('/STL/:stlId',isAuth,getDataController.getSTLId);

router.get('/material',isAuth,getDataController.getMaterials);

router.get('/material/:materialId',isAuth,getDataController.getmaterialId);

router.get('/downloadSTLFile/:stlId',isAuth,getDataController.downloadSTLFile)

module.exports=router;