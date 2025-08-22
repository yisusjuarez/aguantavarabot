export default {
	async fetch(request, env) {
	  const body = await request.json();
  
	  // URL verification (Slack sends challenge)
	  if (body.type === "url_verification") {
		return new Response(JSON.stringify({ challenge: body.challenge }), {
		  headers: { "Content-Type": "application/json" },
		});
	  }
  
	  if (body.event && body.event.type === "message" && !body.event.bot_id) {
		const slackToken = env.SLACK_BOT_TOKEN;
		const text = body.event.text.toLowerCase();
  
		// Fun phrases
		const phrasesPaydayToday = [
		  "💸 Hoy cae, compa… que se escuche la quincena hasta en el Metro",
		  "🎉 Hoy sí toca lana, ¡a comprar tacos como si no hubiera mañana!",
		  "🤑 Hoy cae la quincena y mi cartera ya pidió vacaciones",
		  "💰 Hoy toca gastar, que las tortillas no se compran solas",
		  "🤣 Hoy sí hay lana… aunque la mitad se vaya en café y tortas",
		  "💃 Hoy cayó la quincena y hasta el perro se siente millonario",
		  "🍕 Hoy toca darse gustos, que el hambre no espera",
		  "🏖️ Hoy sí llegó la lana, aunque las vacaciones sean en la sala",
		  "😂 Hoy cae, tu cartera y tu ánimo están de fiesta",
		  "😎 Hoy toca presumir… aunque solo sea con las monedas que pesan",
		  "💳 Hoy sí toca gastar, que la tarjeta sienta que vale la pena",
		  "🔥 Hoy la quincena llegó y el estrés se fue a pasear",
		  "🕺 Hoy sí hay dinero, tu cartera ya está haciendo cumbia",
		  "🥳 Hoy toca celebrar aunque sea con un cafecito",
		  "🍫 Hoy cayó la quincena, chocolate y tortas aseguradas",
		  "💥 Hoy sí hay lana, que los billetes se sientan en casa",
		  "🙌 Hoy toca presumir un poquito, aunque solo sea con ilusión",
		  "🎯 Hoy cae la quincena… y los antojos también",
		  "🛒 Hoy toca llenar el carrito… de cosas que no necesitabas pero quieres",
		  "🤣 Hoy sí hay lana, y si no, al menos que nos dé risa"
		];
  
		const phrasesNoPaydayToday = [
		  "😅 Hoy no cae, compa… la quincena se fue de parranda sin avisar",
		  "😂 Hoy toca sufrir un poquito, tu cartera sigue en ayuno voluntario",
		  "🤣 Hoy no llega la lana, pero oye, los tacos imaginarios son gratis",
		  "🙃 Hoy no toca… paciencia, que hasta el dinero necesita descanso",
		  "😏 Hoy no cae, tu billetera sigue haciendo huelga de hambre",
		  "😩 Hoy no toca, consuélate con un cafecito y unas buenas carcajadas",
		  "🤦‍♂️ Hoy la quincena se burló de nosotros, pero así es la vida",
		  "😜 Hoy no llega la lana, pero al menos los sueños siguen intactos",
		  "🤣 Hoy toca sufrir en silencio… o gritarle a la nevera",
		  "🙄 Hoy no cae la quincena, tu cartera y tu ánimo están en paro técnico",
		  "😤 Hoy toca resistir, que los billetes no siempre son puntuales",
		  "😂 Hoy no toca, compa… a ver si el dinero se acuerda de nosotros mañana",
		  "😎 Hoy no cae, pero oye, al menos seguimos con buen humor",
		  "😅 Hoy toca esperar… mientras tu billetera se hace la dormida",
		  "🤣 Hoy no llega la lana, a vivir del ingenio y de las tortas que quedan",
		  "🤷‍♂️ Hoy no toca, tu cartera sigue en huelga y no hay negociación",
		  "🙃 Hoy no cae, pero oye, reírse un rato no cuesta nada",
		  "😏 Hoy toca paciencia, que hasta los billetes tienen días libres",
		  "😂 Hoy no llega la quincena, así que toca improvisar como buen mexicano",
		  "😬 Hoy no toca… la quincena se fue de vacaciones sin ti",
			"🥲 Hoy no llega, pero oye… al menos el WiFi de la CDMX todavía es gratis",
			"🙃 Hoy tu cartera se hace la muerta… y lo logra bastante bien",
			"😂 Hoy no toca, pero échale imaginación: los billetes están de after",
			"😒 Hoy no llega la lana, pero tu talento para sobrevivir se multiplica",
			"🤔 Hoy tu quincena está jugando a las escondidas… y va ganando",
			"😭 Hoy no toca, compa… puro arroz con huevo hasta nuevo aviso",
			"🤣 Hoy tu billetera aplica ghosting, ni una señal de vida",
			"😏 Hoy no llega, pero recuerda: la risa no paga, pero alimenta",
			"🙄 Hoy tu cartera parece dieta keto: cero carbohidratos y cero billetes",
			"😅 Hoy no toca, pero tranqui… mañana tal vez, o pasado, o quién sabe",
			"😂 Hoy la quincena mandó mensaje: ‘andamos ocupados, saludos’",
			"😎 Hoy no llega la lana, pero la actitud millonaria sigue intacta",
			"🤦 Hoy no toca… pero hey, soñar sigue siendo gratis",
			"😩 Hoy la quincena no llegó, pero el cobrador sí 😬",
			"🤣 Hoy toca jugar Monopoly… porque ahí sí hay dinero",
			"😜 Hoy tu cartera se volvió minimalista: todo vacío",
			"🥲 Hoy no toca, pero siempre puedes coleccionar tickets de OXXO",
			"😏 Hoy la quincena anda en otra nómina… la tuya no fue",
			"😂 Hoy tu billetera se unió a la moda del ayuno intermitente"
		];
  
		// General keywords
		const palabrasClaveCae = [
		  "quincena",
		  "hoy",
		  "cae",
		  "paga",
		  "dinero",
		  "me toca",
		  "cayó",
		  "chilla",
		  "lana",
		  "varo",
		  "plata",
		  "efectivo",
		  "quincenal",
		  "pago",
		  "chela",
		  "finiquito",
		  "tarjeta",
		  "nomina",
		  "hambre",
		  "cayo","caer","pagaron","pagan", "nomina", "nómina"
		];
  
		const containsKeywords = (keywords) =>
		  keywords.filter((kw) => text.includes(kw)).length >= 1;
  
		// Determine if today is payday
		const today = new Date();
		let day = today.getDate();
		const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
  
		// Adjust if the 15th or 30th falls on a weekend (respond on Friday)
		let isPaydayToday = false;
		if (day === 15 || day === 30) {
		  isPaydayToday = true;
		} else if (dayOfWeek === 5) {
		  // Friday
		  const tomorrow = new Date(today);
		  tomorrow.setDate(today.getDate() + 1);
		  const tomorrowDay = tomorrow.getDate();
		  const tomorrowWeekDay = tomorrow.getDay();
		  if ((tomorrowDay === 15 || tomorrowDay === 30) && (tomorrowWeekDay === 6 || tomorrowWeekDay === 0)) {
			isPaydayToday = true;
		  }
		}
  
		let response = null;
  
		if (containsKeywords(palabrasClaveCae)) {
		  if (isPaydayToday) {
			response = phrasesPaydayToday[Math.floor(Math.random() * phrasesPaydayToday.length)];
		  } else {
			response = phrasesNoPaydayToday[Math.floor(Math.random() * phrasesNoPaydayToday.length)];
		  }
		}
  
		if (response) {
		  await fetch("https://slack.com/api/chat.postMessage", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			  "Authorization": `Bearer ${slackToken}`,
			},
			body: JSON.stringify({
			  channel: body.event.channel,
			  text: response,
			}),
		  });
		}
	  }
  
	  return new Response("ok");
	},
  };
