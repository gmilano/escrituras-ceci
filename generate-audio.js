#!/usr/bin/env node
import OpenAI from 'openai';
import fs from 'fs';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const poems = [
  { id: 'sin-forma', title: 'SIN FORMA', body: `hay cosas que se sienten
y no se pueden decir
pero tampoco callar
lo que nos pasa
no se acomoda
ni a mis ganas
ni a tu calma
se desliza entre lo posible
y lo que nunca fue dicho
como si el deseo bastara
para inventar un camino
yo no quiero más preguntas sin respuestas
ni citas sueltas como excusas
ni abrazos que duran menos
que lo que tardo en necesitarte de nuevo
me encantaría quedarme
pero no sé cómo hacerlo
sin dejarme partes en el intento
y vos
tan sereno
tan ahí
tan lejos
te pienso con ternura
pero ya no con certeza
y me duele
porque querer tanto
no alcanza` },

  { id: 'siempre-ahora', title: 'SIEMPRE AHORA', body: `Nos entendemos en silencios,
con esa certeza tácita de que
la eternidad no es nuestra.
Nos reímos de las preguntas
que otros se harían,
porque sabemos que,
si nos miramos demasiado,
se disuelven las palabras.
Preferimos bailar entre las horas,
como si el tiempo se anudara solo en nuestro abrazo,
como si nadie más existiera
en esa habitación inventada.
Lo que tenemos es un pacto sin promesas,
un refugio momentáneo
donde no importa el después.
Sabemos que estamos hechos de un mismo fuego,
pero que el fuego,
también,
quema.
Así que preferimos rozarnos sin atarnos,
perdernos sin buscarnos,
ser dos llamas en un cuarto oscuro
que solo brillan cuando se encuentran.
Y cuando te vas,
no me pregunto nada.
Solo sé que volvés,
como si el presente fuera el único lugar
donde nos encontramos de verdad.` },

  { id: 'familia', title: 'Familia', body: `llegué a la mesa vacía de ganas
con esa duda tonta
de si el amor era para mí
los cubiertos chocaban suave
había migas de pan
luces amarillas, otras blancas
y voces que ya conocía de memoria
alguien preguntó cómo estaba
otro me sirvió más papas
se cruzaron chistes viejos
ojos que me miraban como si nada doliera
respiré sonrisas
me abrazaron risas de un calor conocido
y en ese ruido tranquilo
se me aflojaron las espinas
entendí despacio
entre platos usados y vasos sudados
que lo que yo llamaba vacío
hace rato se sentaba conmigo
que quizás no falte amor
sino ojos
para verlo donde siempre estuvo
llenándome el plato
y el pecho` },

  { id: 'las-agujas-siguieron', title: 'Las agujas siguieron', body: `Nuevamente sonó ese viejo reloj,
quejoso marcó
el día, la hora, el segundo,
y egocéntrico me miró.
Prefería yo mirarte, pero
estabas teñida de él,
se adueñó de vos.
Es que aunque jugamos a desarmarlo
y volver a acomodarlo,
las agujas siguieron su paso.
Y hoy solo te veo
en esos retazos
y tiempos escasos.
Después de un intercambio, accedió,
movió sus agujas a mi antojo,
pero burlón susurró
que la rosa perdió su color.` },

  { id: 'homicidio-culposo', title: 'HOMICIDIO CULPOSO', body: `Viniste a desarmarme,
a romperme a besos,
a cortarme a latidos sincronizados
y sin necesidad alguna.
Te fuiste porque te elegías,
capaz por primera vez,
a vos antes que a esos veinte minutos
de piel ardiendo.
Destruí lo que me unió a esto,
era perfecto pero yo no podía.
Necesitaba sentirnos libres
y te encarcelé de la forma más cruel.
No podía tenerte,
no podía elegirte.
Necesitaba que te vayas,
pero que vuelvas cuando me quemaba el frío.
Te vi romperte,
llorarme,
pedirme,
esperarme,
pero amor,
no podía.
Capaz se acercó a la muerte mi paso por tu camino,
y ni siquiera ese perdón casi susurrado
va a devolverte igual.
Pero también capaz fue eso
lo más lindo
de mi homicidio culposo.` },

  { id: 'el-saqueo', title: 'EL SAQUEO, carta al cáncer', body: `Me la robaste,
incluso mucho antes
de que lo pudiera notar.
Saqueaste el último bloque sólido
que aún sostenía a mi roble más fuerte.
Jugaste silenciosamente
a esa jugada
que nadie te podría ganar nunca.
Y lo sabías.
Nos miraste soberbiamente,
observaste mi llanto desconsolado
agarrada de su mano,
y te la llevaste igual.
Hiciste tu danza mortal,
de a poco, callada.
La apagaste,
y le robaste tantas, tantas horas,
tantas sonrisas,
para darle ardor, molestia, angustia.
Yo no la tengo más,
pero vos tampoco.
Ya no se ríe de mis chistes,
pero no llora por tus escombros.
Tuviste meses de su vida,
yo dieciocho años.` },

  { id: 'si', title: 'Si', body: `Si yo nunca iba,
si vos nunca venías.
Si esas eternas despedidas lo hubieran sido.
Es que nos despedíamos sin despedirnos,
para irnos sin despedirnos,
y hasta con una sonrisa.
Si solo hubieras escuchado,
o yo hubiese hablado.
Si vos querías cuando yo,
o yo quería cuando vos.
Si estabas acá o yo allá,
y me abrazabas,
y yo te miraba.
Pero si— Nada.
Y no es.
Porque no era el fin ser.
El fin fue esto y un desvelo.
Porque si era,
o si sí,
o si todo y si nada,
capaz esta carta
no la impulsaba tu mirada.` },

  { id: 'tal-vez-te-escribo', title: 'TAL VEZ TE ESCRIBO', body: `Tal vez te escribo
solo porque,
así al fin,
te puedo sentir mío.
No solo el sentirte de mi propiedad,
también, a veces,
me gusta el amargo de tu ausencia,
porque es tuya.
Tal vez te escribo
porque así, en letras,
es la única metamorfosis aceptada
de tu ligero paso
y mi brutal apego.
Tal vez te escribo
porque así, en prosa o poesía,
logro aún ver tu danza
por mis tierras.
Tal vez te escribo
porque si un día nos ató el amor,
quizás hoy ata el dolor,
pero atados,
en la misma dirección.` },

  { id: 'somos', title: 'SOMOS', body: `Capaz yo soy vos
y vos sos eso,
eso que me despeina a mí y a ese árbol.
Ayer también te vi en el mar.
Puede ser que seamos,
pero ya encontramos mil maneras
de jugar a dividirnos.
Hoy noté que tu brillo era igual que el sol,
pero él es sol y vos sos vos.
Cuando canto,
a veces esa mariposa me observa.
Ella tiene colores y yo distinta piel.
Me resigné a la idea de que somos.
Dijeron en la NASA que,
visto desde afuera,
capaz que sí somos.
La verdad es dada,
pero necesito saber cómo explico
en un mundo tan estricto
que yo soy vos y él,
ayer, hoy,
y hasta que esa mariposa sea él y yo también.` },

  { id: 'la-estrella-fugaz', title: 'LA ESTRELLA FUGAZ', body: `Una estrella fugaz vino a contarme
su indignación con nuestra parte.
¿Cómo, por ser fugaces,
sus deseos debo concretarles?
¿Qué acaso no se dan cuenta?
Que ser fugaces refleja lo principal del mensaje.
¡Estrella, no te entiendo!
Le grité cuando se iba.
Chica, el paso en que voy refleja tu vida.
Triste estaba yo, ya se había ido.
Su hermana se acercó y me dijo:
Mi hermana aún sigue enfadada.
¿Cómo puede ser que los humanos
a nosotros vengan a rogarnos,
si aún no tienen claro ni su efímero paso?
¡Estrellita, no te vayas!
Chica, ¿quién le pide deseos a su peor temor?` },

  { id: 'era-amor', title: 'ERA AMOR', body: `Todos decían celos, posesión.
Tranquilo que sé, solo era amor.
No fueron graves los ardientes insomnios,
pude apreciar mil noches gracias a tu enojo.
Las marcas que tanto decían
solo eran tu arte en mi piel.
Debí callarme esas tres veces.
Luego lo entendí.
Vi lo más oscuro, qué lindo tu anochecer.
Me querías hasta los huesos,
capaz un poco más que eso.
En el último momento llegaba el perdón y el beso.
Navegué los mares más oscuros,
más salvajes, más tormentosos,
todo era por amor.
¿Por qué todos me arrancaron?
Tenías razón.
El mundo está loco
y vos tenés la receta justa del amor,
ese que casi, casi, casi
me hace entregarte la voz.` },

  { id: 'el-dia-que-llegues', title: 'EL DÍA QUE LLEGUES', body: `La tormenta de ayer está calma hoy.
El día que llegues, aunque ayer dolió como hoy.
El día que llegues, hoy soñé con vos.
El día que llegues, hoy. Mañana no tiene sabor.
El día que llegues, el pasado se hace presente hoy.
El día que llegues, la mañana fue estúpida hoy.
El día que llegues, tu reloj está preciso. Hoy.
El día que llegues, hoy, recita este poema, amor.` },

  { id: 'espejo', title: 'ESPEJO', body: `no me enamoré
y ahora sé lo que se siente cuando del otro lado sí.
Quise quererlo, me juro que sí,
pero el cuerpo no respondía.
entonces vino otro
y me amé en su mirada,
me vi, me creí, me entregué,
y terminé del otro lado.
me rompí igual pero al revés.
me acordé de su forma de esperarme sin reclamos,
de cómo yo callaba
porque decir no me pasa
también es violencia aunque no suene fuerte.
y ahora soy yo la que espera,
la que busca señales donde no hay idioma.
solo sé que esto también es amar
aunque no parezca.` },

  { id: 'siempre-ayer', title: 'SIEMPRE AYER', body: `un día me ardió la piel
no por el sol que entró en tu ventana
sino porque el fuego quemó.
llegó ese día, el que nunca nombramos,
ese día en el que te abracé
con la dulzura de quien tiene
la profunda certeza de que es la última vez.
me vestí rápido,
te di ese beso, claro que sí,
pero vos no lo sabías, y yo sí.
te miré con el mismo amor,
pero intenté pegarme a cada parte de tu alma
en ese último suspiro compartido.
me sumergí en la eternidad tan efímera
que te regalaría mil veces.
ganó el mañana, perdimos el siempre ahora.
pero siempre fuimos cuando teníamos que ser,
entonces, aunque siempre fue ayer, siempre es hoy.` },

  { id: 'te-extrano-por-los-dos', title: 'TE EXTRAÑO POR LOS DOS', body: `yo te extraño con el cuerpo,
con las manos vacías,
con el hueco de tu risa colgado en mi almohada.
yo te extraño con rabia, con ternura, con dudas,
con ganas de escribirte solo para que no te olvides.
yo te extraño por los dos
y me odio por seguir contando días
y repitiendo conversaciones que no van a volver.
yo te extraño, sí,
pero ya no voy a rogar
porque el amor no se pide: se queda.
y vos no.
pero, aun así, yo te extraño por los dos.` },

  { id: 'un-ano-luz', title: 'Un año luz, yaya', body: `y hoy, pero hace un año, te apagaste para siempre.
y yo me acuerdo de todo.
de esa flor insolente en la vereda,
del kiosquero diciéndome buen día
como si no se hubiera muerto el mundo.
me acuerdo de los autos
girando apurados por una ciudad
que no sabía que vos ya no estabas.
te despedí con la piel rota,
con los ojos rabiosos,
con ese llanto que desborda
porque nunca me avisaron
cómo se deja ir a alguien que fue raíz.
nunca más tu voz llamando,
nunca más tus manos sirviendo pasta,
nunca más tus ojitos azules cielo
espiándome la pena para darme abrigo sin decir nada.
y aunque la vida siga, aunque ría, aunque ame,
hay un rincón mío que no se llena
porque está lleno de vos.
yo todavía te amo
como si no supiera
que el costo de eso es extrañarte para siempre.` },

  { id: 'a-destiempo', title: 'A DESTIEMPO', body: `uno era refugio,
tenía el color exacto del hogar en invierno.
era fácil, cómodo, previsible.
un lugar sin viento, pero sin fuego.
el otro, tormenta.
una grieta en la línea recta de todo lo que debía ser.
me sacudió el alma como si el alma fuera suya.
con uno, la vida me abría puertas.
con el otro, yo las cerraba todas menos la suya.
al primero le fallé sin quererlo.
al segundo me entregué sin poder evitarlo.
y a veces me pregunto
qué parte del amor elige,
y cuál se deja arrasar.` },

  { id: 'como-si-supieras', title: 'Como si supieras, a papá', body: `hay formas de amar que no hacen ruido,
que no se escriben con flores ni se gritan en fotos.
hay formas que se tejen despacito en los días normales,
y vos sos todas ellas.
sos la calma pero sin pausa,
el genio que programa mundos
pero nunca se olvida de la contraseña de mi corazón.
te tengo adentro de mis logros, de mis risas,
de cada yo puedo que aprendí mirando cómo vos podías.
sos esa voz que me sigue aunque no esté sonando,
la que me dice que pruebe, que no me rinda,
como si supieras que puedo volar
aunque a veces me olvide.
no hacés promesas, las cumplís.
no hablás del amor, lo vivís.
y si algún día me pierdo,
me basta pensar en vos para encontrar el norte.
porque mi brújula también tiene tus ojos,
porque habiendo crecido con vos,
es fácil encontrar siempre el regreso a casa.` },

  { id: 'agua-contra-fuego', title: 'AGUA CONTRA FUEGO, lado B', body: `una vez me ofrecieron abrigo y no tuve frío.
me tendieron la cama y yo dormía en el suelo.
me dijeron quedate
pero yo ya me había ido sin moverme del lugar.
otra vez, alguien me miró como si supiera
qué parte exacta de mí dolía más en silencio.
el primero era raíz, cercanía, un idioma que entendía.
el segundo, viento en idioma extranjero,
pero igual me arrodillé a escuchar.
quise quedarme donde era fácil, pero el cuerpo corría.
hay abrazos que no me alcanzaron aunque tenían todo para hacerlo.
y otros que me desarmaron
aunque no sabían ni sostenerme.` },

  { id: 'incomodo-cafe', title: 'Incómodo café', body: `no tomé el café, solo nos vi en el reflejo.
se enfriaba, pero más me dolía
ver tan lejos lo que me abrazaba todavía.
habíamos sido, yo estuve ahí,
pero estábamos rodando en relojes opuestos
jugando a encontrarnos.
grité mucho pero el silencio ganó igual.
no quiero volver a encontrarte, quiero que sea ahora.
ya me dolés y me calmas, todo junto.
pero nadie puede decir que no fue.
yo nos vi brillar, nos vi bailar,
yo nos vi creer que era.
apagué la tele, no limpié el café.
ojalá llegues y que la mancha esté.
yo sé lo que vi y lo que vibró
cuando nos encontramos en la mitad exacta del abismo.` },

  { id: 'te-miro-y-no-te-encuentro', title: 'Te miro y no te encuentro', body: `te miro y no te encuentro.
me escondo en la sombra de lo que fuimos
o de lo que quisimos ser.
vi tus ojos tan cerca de mí
como gritándome que ya no me reconocen.
corrí, lloré, grité,
y seguías a mi lado pero cada vez más lejos.
nos perdimos y no te encuentro.
te dolió, me dolió, te rompí, nos rompí.
y ahora solo recuerdo
cuando esos ojos me buscaban con fuego, con certeza,
como quien sabe dónde está su hogar.
y ahora me mirás con miedo, con cuidado, con distancia.
y lo entiendo, pero quiero volver a aquella noche,
a aquella mirada en la que sentí que nada era finito,
que todo existía, y ese todo éramos nosotros,
corazón con corazón.` }
];

async function generateAudio(poem, index) {
  const filepath = `public/audio/${poem.id}.mp3`;
  if (fs.existsSync(filepath)) {
    console.log(`[${index+1}/21] ⏭️  Ya existe: ${filepath}`);
    return;
  }

  console.log(`[${index+1}/21] 🎙️  ${poem.title}...`);
  try {
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1-hd',
      voice: 'nova',
      input: poem.body,
      response_format: 'mp3',
      speed: 0.92
    });
    const buf = Buffer.from(await mp3.arrayBuffer());
    fs.writeFileSync(filepath, buf);
    console.log(`  ✅ ${filepath} (${(buf.length/1024).toFixed(0)}KB)`);
  } catch (e) {
    console.error(`  ❌ ${poem.title}: ${e.message}`);
  }
}

async function main() {
  console.log('🎙️ Generando audios — nova (OpenAI TTS-HD)\n');
  for (let i = 0; i < poems.length; i++) {
    await generateAudio(poems[i], i);
  }
  console.log('\n✨ Listo!');
}

main();
