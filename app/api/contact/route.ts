import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  // Récupération du corps de la requête
  const { name, email, message } = await request.json();


  
  // Validation des champs requis
  if (!name || !email || !message) {
    return NextResponse.json(
      { message: 'Tous les champs sont requis' },
      { status: 400 }
    );
  }

  try {
    // Configuration du transporteur SMTP

    console.log("Creating transporter");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // ex : "smtp.gmail.com"
      port: Number(process.env.SMTP_PORT) || 587, // Port SMTP
      secure: process.env.SMTP_SECURE === 'true', // true pour 465, false pour les autres ports
      auth: {
        user: process.env.EMAIL_USER, // Votre adresse e-mail
        pass: process.env.EMAIL_PASS, // Votre mot de passe ou mot de passe d'application
      },
    });

    // Vérification de la configuration du transporteur (optionnel)
    await transporter.verify();
    console.log('Le transporteur e-mail est correctement configuré.');

    // Définition des options de l'e-mail
    const mailOptions = {
      from: `"${name}" <${email}>`, // Nom et e-mail de l'expéditeur
      to: process.env.EMAIL_USER, // Votre adresse e-mail
      subject: 'Nouvelle soumission du formulaire de contact',
      text: message,
      html: `
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
    };

    // Envoi de l'e-mail
    await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé avec succès.');

    return NextResponse.json(
      { message: 'E-mail envoyé avec succès' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    return NextResponse.json(
      {
        message: 'Échec de l\'envoi de l\'e-mail',
        error: error.message,
      },
      { status: 500 }
    );
  }
}