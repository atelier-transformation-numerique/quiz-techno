export async function onRequest(context) {
  const sampleQuizData = [
    {
      type: "text",
      text: "Quelle est votre niveau de compétence en JavaScript?",
      answerType: "choices",
      answers: [
        { text: "Débutant" },
        { text: "Intermédiaire" },
        { text: "Avancé" },
        { text: "Expert" }
      ]
    },
    {
      type: "html",
      text: "<p>Évaluez votre <strong>maîtrise de React</strong> (de 0 à 10) :</p>",
      answerType: "number",
      answers: []
    },
    {
      type: "text",
      text: "Combien de langages de programmation connaissez-vous?",
      answerType: "number",
      answers: []
    },
    {
      type: "text",
      text: "Décrivez brièvement votre dernière expérience de développement",
      answerType: "text",
      answers: []
    },
    {
      type: "html",
      text: "<p>Quels <em>frameworks back-end</em> avez-vous déjà utilisés?</p>",
      answerType: "choices",
      answers: [
        { text: "Express.js" },
        { text: "Django" },
        { text: "Flask" },
        { text: "Ruby on Rails" },
        { text: "Spring Boot" },
        { text: "Aucun" }
      ]
    }
  ];

  return new Response(JSON.stringify(sampleQuizData), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Important for local development and cross-origin requests
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}
