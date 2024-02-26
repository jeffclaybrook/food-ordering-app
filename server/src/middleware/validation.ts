import { Request, Response, NextFunction } from "express"
import { body, validationResult } from "express-validator"

const handleValidationErrors = async (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 const errors = validationResult(req)
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() })
 }
 next()
}

export const validateMyUserRequest = [
 body("name").isString().notEmpty().withMessage("Name is required"),
 body("addressLine1").isString().notEmpty().withMessage("Address is required"),
 body("city").isString().notEmpty().withMessage("City is required"),
 body("country").isString().notEmpty().withMessage("Country is required"),
 handleValidationErrors
]

export const validateMyRestaurantRequest = [
 body("restuarantName").notEmpty().withMessage("Restaurant name is required"),
 body("city").notEmpty().withMessage("City is required"),
 body("country").notEmpty().withMessage("Country is required"),
 body("deliveryPrice").isFloat({ min: 0 }).withMessage("Delivery price must be a positive number"),
 body("estimatedDeliveryTime").isInt({ min: 0 }).withMessage("Estimated delivery time must be a positive number"),
 body("cusines").isArray().withMessage("Cusines must be an array").not().isEmpty().withMessage("Cuisines required"),
 body("menuItems").isArray().withMessage("Menu items must be an array"),
 body("menuItems.*.name").notEmpty().withMessage("Menu item name required"),
 body("menuItems.*.price").isFloat({ min: 0 }).withMessage("Menu item price required"),
 handleValidationErrors
]