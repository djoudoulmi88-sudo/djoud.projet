// script.js (français)
// Comportement : afficher les sujets, gérer l'ouverture/fermeture, bot, animations

const topics = [
  {
    title: 'Naissance',
    content: `<p><strong>Nom complet :</strong> Adolf Hitler</p>
              <p><strong>Date de naissance :</strong> 20 avril 1889</p>
              <p><strong>Lieu de naissance :</strong> Braunau am Inn, Autriche 🇦🇹</p>
              <p class="small">Pays à la naissance : Autriche-Hongrie (aujourd'hui Autriche)</p>`
  },
  {
    title: 'Famille',
    content: `<ul>
                <li><strong>Père :</strong> Alois Hitler (1837–1903)</li>
                <li><strong>Mère :</strong> Klara Pölzl (1860–1907)</li>
                <li><strong>Fratrie :</strong> Plusieurs sont morts jeunes ; Paula Hitler (1896–1960) a survécu.</li>
                <li><strong>Conjointe :</strong> Eva Braun (mariée en avril 1945, peu avant leur mort)</li>
              </ul>`
  },
  {
    title: 'Ascension au pouvoir',
    content: `<p>Après la Première Guerre mondiale, Hitler rejoint le Parti ouvrier allemand (1919). Il devient chef du parti (NSDAP), tente le putsch de la Brasserie (1923), rédige <em>Mein Kampf</em> en prison, et devient chancelier en 1933. En 1934, il concentre les pouvoirs et devient Führer.</p>`
  },
  {
    title: 'Seconde Guerre mondiale et expansion',
    content: `
      <p>Succès et revers durant la Seconde Guerre mondiale — mini-chronologie avec 5 victoires notables et 5 défaites notables.</p>
      <div class='sub-timeline' aria-hidden='false'>
        <h3 style="color:var(--accent-strong);margin-top:8px">🏆 Victoires notables</h3>
        <div class='event'><div class='year'>1938</div><div class='desc'><strong>Anschluss (annexion de l'Autriche)</strong> — L'Autriche est incorporée à l'Allemagne. <span class='small'>🇦🇹</span></div></div>
        <div class='event'><div class='year'>1939</div><div class='desc'><strong>Invasion de la Pologne</strong> — Début de la Seconde Guerre mondiale (1er sept. 1939). <span class='small'>🇵🇱</span></div></div>
        <div class='event'><div class='year'>1940</div><div class='desc'><strong>Chute de la France</strong> — Avance rapide allemande et occupation (mai–juin 1940). <span class='small'>🇫🇷</span></div></div>
        <div class='event'><div class='year'>1941</div><div class='desc'><strong>Gains importants à l'Est (ex. Kiev)</strong> — Avancées majeures lors de l'opération Barbarossa. <span class='small'>🇷🇺</span></div></div>
        <div class='event'><div class='year'>1941</div><div class='desc'><strong>Progrès en Afrique du Nord (début)</strong> — Succès initiaux des forces de l'Axe en certains secteurs. <span class='small'>🇮🇹/🇩🇪</span></div></div>

        <h3 style="color:var(--accent-strong);margin-top:8px">💥 Défaites notables</h3>
        <div class='event'><div class='year'>1942</div><div class='desc'><strong>Bataille de Stalingrad</strong> — Tournant avec pertes catastrophiques pour l'Allemagne. <span class='small'>🇷🇺</span></div></div>
        <div class='event'><div class='year'>1943</div><div class='desc'><strong>Fin de la campagne d'Afrique du Nord</strong> — Capitulation des forces de l'Axe en Tunisie. <span class='small'>🇹🇳</span></div></div>
        <div class='event'><div class='year'>1944</div><div class='desc'><strong>Débarquement en Normandie (6 juin)</strong> — Ouverture d'un second front à l'Ouest. <span class='small'>🇫🇷</span></div></div>
        <div class='event'><div class='year'>1944</div><div class='desc'><strong>Bataille des Ardennes (Battle of the Bulge)</strong> — Dernière grande offensive allemande, sans succès durable. <span class='small'>🇧🇪/🇱🇺</span></div></div>
        <div class='event'><div class='year'>1945</div><div class='desc'><strong>Bataille de Berlin</strong> — Combat final menant à la reddition de l'Allemagne. <span class='small'>🇩🇪</span></div></div>
      </div>`
  },
  {
    title: 'L\'Holocauste',
    content: `<p>Sous le régime nazi, six millions de Juifs et des millions d'autres personnes ont été assassinés dans le cadre de la Shoah et des persécutions d'Etat. Ce génocide reste l'un des crimes les plus graves de l'histoire.</p>`
  },
  {
    title: 'Défaite et mort',
    content: `<p>En 1945, face à la défaite, Hitler et Eva Braun se suicident dans le bunker de Berlin le 30 avril 1945. L'Allemagne capitule peu après.</p>`
  },
  {
    title: 'Sources',
    content: `<ul><li>United States Holocaust Memorial Museum (USHMM)</li><li>Encyclopaedia Britannica</li><li>History.com</li></ul>`
  }
];

