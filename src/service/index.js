const { app } = require('./app')
const positionModule = require('./getPosition')
const companyModule = require('./getCompany')

positionModule.getPosition()
positionModule.getAllPosition()
companyModule.getCompany()
companyModule.getAllCompany()

app.listen(8804,'127.0.0.1');
