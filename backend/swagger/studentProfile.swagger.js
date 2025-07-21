/**
 * @swagger
 * tags:
 *   name: Student Profile
 *   description: Operations related to student profile management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SocialLinks:
 *       type: object
 *       properties:
 *         linkedin:
 *           type: string
 *           format: uri
 *         twitter:
 *           type: string
 *           format: uri
 *         facebook:
 *           type: string
 *           format: uri
 *         instagram:
 *           type: string
 *           format: uri
 *
 *     StudentProfile:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: objectId
 *         bio:
 *           type: string
 *           maxLength: 500
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *         socialLinks:
 *           $ref: '#/components/schemas/SocialLinks'
 *         education:
 *           type: string
 *         interests:
 *           type: array
 *           items:
 *             type: string
 *         verificationStatus:
 *           type: string
 *           enum: [not_requested, pending, verified, rejected]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /studentProfile/create-student-profile:
 *   post:
 *     tags: [Student Profile]
 *     summary: Create a new student profile
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - skills
 *               - interests
 *             properties:
 *               bio:
 *                 type: string
 *                 maxLength: 500
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               socialLinks:
 *                 $ref: '#/components/schemas/SocialLinks'
 *               education:
 *                 type: string
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Student profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request or validation error
 *       401:
 *         description: Unauthorized
 *
 * /studentProfile/update-student-profile:
 *   patch:
 *     tags: [Student Profile]
 *     summary: Update student profile
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               socialLinks:
 *                 $ref: '#/components/schemas/SocialLinks'
 *               education:
 *                 type: string
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 *
 * /studentProfile/verifyStudentProfile:
 *   get:
 *     tags: [Student Profile]
 *     summary: Request student profile verification
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Profile verification successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/VerificationDetails'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 *
 * components:
 *   schemas:
 *     VerificationDetails:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         role:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         isEmailVerified:
 *           type: boolean
 *         isVerifiedStudent:
 *           type: integer
 */
