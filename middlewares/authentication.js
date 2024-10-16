const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        // // If the token cookie is not present, send a 401 response and return immediately
        if (!tokenCookieValue) {
            return next();
        }

        try {
            // Validate the token
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload; // Optionally attach the payload to req.user
        } catch (error) {return res.render("signin.ejs")}

        // Proceed to the next middleware if everything is fine
        next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
};
