const { verifySignUp } = require("../../middlewares");

module.exports = function(app) {
    const controller = app.controllers.auth;
    const baseURL = '/api/auth';


    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        `${baseURL}/signup`,
        [
        verifySignUp.checkDuplicateUsernameOrEmail,
        ],
        controller.signup
    );

    app.post(`${baseURL}/signin`, controller.signin);
};