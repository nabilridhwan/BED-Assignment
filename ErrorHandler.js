class ResponseHandler{

    constructor(){
        this.RESPONSE_FORMAT = {
            error: null,
            message: null,
        }
    }

    response(req, res, statusCode, data){
        return res.status(statusCode).json(data);
    }

    unknownError(req, res){
        return this.knownError(req, res, 500, "Unknown Error")
    }

    knownError(req, res, statusCode, errorMessage){
        return this.response(req, res, statusCode, {
            error: true,
            message: errorMessage
        })
    }
}

module.exports = ResponseHandler;