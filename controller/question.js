const db = require("../models");

exports.addQuestion=(req,res,next)=>{
    const text=req.body.text;
    const rightAnswer=req.body.rightAnswer;
    const answers=req.body.answers;
    const lessonId=req.params.lessonId
    let requiredQuestion;

    db.question.create({
        text:text,
        lessonId:lessonId
    })
    .then(question=>{
        requiredQuestion=question;
        return answers.forEach(element => {
            db.answer.create({
                content:element,
                questionId:question.id
            })
        });
    })
    .then(()=>{
        return db.answer.create({
            content:rightAnswer,
            questionId:question.id
        })
    })
    .then(answer=>{
        requiredQuestion.rightAnswer=answer.id;
        return requiredQuestion.save();
    })
    .then(()=>{
        return res.status(200).json({message:'Question has been created'});
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err)
    })
}

exports.updateQuestion=(req,res,next)=>{
    const questionId=req.params.questionId;
    const text=req.body.text;
    const rightAnswer=req.body.rightAnswer;
    const answers=req.body.answers;
    let requiredQuestion;

    db.question.findOne({where:{id:questionId}})
    .then(question=>{
        if(!question){
            const error=new Error('this question does not exists');
            error.statusCode=422;
            throw error;
        }
        requiredQuestion=question;
        question.text=text;
        return question.save();
    })
    .then(()=>{
        return db.answer.findAll({where:{questionId:questionId}})
    })
    .then(answer=>{
        answer.forEach(ele=>{
            ele.destroy()
        })
        return answers.forEach(ele=>{
            db.answer.create({
                content:ele,
                questionId:questionId
            })
        })
    })
    .then(()=>{
        return db.answer.create({
            content:rightAnswer,
            questionId:questionId
        })
    })
    .then(answer=>{
        requiredQuestion.rightAnswer=answer.id;
        return requiredQuestion.save();
    })
    .then(()=>{
        return res.status(200).json({message:'question has been updated'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err)
    })
}

exports.deleteQuestion=(req,res,next)=>{
    const questionId=req.params.questionId;
    let requiredQuestion;

    return db.question.findOne({where:{id:questionId}})
    .then(question=>{
        if(!question){
            const error=new Error('this question is not found')
            error.statusCode=422;
            throw error;
        }
        requiredQuestion=question;
        return db.answer.findAll({where:{questionId:questionId}})
    })
    .then(answer=>{
        return answer.forEach(ele=>{
            ele.destroy();
        })
    })
    .then(()=>{
        return requiredQuestion.destroy();
    })
    .then(()=>{
        return res.status(200).json({message:'question has been deleted'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    })
}

exports.getQuestion=(req,res,next)=>{
    const lessonId=req.params.lessonId;

    db.question.findAll({where:{lessonId:lessonId},include:[{model:db.answer}]})
    .then(questions=>{
        if(!questions){
            questions='you do not have any question for this lesson';
        }
        return res.status(200).json({questions:questions})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
exports.chooseAnswer=(req,res,next)=>{
    const answerId=req.body.answerId;
    const lessonId=req.body.lessonId;
    let numberRightAnswers;
    let i=0;
    return answerId.forEach(ele=>{
        db.user_answer.create({
            userId:req.userId,
            answerId:answerId
        })
    })
    .then(()=>{
        return db.question.findAll({where:{lessonId}})
    })
    .then(questions=>{
        return questions.forEach(question=>{
            if(question.rightAnswer == answerId[i]){
                numberRightAnswers++;
            }
        })
    })
    .then(()=>{
        return db.question.count({where:{lessonId}})
    })
    .then((counter)=>{
        let halfNumberQuestion=counter/2;
        if(numberRightAnswers >= halfNumberQuestion){
            
        }
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

