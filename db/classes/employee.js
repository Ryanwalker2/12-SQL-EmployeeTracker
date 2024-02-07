const role = require('./role.js')

class employee extends role {
    constructor(id, department, role, salary) {
        super(department, role, salary),
        this.id = id
    }
}

module.exports = employee;