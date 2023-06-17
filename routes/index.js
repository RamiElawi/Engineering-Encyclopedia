const route=require('express').Router();


const authRoutes=require('./auth');
const serviceRouter=require('./service')
const courseRouter=require('./course')
const materialRouter=require('./material')
const stlRouter=require('./STL');
const projectRouter=require('./project');
const commentRouter=require('./comment')
const lessonRouter=require('./lesson')
const getDataRouter=require('./getdata');
const userRouter=require('./user')
const questionRouter=require('./question')
const featureRouter=require('./feature')
const paymentRouter=require('./payment')


route.use('/admin/auth',authRoutes);
route.use('/auth',authRoutes);
route.use('/admin/service',serviceRouter);
route.use('/service',serviceRouter);
route.use('/admin/user',userRouter);
route.use('/user',userRouter);
route.use('/admin/course',courseRouter)
route.use('/course',courseRouter)
route.use('/admin/material',materialRouter)
route.use('/material',materialRouter)
route.use('/admin/STL',stlRouter);
route.use('/STL',stlRouter);
route.use('/admin/Project',projectRouter);
route.use('/Project',projectRouter);
route.use('/admin/Lesson',lessonRouter)
route.use('/Lesson',lessonRouter)
route.use('/Comment',commentRouter)
route.use('/getData',getDataRouter)
route.use('/question',questionRouter)
route.use('/admin/feature',featureRouter)
route.use('/feature',featureRouter)
route.use('/payment',paymentRouter)


module.exports=route;