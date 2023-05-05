const router=require('express').Router();
const getDataController=require('../controller/getdata');
const isAuth=require('../util/isAuth')
const checkRole=require('../util/checkRole')


router.get('/Services',isAuth,getDataController.getServices);

router.get('/Services/:serviceId',isAuth,getDataController.getServiceId);

router.get('/STL',isAuth,getDataController.getSTL);

router.get('/STL/:stlId',isAuth,getDataController.getSTLId);

router.get('/material',isAuth,getDataController.getMaterials);

router.get('/material/:materialId',isAuth,getDataController.getmaterialId);

router.get('/feature',isAuth,getDataController.getFeature)

router.get('/feature/:featureId',isAuth,getDataController.getFeaturelId)

router.get('/downloadSTLFile/:stlId',isAuth,getDataController.downloadSTLFile)

router.get('/stlLike/:stlId',isAuth,getDataController.stlLike)

router.get('/stlUnLike/:stlId',isAuth,getDataController.stlUnLike)

router.get('/Project',isAuth,getDataController.getProject);

router.get('/Project/:projectId',isAuth,getDataController.getPrjectId);

router.get('/projectLike/:stlId',isAuth,getDataController.projectLike);

router.get('/projectUnLike/:stlId',isAuth,getDataController.projectUnLike);

router.get('/Course',isAuth,getDataController.getCourses)

router.get('/Course/:courseId',isAuth,getDataController.getCourseId)

router.post('/rate/:courseId',isAuth,getDataController.addRate)


module.exports=router;