const catchAsync = require('../../utils/catchAsync');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

exports.authenticate = catchAsync(async (req, res, next) => {
	// console.log(req.headers['authorization'])

	if (req.headers['authorization']) {
		try {
			let authorization = req.headers['authorization'].split(' ');
			if (authorization[0] !== 'Bearer') {
				throw new Error('Bearer Missing in token')
			} else {
				req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
				return next();
			}
		} catch (err) {
			res.status(403).json({message: "Invalid User", success: false, status: "Forbidden"})
			// throw new Error('invalid User')
			
		}
	} else {
		res.status(401).json({message: "Token Not Found", success: false, status: "Unauthorized"})
		// throw new Error('Token Not Found')
	}
});

exports.restrictTo = (...role) => {
	return (req, res, next) => {
		if (!role.includes(req.user.role)) {
			return next(new AppError(ERRORS.UNAUTHORIZED.UNAUTHORIZE, STATUS_CODE.UNAUTHORIZED));
		}
		next();
	};
};