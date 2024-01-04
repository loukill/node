import express from 'express';

const router = express.Router();





import { UtilisateurSignUp , login ,ProfilePicUpload ,DoctorSignUp, getAllUsers, ProfileEdit,   forgetPasssword, verifyOtp, resetPassword,sendOTP, DoctorInfos, getAllSpecialities,banUser,unbanUser } from '../controllers/user.js';
 import { auth, authAdminSup ,authDoctor ,authUtilisateur  } from '../middelwares/auth.js'; 



router
  .route('/UtilisateurSignUp')
  .post(UtilisateurSignUp);

router
  .route('/sendOTP')
  .post(sendOTP)

router
  .route('/forgetPassword')
  .post(forgetPasssword)

  router
  .route('/resetPassword')
  .put(resetPassword)
router
  .route('/verifyOTP')
  .post(verifyOtp)

  router
  .route('/DoctorSignup')
  .post(DoctorSignUp);
  router
  .route('/DoctorInfos')
  .patch(DoctorInfos);

router
  .route('/login')
  .post(login);

router
  .route('/updatePicture')
  .patch(auth,ProfilePicUpload);

router
  .route('/AllUsers')
  .get(getAllUsers)

router
  .route('/editProfile')
  .patch(auth,ProfileEdit)

  router.put('/:id/unban', unbanUser);

// Ban user route
router.put('/:id/ban', banUser);


 export default  router;