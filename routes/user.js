import express from 'express';

const router = express.Router();





import { UtilisateurSignUp , login ,ProfilePicUpload ,DoctorSignUp, getAllUsers, ProfileEdit,   forgetPasssword, verifyOtp, resetPassword,sendOTP, DoctorInfos, getAllSpecialities } from '../controllers/user.js';
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
  .get(authAdminSup,getAllUsers)

router
  .route('/editProfile')
  .patch(auth,ProfileEdit)

  
  


 export default  router;