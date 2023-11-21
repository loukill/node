import jwt from 'jsonwebtoken' ;


 
export function auth (req, res, next)  {
    
   try {
    const token = req.headers.authorization.split(' ')[1];    
       const decodedToken = jwt.verify(token, ""+process.env.JWT_SECRET);
       const userId = decodedToken.userId;
       const role = decodedToken.role;
       const email = decodedToken.email;
       const numTel = decodedToken.numTel;
       req.auth = {
           userId: userId,
           role : role,
           email: email, 
           numTel: numTel,   
       };
	next();
   } catch(error) {
       res.status(401).json({message : 'user is not authenticated'});
   }
}
export function authDoctor(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, ""+process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        const email = decodedToken.email;
        const numTel = decodedToken.numTel;
        req.auth = {
            userId: userId,
            role : role,
            email: email, 
            numTel: numTel,   
        };
    if (req.auth.role === 'Doctor') {
      next(); 
    } else {
      res.status(403).json({ message: 'Access denied. You are not a doctor.' });
    }
  }catch(error){
    res.status(401).json({message : 'user is not authenticated'});

  }
} 
  
  export function authUtilisateur(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, ""+process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        const email = decodedToken.email;
        const numTel = decodedToken.numTel;
        req.auth = {
            userId: userId,
            role : role,
            email: email, 
            numTel: numTel,   
        };
    if (req.auth.role === 'Utilisateur') {
      next(); 
    } else {
      res.status(403).json({ message: 'Access denied. You are not a utilisateur.' });
    }
  }catch(error){
    res.status(401).json({message : 'user is not authenticated'});

  }
}
  
 
  
 
  export function authAdminSup(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, ""+process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        const email = decodedToken.email;
        const numTel = decodedToken.numTel;
        req.auth = {
            userId: userId,
            role : role,
            email: email, 
            numTel: numTel,   
        };
    if (req.auth.role === 'AdminSup') {
      next(); 
    } else {
      res.status(403).json({ message: 'Access denied. You are not an admin supervisor.' });
    }
  }catch(error){
    res.status(401).json({message : 'user is not authenticated'});

  }
}

export default auth;