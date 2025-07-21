/**
 * @swagger
 * tags:
 *   name: Instructor Profile
 *   description: Instructor profile management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     InstructorProfile:
 *       type: object
 *       required:
 *         - phoneNumber
 *         - expertise
 *         - experience
 *         - bio
 *       properties:
 *         phoneNumber:
 *           type: string
 *           example: "+1234567890"
 *         expertise:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Web Development", "JavaScript", "React"]
 *         experience:
 *           type: number
 *           example: 5
 *         bio:
 *           type: string
 *           example: "Experienced instructor with passion for teaching"
 *         socialLinks:
 *           type: object
 *           properties:
 *             website:
 *               type: string
 *               example: "https://example.com"
 *             linkedin:
 *               type: string
 *               example: "https://linkedin.com/in/instructor"
 *             github:
 *               type: string
 *               example: "https://github.com/instructor"
 */

/**
 * @swagger
 * /instructor/create-instructor-profile:
 *   post:
 *     tags: [Instructor Profile]
 *     summary: Create a new instructor profile
 *     description: Create instructor profile for authenticated user
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InstructorProfile'
 *     responses:
 *       201:
 *         description: Instructor profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Instructor profile created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/InstructorProfile'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - User not logged in
 *
 * /instructor/update-instructor-profile:
 *   patch:
 *     tags: [Instructor Profile]
 *     summary: Update instructor profile
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InstructorProfile'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/InstructorProfile'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *
 * /instructor/verify-instructor-profile:
 *   get:
 *     tags: [Instructor Profile]
 *     summary: Verify instructor profile
 *     description: Check if instructor profile exists for logged in user
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
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Profile verified successfully"
 *                 hasProfile:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized
 */
