import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  CalendarDays, Camera, ChevronLeft, ChevronRight, Clock,
  Heart, MapPin, Music2, Navigation, Pause, Play,
  Send, Shuffle, SkipForward, Volume2, VolumeX, X,
} from 'lucide-react';

/* ─── Event Info ─────────────────────────────────────────── */
const EVENT = {
  couple: 'Seren & Emircan',
  herName: 'Seren',
  hisName: 'Emircan',
  dateISO: '2026-06-27T13:00:00+03:00',
  dateEnd: '2026-06-27T17:00:00+03:00',
  venue: 'Çamlıca Park Night',
  city: 'İstanbul',
  mapsUrl: 'https://maps.google.com/?q=Çamlıca+Park+Night+Istanbul',
  calTitle: 'Seren & Emircan Nişan Töreni',
  sheetsUrl: 'https://script.google.com/macros/s/AKfycbxwhxghB0e5AZ2lBNxoo69NXuFsNO7tzwrNcWf-c3dZxNbMoMbJ29Uc5uCtpEGW1R7GGg/exec',
};

const INITIAL_WISHES = [
  { id: '1', name: 'Ayşe Teyze', message: 'Canım Seren ve Emircan, yüzükleriniz hayırlı olsun. Ömür boyu birbirinizin gözünün içine böyle sevgiyle bakın inşallah. 💕', color: 'rose', date: '2026-05-19T10:00:00.000Z' },
  { id: '2', name: 'Can & Sinem', message: 'İlk adımı attınız, gerisi su gibi gelsin! Harika bir nişan gecesi olacağından eminiz, sabırsızlıkla bekliyoruz! 🥂✨', color: 'sage', date: '2026-05-19T11:15:00.000Z' },
  { id: '3', name: 'Zeynep H.', message: 'Birbirinize her zaman böyle saygıyla, tutkuyla ve anlayışla sarılın. Tebrikler, çok mutlu olun! 🌸', color: 'cream', date: '2026-05-19T12:00:00.000Z' },
  { id: '4', name: 'Murat Arslan', message: 'Kardeşim Emircan ve yengemiz Seren, mutluluğunuz daim olsun. Birlikte kuracağınız o güzel yuvaya giden ilk kapı açılıyor! 🗝️💍', color: 'gold', date: '2026-05-19T13:05:00.000Z' },
];

const TRACKS = [
  { file: '/music/ed_sheeran_perfect.mp3', title: 'Perfect', artist: 'Ed Sheeran' },
  { file: '/music/lady_gaga_bruno_mars_die_with_a_smile.mp3', title: 'Die With A Smile', artist: 'Lady Gaga & Bruno Mars' },
  { file: '/music/until_i_found_you.mp3', title: 'Until I Found You', artist: 'Em Beihold' },
  { file: '/music/berkant_samanyolu.mp3', title: 'Samanyolu', artist: 'Berkant' },
  { file: '/music/kayahan_seninle_her_seye_varim.mp3', title: 'Seninle Her Şeye Varım', artist: 'Kayahan & İpek Acar' },
  { file: '/music/michael_buble_sway.mp3', title: 'Sway', artist: 'Michael Bublé' },
  { file: '/music/yalin_her_sey_sensin.mp3', title: 'Her Şey Sensin', artist: 'Yalın' },
  { file: '/music/emily_watts_la_vie_en_rose.mp3', title: 'La Vie En Rose', artist: 'Emily Watts' },
  { file: '/music/kenan_dogulu_gelinim.mp3', title: 'Gelinim', artist: 'Kenan Doğulu' },
  { file: '/music/esin_engin_papatya_gibisin.mp3', title: 'Papatya Gibisin', artist: 'Esin Engin' },
  { file: '/music/sylvie_vartan_la_maritza.mp3', title: 'La Maritza', artist: 'Sylvie Vartan' },
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
  { src: '/photos/img-8617.jpg', alt: 'Bahçede şık çift fotoğrafı', tone: 'Zarif akşam' },
  { src: '/photos/img-6532.jpg', alt: 'Çiçekli aynada birlikte poz', tone: 'Çiçekli durak' },
  { src: '/photos/img-5486.jpg', alt: 'Işıklar altında birlikte', tone: 'Işıklar' },
  { src: '/photos/img-6463.jpg', alt: 'Karlı günde gülümseyen çift', tone: 'Kış neşesi' },
  { src: '/photos/img-7137.jpg', alt: 'Romantik bir an', tone: 'İlk bakış' },
  { src: '/photos/whatsapp-1.jpg', alt: 'Göz göze mutlu bir an', tone: 'Birlikte' },
  { src: '/photos/img-6182.jpg', alt: 'Sıcak bir selfie', tone: 'Yakınlık' },
  { src: '/photos/img-6310.jpg', alt: 'Soğuk havada selfie', tone: 'Sakin gün' },
  { src: '/photos/img-5299.jpg', alt: 'Gülüşler', tone: 'Kahkaha' },
  { src: '/photos/img-4972.jpg', alt: 'Şehir manzarasında çift', tone: 'Manzara' },
  { src: '/photos/whatsapp-2.jpg', alt: 'Sıcak ve içten bir gülüş', tone: 'Samimiyet' },
];

