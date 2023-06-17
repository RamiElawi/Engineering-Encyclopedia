const router=require('express').Router();
const getDataController=require('../controller/getdata');
const isAuth=require('../util/isAuth')
const checkRole=require('../util/checkRole')


router.get('/Services',getDataController.getServices);

router.get('/Services/:serviceId',getDataController.getServiceId);

router.get('/STL',getDataController.getSTL);

router.get('/STL/:stlId',isAuth,getDataController.getSTLId);

router.get('/material',isAuth,getDataController.getMaterials);

router.get('/material/:materialId',isAuth,getDataController.getmaterialId);

router.get('/feature',isAuth,getDataController.getFeature)

router.get('/feature/:featureId',isAuth,getDataController.getFeaturelId)

router.get('/downloadSTLFile/:stlId',isAuth,getDataController.downloadSTLFile)

router.get('/Project',getDataController.getProject);

router.get('/Project/:projectId',getDataController.getProjectId);

router.get('/Course',getDataController.getCourses)

router.get('/Course/:courseId',getDataController.getCourseId)

router.post('/rate/:courseId',isAuth,getDataController.addRate)

router.get('/getCourseRate/:courseId',isAuth,getDataController.getCourseRate)

router.post('/like/:likeabelId/:likeabelType',isAuth,getDataController.Like)

router.post('/unlike/:likeabelId/:likeabelType',isAuth,getDataController.unLike)

router.get('/getCountCourse',getDataController.getCountCourse)

router.get('/getCountProject',getDataController.getCountProject)

router.get('/getCountSTL',getDataController.getCountSTL)

router.get('/mostRatedCourse/:number',getDataController.mostRatedCourse)

router.get('/mostRatedCourseOneUser/:number',isAuth,getDataController.mostRatedCourseOneUser)


module.exports=router;