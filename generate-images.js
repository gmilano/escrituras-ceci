#!/usr/bin/env node
import OpenAI from 'openai';
import fs from 'fs';
import https from 'https';
import path from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const poems = [
  {
    id: 'sin-forma',
    title: 'SIN FORMA',
    prompt: 'Watercolor painting, two translucent silhouettes drifting apart in soft mist, one warm amber one cool blue, uncertain and tender, abstract impressionist style, no text'
  },
  {
    id: 'siempre-ahora',
    title: 'SIEMPRE AHORA',
    prompt: 'Two candle flames burning close together in absolute darkness, intimate warmth, one about to flicker out, soft chiaroscuro, oil painting style, no text'
  },
  {
    id: 'familia',
    title: 'Familia',
    prompt: 'Warm family dinner table seen from above, golden candlelight, empty plates being filled, blurred figures with gentle smiles, impressionist oil painting, no text'
  },
  {
    id: 'las-agujas-siguieron',
    title: 'Las agujas siguieron',
    prompt: 'Antique clock with wilting roses around it, petals falling into shadow, sepia and deep burgundy tones, melancholy still life, painterly style, no text'
  },
  {
    id: 'homicidio-culposo',
    title: 'HOMICIDIO CULPOSO',
    prompt: 'Two hands reaching toward each other but not touching, one with a small wound, dramatic chiaroscuro lighting, dark and tender, painterly expressionist style, no text'
  },
  {
    id: 'el-saqueo',
    title: 'EL SAQUEO: carta al cáncer',
    prompt: 'Ancient oak tree standing strong while dark storm clouds consume it, but one golden light glows from within the roots, dramatic contrast of light and shadow, oil painting style, no text'
  },
  {
    id: 'si',
    title: 'Si',
    prompt: 'Misty forest path forking in multiple directions disappearing into fog, soft green and grey tones, quiet melancholy, impressionist watercolor, no text'
  },
  {
    id: 'tal-vez-te-escribo',
    title: 'TAL VEZ TE ESCRIBO',
    prompt: 'Close-up of a hand writing with ink on paper, ink transforming into abstract flowing shapes and birds at the edges, intimate and poetic, soft lighting, painterly style, no text'
  },
  {
    id: 'somos',
    title: 'SOMOS',
    prompt: 'Human figure dissolving into starlight and ocean waves, cosmic unity, deep blues and golds, philosophical and vast, digital painterly style, no text'
  },
  {
    id: 'la-estrella-fugaz',
    title: 'LA ESTRELLA FUGAZ',
    prompt: 'Young woman reaching up toward a shooting star in a dark velvet sky, the star looks back defiantly, surreal and whimsical, deep indigo and silver, painterly style, no text'
  },
  {
    id: 'era-amor',
    title: 'ERA AMOR',
    prompt: 'Dark red roses with thorns, some petals bruised and falling, shadows and unexpected beauty, duality of tenderness and danger, moody still life painting, no text'
  },
  {
    id: 'el-dia-que-llegues',
    title: 'EL DÍA QUE LLEGUES',
    prompt: 'Solitary silhouette at a rain-streaked window, storm outside but a ray of golden light breaking through, hopeful anticipation, watercolor style, no text'
  },
  {
    id: 'espejo',
    title: 'ESPEJO',
    prompt: 'Figure standing before a mirror but the reflection shows a different emotional state, one crying while other stands still, broken symmetry, painterly style, soft blues and greys, no text'
  },
  {
    id: 'siempre-ayer',
    title: 'SIEMPRE AYER',
    prompt: 'Two figures in morning light, one turning to leave while the other memorizes the moment with desperate tenderness, golden dawn, impressionist style, no text'
  },
  {
    id: 'te-extrano-por-los-dos',
    title: 'TE EXTRAÑO POR LOS DOS',
    prompt: 'Empty pillow with the impression of a head, hands reaching into absence in soft blue-grey light, longing and hollowness, intimate painterly style, no text'
  },
  {
    id: 'un-ano-luz',
    title: 'Un año luz: yaya',
    prompt: 'Empty wooden chair by a sunlit window, a single flower on the seat, dust particles in golden light like a presence still there, memorial and tender, warm oil painting style, no text'
  },
  {
    id: 'a-destiempo',
    title: 'A DESTIEMPO',
    prompt: 'Two contrasting rooms visible through a split scene, one warm fireplace and cozy home, one electric storm and wild lightning, figure standing between them, painterly style, no text'
  },
  {
    id: 'como-si-supieras',
    title: 'Como si supieras: a papá',
    prompt: 'Compass with a glowing star at its center, warm golden light radiating, small figure of a child looking up at a tall protective silhouette, tender and luminous, oil painting style, no text'
  },
  {
    id: 'agua-contra-fuego',
    title: 'AGUA CONTRA FUEGO: lado B',
    prompt: 'Ocean wave meeting a wall of fire, the exact edge where they touch creating steam and unexpected beauty, two opposing forces in harmony and conflict, dramatic painterly style, no text'
  },
  {
    id: 'incomodo-cafe',
    title: 'Incómodo café',
    prompt: 'Cold coffee cup on café table, rain on window behind, two reflections visible in the cup surface, winter melancholy and nostalgia, intimate still life painting, no text'
  },
  {
    id: 'te-miro-y-no-te-encuentro',
    title: 'Te miro y no te encuentro',
    prompt: 'Two figures in blue mist, one reaching toward the other who is fading into fog, eyes visible but distant, the space between them growing, melancholic watercolor style, no text'
  }
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

async function generateImage(poem, index) {
  console.log(`[${index + 1}/${poems.length}] Generando: ${poem.title}...`);
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: poem.prompt,
      size: '1792x1024',
      quality: 'hd',
      n: 1
    });
    const url = response.data[0].url;
    const filepath = `public/images/${poem.id}.jpg`;
    await downloadImage(url, filepath);
    console.log(`  ✅ Guardado: ${filepath}`);
    return filepath;
  } catch (err) {
    console.error(`  ❌ Error en ${poem.title}:`, err.message);
    return null;
  }
}

// Generate sequentially to avoid rate limits
async function main() {
  console.log('🎨 Iniciando generación de imágenes para Escrituras Ceci...\n');
  for (let i = 0; i < poems.length; i++) {
    await generateImage(poems[i], i);
    // Small delay between requests
    if (i < poems.length - 1) await new Promise(r => setTimeout(r, 1000));
  }
  console.log('\n✨ Generación completa!');
}

main();