// affichage de la liste et logique d'ouverture
const list = document.getElementById('topicList');
topics.forEach((topic, idx) => {
  const li = document.createElement('li');
  li.setAttribute('role','button');
  li.setAttribute('tabindex','0');
  li.dataset.idx = idx;

  const title = document.createElement('div');
  title.className = 'title';
  title.innerText = topic.title;

  const chevron = document.createElement('div');
  chevron.className = 'small';
  chevron.innerText = '▸';

  li.appendChild(title);
  li.appendChild(chevron);

  const content = document.createElement('div');
  content.className = 'content';
  content.innerHTML = topic.content;
  li.appendChild(content);

  function toggle(){
    // fermer les autres
    document.querySelectorAll('.content').forEach(c => { if(c!==content) c.classList.remove('show') });
    // basculer celui-ci
    content.classList.toggle('show');
    // rotation du chevron
    chevron.style.transform = content.classList.contains('show') ? 'rotate(90deg)' : 'rotate(0deg)';
  }

  li.addEventListener('click', toggle);
  li.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); toggle(); } });

  list.appendChild(li);
});

// connaissances du bot & comportement (en français)
const knowledge = {
  'quand est-il né': 'Adolf Hitler est né le 20 avril 1889 à Braunau am Inn (Autriche).',
  'où est-il né': 'Il est né à Braunau am Inn, une petite ville frontalière en Autriche (alors Autriche-Hongrie).',
  'quand est-il mort': 'Il est mort le 30 avril 1945 à Berlin (suicide dans le Führerbunker).',
  'qui était sa femme': 'Eva Braun était sa compagne de longue date; ils se sont mariés peu avant leur mort en avril 1945.',
  'qui étaient ses parents': 'Son père : Alois Hitler ; sa mère : Klara Pölzl.',
  'quelles furent ses victoires': 'Des expansions initiales : l\'Anschluss (1938), l\'invasion de la Pologne (1939), la chute de la France (1940), etc.',
  'quelles furent ses défaites': 'Défaites majeures : Stalingrad (1942), Afrique du Nord (1943), Débarquement (1944), Ardennes (1944), Berlin (1945).',
  'quand la ww2 a-t-elle commencé': 'La Seconde Guerre mondiale a commencé le 1er septembre 1939 avec l\'invasion de la Pologne.',
  'quand la ww2 a-t-elle terminé': 'La Seconde Guerre mondiale en Europe s\'est terminée le 8 mai 1945 (VE Day).',
  'qui t\'a créé': 'Je suis un bot éducatif créé pour répondre à des questions factuelles sur l\'histoire.',
  'pourquoi as-tu été créé': 'J\'ai été conçu pour aider à apprendre l\'histoire de manière neutre et informative. Je n\'apporte pas d\'apologie pour une idéologie extrémiste.'
};

document.getElementById('ask').addEventListener('click', () => {
  const q = (document.getElementById('q').value || '').toLowerCase().trim();
  const reply = document.getElementById('reply');
  if(!q){ reply.textContent = 'Veuillez saisir une question factuelle.'; return; }

  // refuser demandes de promotion/éloge
  const blocked = ['faire l\'éloge','éloge','soutenir','rejoindre','devenir nazi','comment devenir','comment rejoindre','comment adhérer'];
  for(const b of blocked){ if(q.includes(b)){ reply.textContent = 'Je ne peux pas fournir d\'apologie, d\'instructions ou de soutien pour une idéologie extrémiste. Je peux répondre à des questions historiques neutres.'; return; } }

  for(const k in knowledge){ if(q.includes(k)){ reply.textContent = knowledge[k]; return; } }
  reply.textContent = 'Je peux répondre à des questions factuelles sur des dates, événements ou personnes. Exemples : "Quand est-il né ?" ou "Quelles furent ses défaites ?"';
});

// entrée par la touche Entrée
document.getElementById('q').addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ document.getElementById('ask').click(); } });

// intersection observer pour animations d'entrée
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en => {
    if(en.isIntersecting){
      en.target.classList.add('show');
    }
  });
}, {threshold:0.12});
document.querySelectorAll('.card').forEach(c => io.observe(c));

// animation d'en-tête au chargement
window.addEventListener('load', ()=>{
  const img = document.getElementById('heroImg');
  const title = document.getElementById('heroTitle');
  const sub = document.getElementById('heroSub');
  img.style.transition = 'transform 900ms ease, box-shadow 900ms ease';
  title.style.transition = 'opacity 1200ms ease, text-shadow 1200ms ease';
  sub.style.transition = 'opacity 1200ms ease, transform 1200ms ease';
  // animer
  title.style.opacity = '1';
  sub.style.opacity = '1';
  sub.style.transform = 'translateY(0)';
  img.style.transform = 'translateY(-6px) scale(1.02)';
  setTimeout(()=>{ img.style.transform = 'translateY(0) scale(1)'; }, 900);
});
