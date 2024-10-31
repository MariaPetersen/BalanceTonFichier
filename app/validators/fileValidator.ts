import { body } from "express-validator";

export const fileValidator = [
   body('file')
      .custom((value: any, { req }) => {
        if (!req.file) {
            throw new Error('No file uploaded');
         }
        const maxSize = 2e+9; // 2GB
         if (req.file.size > maxSize) {
            throw new Error('File too large');
         }
        return true;
      })
];