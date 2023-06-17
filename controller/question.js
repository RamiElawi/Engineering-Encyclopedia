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
            questionId:requiredQuestion.id
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
    let numberRightAnswers=0;
    let rightAnswers=[]; 
    return db.question.findAll({where:{lessonid:lessonId}})
    .then(questions=>{
        questions.forEach(question=>{
            rightAnswers.push(question.rightAnswer)
        })
        return rightAnswers
    })
    .then(rightAnswers=>{
        answerId.forEach(answer=>{
            rightAnswers.forEach(rightAnswer=>{
                if(answer == rightAnswer){
                    numberRightAnswers++;
                }
            })
        })
        return numberRightAnswers;
    })
    .then(()=>{
        return db.question.count({where:{lessonId:lessonId}})
    })
    .then(questionCount=>{
        let halfNumberQuestion=questionCount/2;
        if(numberRightAnswers >= halfNumberQuestion){
            return db.lesson.findOne({where:{id:lessonId+1}})
            .then(lesson=>{
                if(!lesson){
                    return res.status(200).json({message:'you are pass the course'})
                }
                lesson.done=1;
                lesson.save();
                return res.status(200).json({message:"you are pass the exam and you can see the next lesson"})
            })
            .catch(err=>{
                if(err.statusCode){
                    err.statusCode=500;
                }
                next(err);
            })
        }else{
            return res.status(200).json({message:'you did not pass the exam and you should retake the exam'})
        }
    })
    .catch(err=>{
        if(err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })

}