const HERO_PHOTO = '/photos/img-7137.jpg';
const HERO_PHOTO2 = '/photos/img-8617.jpg';
const BG_PHOTO = '/photos/goruntu.jpg';
const STORY_PHOTO1 = '/photos/img-6532.jpg';
const STORY_PHOTO2 = '/photos/img-6463.jpg';
const STORY_PHOTO3 = '/photos/img-5486.jpg';
const PROGRAM_PHOTO = '/photos/whatsapp-1.jpg';
const FINAL_PHOTO = '/photos/whatsapp-3.jpg';

/* ─── Timeline ───────────────────────────────────────────── */
const FLOW = [
  { time: '13:00', title: 'Karşılama', text: 'İlk ikramlar, çiçekli masalar ve sıcak gülüşler.' },
  { time: '13:45', title: 'Yüzük töreni', text: 'Ailelerimizle birlikte, kalpten gelen o özel an.' },
  { time: '14:30', title: 'Tatlı masası', text: 'Pasta, tatlılar ve masalar arası keyifli sohbet.' },
  { time: '15:30', title: 'Müzik & kutlama', text: 'Hafif başlayan, sonra neşelenen bir kutlama.' },
  { time: '17:00', title: 'Kapanış', text: 'Bol fotoğraf ve güzel dileklerle vedalaşma.' },
];

