const { app } = require('./app')
const positionModule = require('./position')
const companyModule = require('./company')
const userModule = require('./user')

positionModule.getPosition()
positionModule.getAllPosition()
companyModule.getCompany()
companyModule.getAllCompany()
userModule.registry()
userModule.login()

app.listen(8804,'127.0.0.1');
