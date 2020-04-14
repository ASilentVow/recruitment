const { app } = require('./app')
const positionModule = require('./position')
const companyModule = require('./company')
const userModule = require('./user')
const resumeModule = require('./resume')

positionModule.getPosition()
positionModule.getAllPosition()
positionModule.getPositionById()
positionModule.getPositionInfo()
companyModule.getCompany()
companyModule.getAllCompany()
companyModule.getCompanyById()
userModule.registry()
userModule.login()
resumeModule.saveResume()
resumeModule.getResume()

app.listen(8804,'127.0.0.1');
