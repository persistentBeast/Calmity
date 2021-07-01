
class AppError extends Error{

    constructor(message, status_code){
        super();
        this.status_code=status_code;
        this.message=message;
    }

}

module.exports=AppError;