/* ─── Countdown ──────────────────────────────────────────── */
function getRemaining() {
  const diff = Math.max(0, new Date(EVENT.dateISO).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function fmtCal(d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }

/* ════════════════════════════════════════════════════════════
   MUSIC PLAYER HOOK
═══════════════════════════════════════════════════════════ */
function useMusicPlayer() {
  const audioRef = useRef(null);
  const [queue] = useState(() => shuffle(TRACKS));
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [started, setStarted] = useState(false);

  const track = queue[index];

  /* auto-play on first user interaction */
  const tryAutoPlay = useCallback(() => {
    if (started) return;
    setStarted(true);
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => { });
  }, [started]);

  useEffect(() => {
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(e => document.addEventListener(e, tryAutoPlay, { once: true }));
    return () => events.forEach(e => document.removeEventListener(e, tryAutoPlay));
  }, [tryAutoPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = track.file;
    audio.volume = volume;
    audio.muted = muted;
    if (playing) audio.play().catch(() => { });
  }, [index]); // eslint-disable-line

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  const next = useCallback(() => setIndex(i => (i + 1) % queue.length), [queue.length]);
  const prev = useCallback(() => setIndex(i => (i - 1 + queue.length) % queue.length), [queue.length]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().then(() => setPlaying(true)).catch(() => { }); }
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
  const [lightbox, setLightbox] = useState(null);
  const [wishText, setWishText] = useState('');
  const [senderName, setSenderName] = useState('');
  const [wishColor, setWishColor] = useState('rose');
  const [loading, setLoading] = useState(false);
  const [wishes, setWishes] = useState(() => {
    const local = localStorage.getItem('wedding_wishes');
    if (local) {
      try { return JSON.parse(local); } catch (e) { return INITIAL_WISHES; }
    }
    return INITIAL_WISHES;
  });
  const [playerOpen, setPlayerOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mp = useMusicPlayer();

  /* load wishes from sheets if configured */
  useEffect(() => {
    if (!EVENT.sheetsUrl) return;
    fetch(`${EVENT.sheetsUrl}?_=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const parsed = data.map(item => ({
            id: item.id || Math.random().toString(),
            name: item.name || 'Misafir',
            message: item.message || '',
            color: item.color || ['rose', 'sage', 'cream', 'gold'][Math.floor(Math.random() * 4)],
            date: item.date || new Date().toISOString()
          })).reverse();
          setWishes(parsed);
          localStorage.setItem('wedding_wishes', JSON.stringify(parsed));
        }
      })
      .catch(err => console.error('Dilekler yüklenirken hata:', err));
  }, []);

  /* countdown */
  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  /* lightbox keyboard */
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % GALLERY.length);
      if (e.key === 'ArrowLeft') setLightbox(i => (i - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const addWish = async (e) => {
    e.preventDefault();
    if (!senderName.trim() || !wishText.trim()) return;

    const newWish = {
      id: Date.now().toString(),
      name: senderName.trim(),
      message: wishText.trim(),
      color: wishColor,
      date: new Date().toISOString()
    };

    setLoading(true);

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('wedding_wishes', JSON.stringify(updated));

    setWishText('');
    setSenderName('');

    if (EVENT.sheetsUrl) {
      try {
        await fetch(EVENT.sheetsUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newWish)
        });
      } catch (err) {
        console.error('Dilek gönderim hatası:', err);
      }
    }

    setLoading(false);
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
            <p className="eyebrow">Ailelerimizle birlikte</p>
            <h1>Bu mutlu günümüzde<br />yanımızda olun</h1>
            <p className="hero-couple">{EVENT.herName} <span>&</span> {EVENT.hisName}</p>
            <p className="hero-sub">Sadece bir tören değil; en sevdiklerimizle bol kahkahalı, sıcacık ve unutulmaz bir gün geçirmek istiyoruz. Bu güzel hikayeye siz de ortak olun!</p>
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
            <h2>Göz göze, kalp kalbe<br />başlayan<br />yepyeni bir hayat.</h2>
            <p>Yıllar içinde biriktirdiğimiz güzel anılar, içten gülüşler ve sevgi dolu bakışlar bizi bu özel güne getirdi. Parmaklarımıza takılacak o ilk zarif halkalarla geleceğe ilk adımı atarken, bu heyecan dolu anı bizimle paylaşmanız bizim için en büyük hediye.</p>
            <div className="quote-block">
              <span>"Seninle her şeye varım ben."</span>
            </div>
          </div>
          <div className="story-collage">
            <img className="sc-a" src={STORY_PHOTO1} alt="Çiçekli aynada poz" />
            <img className="sc-b" src={STORY_PHOTO2} alt="Karlı günde birlikte" />
            <img className="sc-c" src={STORY_PHOTO3} alt="Işıklar altında" />
          </div>
        </section>

        {/* ══ WISHES ════════════════════════════════════════ */}
        <section className="wishes-section" id="wishes">
          <div className="wishes-header">
            <p className="eyebrow">Dilek defteri</p>
            <h2>Bizim için birkaç güzel söz<br />bırakmak ister misiniz?</h2>
            <p className="wishes-sub">Yazacağınız her not, bu tatlı telaşımızda bizlere en güzel hatıra olarak kalacak.</p>
          </div>

          <div className="wishes-container">
            {/* Form */}
            <div className="wish-form-wrapper">
              <form className="wish-card-form" onSubmit={addWish}>
                <div className="form-group">
                  <label htmlFor="guest-name">Adınız Soyadınız</label>
                  <input
                    id="guest-name"
                    type="text"
                    value={senderName}
                    onChange={e => setSenderName(e.target.value)}
                    placeholder="Örn. Canan Kaya"
                    maxLength={35}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="guest-msg">Dileğiniz veya Mesajınız</label>
                  <textarea
                    id="guest-msg"
                    value={wishText}
                    onChange={e => setWishText(e.target.value)}
                    placeholder="Tebrik mesajı veya içten dileklerinizi yazın..."
                    maxLength={800}
                    required
                  />
                  <span className="char-count">{800 - wishText.length} karakter kaldı</span>
                </div>

                <div className="form-group">
                  <label>Not Kağıdı Rengi</label>
                  <div className="color-selector">
                    {['rose', 'sage', 'cream', 'gold'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`color-dot ${c} ${wishColor === c ? 'active' : ''}`}
                        onClick={() => setWishColor(c)}
                        aria-label={`${c} renkli kağıt seç`}
                      />
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn primary w-100" disabled={loading}>
                  <Send size={15} /> <span>{loading ? 'Gönderiliyor...' : 'Panoya İğnele'}</span>
                </button>
              </form>
            </div>

            {/* Note Board Grid */}
            <div className="wishes-board">
              {wishes.length === 0 ? (
                <div className="wishes-empty-state">
                  <p>Henüz not yazılmamış...<br />İlk tatlı notu siz iğneleyin! 📌</p>
                </div>
              ) : (
                wishes.map((w, i) => (
                  <div key={w.id} className={`wish-note ${w.color}`} style={{ transform: `rotate(${(i % 3 === 0 ? -1.8 : i % 3 === 1 ? 1.8 : -1) + (i % 2 === 0 ? 0.35 : -0.35)}deg)` }}>
                    <div className="note-pin" />
                    <p className="note-message">"{w.message}"</p>
                    <div className="note-footer">
                      <strong className="note-author">{w.name}</strong>
                      <span className="note-date">
                        {new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short' }).format(new Date(w.date))}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
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
            <h2>Birlikte güldüğümüz,<br />heyecanımızı paylaştığımız<br />en güzel anlarımız...</h2>
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

        {/* ══ FINAL CTA ════════════════════════════════════ */}
        <section className="final-section">
          <div className="final-container">
            <div className="final-photo-wrapper">
              <img src={FINAL_PHOTO} alt="Seren & Emircan" loading="lazy" />
            </div>
            <div className="final-content">
              <p className="eyebrow">27 Haziran 2026</p>
              <h2>Bu özel tarihi<br />takviminize not etmeyi unutmayın!</h2>
              <div className="final-btns">
                <a className="btn primary" href={calUrl} target="_blank" rel="noreferrer">
                  <CalendarDays size={16} /><span>Takvime ekle</span>
                </a>
                <a className="btn ghost" href={EVENT.mapsUrl} target="_blank" rel="noreferrer">
                  <Navigation size={16} /><span>Konumu aç</span>
                </a>
              </div>
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

      {/* ── floating wish button ── */}
      <button className="wishes-floating-btn" onClick={() => setDrawerOpen(true)} aria-label="Dilek Defteri">
        <Heart size={16} className="heart-icon" />
        <span>Dilek Defteri</span>
        <span className="wishes-badge">{wishes.length}</span>
      </button>

      {/* ══ GUESTBOOK DRAWER ══════════════════════════════ */}
      {drawerOpen && (
        <div className="drawer-overlay" role="dialog" aria-modal="true" onClick={() => setDrawerOpen(false)}>
          <div className="drawer-content" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Dilek Defteri</h3>
              <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Kapat">
                <X size={20} />
              </button>
            </div>

            <div className="drawer-body">
              {/* Form inside drawer */}
              <form className="wish-card-form" onSubmit={addWish}>
                <div className="form-group">
                  <label htmlFor="drawer-guest-name">Adınız Soyadınız</label>
                  <input
                    id="drawer-guest-name"
                    type="text"
                    value={senderName}
                    onChange={e => setSenderName(e.target.value)}
                    placeholder="Örn. Canan Kaya"
                    maxLength={35}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="drawer-guest-msg">Dileğiniz veya Mesajınız</label>
                  <textarea
                    id="drawer-guest-msg"
                    value={wishText}
                    onChange={e => setWishText(e.target.value)}
                    placeholder="Tebrik mesajı veya içten dileklerinizi yazın..."
                    maxLength={800}
                    required
                  />
                  <span className="char-count">{800 - wishText.length} karakter kaldı</span>
                </div>

                <div className="form-group">
                  <label>Not Kağıdı Rengi</label>
                  <div className="color-selector">
                    {['rose', 'sage', 'cream', 'gold'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`color-dot ${c} ${wishColor === c ? 'active' : ''}`}
                        onClick={() => setWishColor(c)}
                        aria-label={`${c} renkli kağıt seç`}
                      />
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn primary w-100" disabled={loading}>
                  <Send size={15} /> <span>{loading ? 'Gönderiliyor...' : 'Panoya İğnele'}</span>
                </button>
              </form>

              <hr className="drawer-divider" />

              {/* Wishes List inside drawer */}
              <div className="drawer-wishes-list">
                {wishes.length === 0 ? (
                  <div className="wishes-empty-state" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)' }}>
                    <p>Henüz not yazılmamış...<br />İlk tatlı notu siz iğneleyin! 📌</p>
                  </div>
                ) : (
                  wishes.map((w) => (
                    <div key={w.id} className={`wish-note ${w.color}`}>
                      <div className="note-pin" />
                      <p className="note-message">"{w.message}"</p>
                      <div className="note-footer">
                        <strong className="note-author">{w.name}</strong>
                        <span className="note-date">
                          {new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short' }).format(new Date(w.date))}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
