import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  CalendarDays, Camera, ChevronLeft, ChevronRight, Clock,
  Heart, MapPin, Music2, Navigation, Pause, Play,
  Send, Shuffle, SkipForward, Sparkles, Volume2, VolumeX, X,
} from 'lucide-react';

/* ─── Event Info ─────────────────────────────────────────── */
const EVENT = {
  couple:    'Seren & Emircan',
  herName:   'Seren',
  hisName:   'Emircan',
  dateISO:   '2026-06-27T13:00:00+03:00',
  dateEnd:   '2026-06-27T17:00:00+03:00',
  venue:     'Çamlıca Park Night',
  city:      'İstanbul',
  mapsUrl:   'https://maps.google.com/?q=Çamlıca+Park+Night+Istanbul',
  calTitle:  'Seren & Emircan Nişan Töreni',
};

/* ─── Music ──────────────────────────────────────────────── */
const TRACKS = [
  { file: '/music/Ed Sheeran - Perfect [cNGjD0VG4R8].mp3',            title: 'Perfect',                 artist: 'Ed Sheeran' },
  { file: '/music/Lady Gaga, Bruno Mars - Die With A Smile (Lyrics) [zgaCZOQCpp8].mp3', title: 'Die With A Smile', artist: 'Lady Gaga & Bruno Mars' },
  { file: '/music/Until I Found You (Em Beihold Version) [kPlSyYtE63M].mp3',            title: 'Until I Found You', artist: 'Em Beihold' },
  { file: '/music/Berkant - Samanyolu [6D1l_8qI4ks].mp3',             title: 'Samanyolu',               artist: 'Berkant' },
  { file: '/music/Kayahan & İpek Acar - Seninle Her Şeye Varım Ben (Video Klip) [3AK_Gx146ZY].mp3', title: 'Seninle Her Şeye Varım', artist: 'Kayahan & İpek Acar' },
  { file: '/music/Michael Bublé - Sway (Lyrics) [VmZ8pKZUVfY].mp3',  title: 'Sway',                    artist: 'Michael Bublé' },
  { file: '/music/Yalın - Her şey Sensin (Official Video) [2ByOn9erqVk].mp3', title: 'Her Şey Sensin', artist: 'Yalın' },
  { file: '/music/Emily Watts - La Vie En Rose [Official Music Video] [EloXaKNp2co].mp3', title: 'La Vie En Rose', artist: 'Emily Watts' },
  { file: '/music/Kenan Doğulu - Gelinim (Official Video) #3 [nJXIVxW37wI].mp3', title: 'Gelinim',     artist: 'Kenan Doğulu' },
  { file: '/music/Esin Engin Papatya gibisin. Tango [zwAmtbtFWRw].mp3', title: 'Papatya Gibisin',      artist: 'Esin Engin' },
  { file: '/music/La Maritza but it\'s my favorite part, Sylvie Vartan [1fj6HDX2feA].mp3', title: 'La Maritza', artist: 'Sylvie Vartan' },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── Photos ─────────────────────────────────────────────── */
const GALLERY = [
  { src: '/photos/img-8617.jpg',          alt: 'Bahçede şık çift fotoğrafı',         tone: 'Zarif akşam' },
  { src: '/photos/img-6532.jpg',          alt: 'Çiçekli aynada birlikte poz',         tone: 'Çiçekli durak' },
  { src: '/photos/img-5486.jpg',          alt: 'Işıklar altında birlikte',            tone: 'Işıklar' },
  { src: '/photos/img-6463.jpg',          alt: 'Karlı günde gülümseyen çift',         tone: 'Kış neşesi' },
  { src: '/photos/img-7137.jpg',          alt: 'Romantik bir an',                     tone: 'İlk bakış' },
  { src: '/photos/img-6647.jpg',          alt: 'Bahçede porttre',                     tone: 'Zarafet' },
  { src: '/photos/img-6182.jpg',          alt: 'Sıcak bir selfie',                    tone: 'Yakınlık' },
  { src: '/photos/img-6310.jpg',          alt: 'Soğuk havada selfie',                 tone: 'Sakin gün' },
  { src: '/photos/img-5299.jpg',          alt: 'Gülüşler',                            tone: 'Kahkaha' },
  { src: '/photos/img-4972.jpg',          alt: 'Şehir manzarasında çift',             tone: 'Manzara' },
];

const HERO_PHOTO   = '/photos/img-7137.jpg';
const HERO_PHOTO2  = '/photos/img-8617.jpg';
const BG_PHOTO     = '/photos/goruntu.jpg';
const STORY_PHOTO1 = '/photos/img-6532.jpg';
const STORY_PHOTO2 = '/photos/img-6463.jpg';
const STORY_PHOTO3 = '/photos/img-5486.jpg';
const PROGRAM_PHOTO = '/photos/img-6647.jpg';
const FINAL_PHOTO  = '/photos/img-6310.jpg';

/* ─── Timeline ───────────────────────────────────────────── */
const FLOW = [
  { time: '13:00', title: 'Karşılama',        text: 'İlk ikramlar, çiçekli masalar ve sıcak gülüşler.' },
  { time: '13:45', title: 'Yüzük töreni',     text: 'Ailelerimizle birlikte, kalpten gelen o özel an.' },
  { time: '14:30', title: 'Tatlı masası',     text: 'Pasta, tatlılar ve masalar arası keyifli sohbet.' },
  { time: '15:30', title: 'Müzik & kutlama',  text: 'Hafif başlayan, sonra neşelenen bir kutlama.' },
  { time: '17:00', title: 'Kapanış',          text: 'Bol fotoğraf ve güzel dileklerle vedalaşma.' },
];

/* ─── Countdown ──────────────────────────────────────────── */
function getRemaining() {
  const diff = Math.max(0, new Date(EVENT.dateISO).getTime() - Date.now());
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function fmtCal(d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }

/* ════════════════════════════════════════════════════════════
   MUSIC PLAYER HOOK
═══════════════════════════════════════════════════════════ */
function useMusicPlayer() {
  const audioRef     = useRef(null);
  const [queue]      = useState(() => shuffle(TRACKS));
  const [index, setIndex]     = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted]   = useState(false);
  const [volume,  setVolume]  = useState(0.55);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [started,  setStarted]  = useState(false);

  const track = queue[index];

  /* auto-play on first user interaction */
  const tryAutoPlay = useCallback(() => {
    if (started) return;
    setStarted(true);
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
  }, [started]);

  useEffect(() => {
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(e => document.addEventListener(e, tryAutoPlay, { once: true }));
    return () => events.forEach(e => document.removeEventListener(e, tryAutoPlay));
  }, [tryAutoPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src    = track.file;
    audio.volume = volume;
    audio.muted  = muted;
    if (playing) audio.play().catch(() => {});
  }, [index]); // eslint-disable-line

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  const next  = useCallback(() => setIndex(i => (i + 1) % queue.length), [queue.length]);
  const prev  = useCallback(() => setIndex(i => (i - 1 + queue.length) % queue.length), [queue.length]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  const onTimeUpdate = () => {
    const a = audioRef.current;
    if (a) setProgress(a.currentTime);
  };
  const onLoadedMetadata = () => {
    const a = audioRef.current;
    if (a) setDuration(a.duration);
  };
  const seek = (e) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  return {
    audioRef, track, playing, muted, volume, progress, duration,
    togglePlay, next, prev,
    setMuted, setVolume, seek, onTimeUpdate, onLoadedMetadata,
  };
}

/* ════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [remaining, setRemaining] = useState(getRemaining);
  const [lightbox,  setLightbox]  = useState(null);
  const [wishText,  setWishText]  = useState('');
  const [wishes,    setWishes]    = useState([
    'Her bakışınız böyle gülsün. 🌸',
    'Bu akşam kadar zarif bir ömür olsun. ✨',
    'Kalabalığın içinde hep birbirinizi bulun. 💕',
  ]);
  const [playerOpen, setPlayerOpen] = useState(false);

  const mp = useMusicPlayer();

  /* countdown */
  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  /* lightbox keyboard */
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape')     setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % GALLERY.length);
      if (e.key === 'ArrowLeft')  setLightbox(i => (i - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const addWish = (e) => {
    e.preventDefault();
    if (!wishText.trim()) return;
    setWishes(w => [wishText.trim(), ...w].slice(0, 8));
    setWishText('');
  };

  const calUrl = (() => {
    const s = new Date(EVENT.dateISO);
    const en = new Date(EVENT.dateEnd);
    const p = new URLSearchParams({
      action: 'TEMPLATE', text: EVENT.calTitle,
      dates: `${fmtCal(s)}/${fmtCal(en)}`,
      details: 'Nişan kutlamamızda sizi aramızda görmek isteriz.',
      location: `${EVENT.venue}, ${EVENT.city}`,
    });
    return `https://calendar.google.com/calendar/render?${p}`;
  })();

  const dateStr = new Intl.DateTimeFormat('tr-TR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date(EVENT.dateISO));

  const pct = mp.duration ? (mp.progress / mp.duration) * 100 : 0;

  return (
    <div className="shell">
      {/* ── hidden audio ── */}
      <audio
        ref={mp.audioRef}
        onEnded={mp.next}
        onTimeUpdate={mp.onTimeUpdate}
        onLoadedMetadata={mp.onLoadedMetadata}
        preload="metadata"
      />

      {/* ══ NAV ══════════════════════════════════════════════ */}
      <nav className="topbar">
        <a className="brand" href="#top">
          <Heart size={16} />
          <span>{EVENT.couple}</span>
        </a>
        <div className="nav-links">
          <a href="#story">Hikaye</a>
          <a href="#program">Program</a>
          <a href="#gallery">Galeri</a>
          <a href="#wishes">Dilekler</a>
        </div>
        <a className="nav-cta" href="#details">
          <MapPin size={15} />
          <span>Konum</span>
        </a>
      </nav>

      {/* ══ MUSIC PLAYER ════════════════════════════════════ */}
      <div className={`music-widget ${playerOpen ? 'open' : 'collapsed'}`}>
        <button className="music-toggle" onClick={() => setPlayerOpen(v => !v)} aria-label="Müzik çaları aç/kapat">
          <Music2 size={15} />
          {playerOpen && <span>Müzik</span>}
        </button>
        {playerOpen && (
          <div className="music-body">
            <div className="music-track">
              <span className="music-title">{mp.track.title}</span>
              <span className="music-artist">{mp.track.artist}</span>
            </div>
            <div className="music-progress" onClick={mp.seek}>
              <div className="music-bar" style={{ width: `${pct}%` }} />
            </div>
            <div className="music-controls">
              <button onClick={mp.prev} aria-label="Önceki"><SkipForward size={14} style={{ transform: 'scaleX(-1)' }} /></button>
              <button className="play-btn" onClick={mp.togglePlay} aria-label={mp.playing ? 'Duraklat' : 'Oynat'}>
                {mp.playing ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button onClick={mp.next} aria-label="Sonraki"><SkipForward size={14} /></button>
              <button onClick={() => mp.setMuted(m => !m)} aria-label="Sesi kapat/aç">
                {mp.muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ══ HERO ════════════════════════════════════════════ */}
      <header className="hero" id="top">
        <img className="hero-bg" src={BG_PHOTO} alt="" loading="eager" />
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={13} /> Ailelerimizle birlikte</p>
            <h1>Nişanımıza<br/>davetlisiniz</h1>
            <p className="hero-couple">{EVENT.herName} <span>&</span> {EVENT.hisName}</p>
            <p className="hero-sub">Bir günü sadece bir tören değil, sevdiklerimizle birlikte yazılan sıcak bir hikâye yapmak istiyoruz.</p>
            <div className="hero-btns">
              <a className="btn primary" href="#details"><MapPin size={16} /><span>Bilgilere bak</span></a>
              <a className="btn ghost" href="#gallery"><Camera size={16} /><span>Fotoğraflar</span></a>
            </div>
          </div>
          <div className="hero-right">
            <div className="photo-stack">
              <figure className="ph ph-main"><img src={HERO_PHOTO} alt="Seren ve Emircan" loading="eager" /></figure>
              <figure className="ph ph-side"><img src={HERO_PHOTO2} alt="Birlikte" /></figure>
            </div>
            <div className="countdown">
              {Object.entries(remaining).map(([k, v]) => (
                <div className="cd-item" key={k}>
                  <strong>{String(v).padStart(2, '0')}</strong>
                  <span>{k === 'days' ? 'gün' : k === 'hours' ? 'saat' : k === 'minutes' ? 'dk' : 'sn'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="scroll-hint" aria-hidden="true">
          <span />
        </div>
      </header>

      {/* ══ DETAILS BAND ════════════════════════════════════ */}
      <section className="details-band" id="details">
        <div className="detail-card">
          <CalendarDays size={22} />
          <span>Tarih</span>
          <strong>{dateStr}</strong>
        </div>
        <div className="detail-card">
          <Clock size={22} />
          <span>Saat</span>
          <strong>13:00 – 17:00</strong>
        </div>
        <div className="detail-card clickable" onClick={() => window.open(EVENT.mapsUrl, '_blank')}>
          <MapPin size={22} />
          <span>Mekan</span>
          <strong>{EVENT.venue}</strong>
          <em>Çamlıca, İstanbul</em>
        </div>
      </section>

      <main>
        {/* ══ STORY ═══════════════════════════════════════ */}
        <section className="story-section" id="story">
          <div className="story-copy">
            <p className="eyebrow"><Heart size={13} /> Küçük bir hikâye</p>
            <h2>Kalabalığın içinde<br/>hep aynı yere bakan<br/>iki kişi.</h2>
            <p>Yıllar içinde biriktirilen küçük anlar, bakışlar, gülüşler... Hepsi bu geceye doğru aktı. Sizi de bu sihirli anın bir parçası yapmak istiyoruz.</p>
            <div className="quote-block">
              <Sparkles size={18} />
              <span>"Seninle her şeye varım ben."</span>
            </div>
          </div>
          <div className="story-collage">
            <img className="sc-a" src={STORY_PHOTO1} alt="Çiçekli aynada poz" />
            <img className="sc-b" src={STORY_PHOTO2} alt="Karlı günde birlikte" />
            <img className="sc-c" src={STORY_PHOTO3} alt="Işıklar altında" />
          </div>
        </section>

        {/* ══ PROGRAM ═════════════════════════════════════ */}
        <section className="program-section" id="program">
          <div className="program-header">
            <p className="eyebrow"><Clock size={13} /> Günün programı</p>
            <h2>Sade, sıcak ve telaşsız.</h2>
          </div>
          <div className="program-layout">
            <div className="program-photo">
              <img src={PROGRAM_PHOTO} alt="Zarif çift fotoğrafı" loading="lazy" />
            </div>
            <div className="flow-list">
              {FLOW.map((item, i) => (
                <div className="flow-item" key={i}>
                  <time>{item.time}</time>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ GALLERY ══════════════════════════════════════ */}
        <section className="gallery-section" id="gallery">
          <div className="gallery-header">
            <p className="eyebrow"><Camera size={13} /> Fotoğraf günlüğü</p>
            <h2>Biraz şehir, biraz kahkaha,<br/>biraz da o güzel telaş.</h2>
          </div>
          <div className="gallery-grid">
            {GALLERY.map((photo, i) => (
              <button
                className={`g-card g-card-${(i % 5) + 1}`}
                key={i}
                type="button"
                onClick={() => setLightbox(i)}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <span>{photo.tone}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ══ WISHES ════════════════════════════════════════ */}
        <section className="wishes-section" id="wishes">
          <div className="wishes-header">
            <p className="eyebrow"><Sparkles size={13} /> Dilek defteri</p>
            <h2>Güzel bir cümle bırak.</h2>
          </div>
          <div className="wishes-layout">
            <form className="wish-form" onSubmit={addWish}>
              <input
                type="text"
                value={wishText}
                onChange={e => setWishText(e.target.value)}
                placeholder="Kısa bir dilek yaz..."
                maxLength={90}
                aria-label="Dilek mesajı"
              />
              <button type="submit" aria-label="Gönder"><Send size={16} /></button>
            </form>
            <div className="wish-list">
              {wishes.map((w, i) => (
                <p key={i} className="wish-item">{w}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FINAL CTA ════════════════════════════════════ */}
        <section className="final-section">
          <img src={FINAL_PHOTO} alt="" loading="lazy" />
          <div className="final-overlay" />
          <div className="final-inner">
            <p className="eyebrow light"><Sparkles size={13} /> 27 Haziran 2026</p>
            <h2>Takvimine ekle,<br/>yolu kaybetme.</h2>
            <div className="final-btns">
              <a className="btn primary" href={calUrl} target="_blank" rel="noreferrer">
                <CalendarDays size={16} /><span>Takvime ekle</span>
              </a>
              <a className="btn ghost-light" href={EVENT.mapsUrl} target="_blank" rel="noreferrer">
                <Navigation size={16} /><span>Konumu aç</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ══ FOOTER ════════════════════════════════════════ */}
      <footer>
        <Heart size={15} />
        <span>{EVENT.couple} · {EVENT.venue} · 27.06.2026</span>
        <Heart size={15} />
      </footer>

      {/* ══ LIGHTBOX ══════════════════════════════════════ */}
      {lightbox !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <button className="lb-close" type="button" onClick={() => setLightbox(null)} aria-label="Kapat"><X size={22} /></button>
          <button className="lb-nav lb-prev" type="button" onClick={e => { e.stopPropagation(); setLightbox(i => (i - 1 + GALLERY.length) % GALLERY.length); }} aria-label="Önceki"><ChevronLeft size={26} /></button>
          <figure onClick={e => e.stopPropagation()}>
            <img src={GALLERY[lightbox].src} alt={GALLERY[lightbox].alt} />
            <figcaption>{GALLERY[lightbox].tone}</figcaption>
          </figure>
          <button className="lb-nav lb-next" type="button" onClick={e => { e.stopPropagation(); setLightbox(i => (i + 1) % GALLERY.length); }} aria-label="Sonraki"><ChevronRight size={26} /></button>
        </div>
      )}
    </div>
  );
}
