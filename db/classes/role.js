const department = require('./department');

class role extends department {
    constructor(department, role, salary) {
        super(department),
        this.role = role,
        this.salary = salary
    }
}

module.exports = role;