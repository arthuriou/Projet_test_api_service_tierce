import express from 'express'; 
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();


 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,              
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


router.post('/payement', async (req, res) => {
    console.log('Payement webhook received:', req.body);

    const { payment_id, status } = req.body;

   try {
    await transporter.sendMail({
      from: `"Paiement API" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "Confirmation de paiement",
      text: `Le paiement ${payment_id} a le statut : ${status}.`,
      html: `<h3>Paiement reçu</h3><p>ID: ${payment_id}</p><p>Statut: ${status}</p>`
    });

    console.log("✅ Email envoyé !");
    res.status(200).send({ received: true, email: "sent" });
  } catch (err) {
    console.error("❌ Erreur envoi email :", err);
    res.status(500).send({ error: "Erreur envoi email" });
  }
});

export default router;
