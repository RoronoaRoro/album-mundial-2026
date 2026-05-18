import { useState, useEffect } from "react";
import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

// ─── Data ────────────────────────────────────────────────────────────────────

const ALL_STICKERS: Record<string, string[]> = {
  FWC: ["FWC1","FWC2","FWC3","FWC4","FWC5","FWC6","FWC7","FWC8","FWC9","FWC10","FWC11","FWC12","FWC13","FWC14","FWC15","FWC16","FWC17","FWC18","FWC19"],
  MEX: ["MEX1","MEX2","MEX3","MEX4","MEX5","MEX6","MEX7","MEX8","MEX9","MEX10","MEX11","MEX12","MEX13","MEX14","MEX15","MEX16","MEX17","MEX18","MEX19","MEX20"],
  RSA: ["RSA1","RSA2","RSA3","RSA4","RSA5","RSA6","RSA7","RSA8","RSA9","RSA10","RSA11","RSA12","RSA13","RSA14","RSA15","RSA16","RSA17","RSA18","RSA19","RSA20"],
  KOR: ["KOR1","KOR2","KOR3","KOR4","KOR5","KOR6","KOR7","KOR8","KOR9","KOR10","KOR11","KOR12","KOR13","KOR14","KOR15","KOR16","KOR17","KOR18","KOR19","KOR20"],
  CZE: ["CZE1","CZE2","CZE3","CZE4","CZE5","CZE6","CZE7","CZE8","CZE9","CZE10","CZE11","CZE12","CZE13","CZE14","CZE15","CZE16","CZE17","CZE18","CZE19","CZE20"],
  CAN: ["CAN1","CAN2","CAN3","CAN4","CANS","CAN6","CAN7","CAN8","CAN9","CAN10","CAN11","CAN12","CAN13","CAN14","CAN15","CAN16","CAN17","CAN18","CAN19","CAN20"],
  BIH: ["BIH1","BIH2","BIH3","BIH4","BIH5","BIH6","BIH7","BIH8","BIH9","BIH10","BIH11","BIH12","BIH13","BIH14","BIH15","BIH16","BIH17","BIH18","BIH19","BIH20"],
  QAT: ["QAT1","QAT2","QAT3","QAT4","QAT5","QAT6","QAT7","QAT8","QAT9","QAT10","QAT11","QAT12","QAT13","QAT14","QAT15","QAT16","QAT17","QAT18","QAT19","QAT20"],
  SUI: ["SUI1","SUI2","SUI3","SUI4","SUI5","SUI6","SUI7","SUI8","SUI9","SUI10","SUI11","SUI12","SUI13","SUI14","SUI15","SUI16","SUI17","SUI18","SUI19","SUI20"],
  BRA: ["BRA1","BRA2","BRA3","BRA4","BRA5","BRA6","BRA7","BRA8","BRA9","BRA10","BRA11","BRA12","BRA13","BRA14","BRA15","BRA16","BRA17","BRA18","BRA19","BRA20"],
  MAR: ["MAR1","MAR2","MAR3","MAR4","MAR5","MAR6","MAR7","MAR8","MAR9","MAR10","MAR11","MAR12","MAR13","MAR14","MAR15","MAR16","MAR17","MAR18","MAR19","MAR20"],
  HAI: ["HAI1","HAI2","HAI3","HAI4","HAI5","HAI6","HAI7","HAI8","HAI9","HAI10","HAI11","HAI12","HAI13","HAI14","HAI15","HAI16","HAI17","HAI18","HAI19","HAI20"],
  SCO: ["SCO1","SCO2","SCO3","SCO4","SCO5","SCO6","SCO7","SCO8","SCO9","SCO10","SCO11","SCO12","SCO13","SCO14","SCO15","SCO16","SCO17","SCO18","SCO19","SCO20"],
  USA: ["USA1","USA2","USA3","USA4","USA5","USA6","USA7","USA8","USA9","USA10","USA11","USA12","USA13","USA14","USA15","USA16","USA17","USA18","USA19","USA20"],
  PAR: ["PAR1","PAR2","PAR3","PAR4","PAR5","PAR6","PAR7","PAR8","PAR9","PAR10","PAR11","PAR12","PAR13","PAR14","PAR15","PAR16","PAR17","PAR18","PAR19","PAR20"],
  AUS: ["AUS1","AUS2","AUS3","AUS4","AUS5","AUS6","AUS7","AUS8","AUS9","AUS10","AUS11","AUS12","AUS13","AUS14","AUS15","AUS16","AUS17","AUS18","AUS19","AUS20"],
  TUR: ["TUR1","TUR2","TUR3","TUR4","TUR5","TUR6","TUR7","TUR8","TUR9","TUR10","TUR11","TUR12","TUR13","TUR14","TUR15","TUR16","TUR17","TUR18","TUR19","TUR20"],
  GER: ["GER1","GER2","GER3","GER4","GER5","GER6","GER7","GER8","GER9","GER10","GER11","GER12","GER13","GER14","GER15","GER16","GER17","GER18","GER19","GER20"],
  CUW: ["CUW1","CUW2","CUW3","CUW4","CUW5","CUW6","CUW7","CUW8","CUW9","CUW10","CUW11","CUW12","CUW13","CUW14","CUW15","CUW16","CUW17","CUW18","CUW19","CUW20"],
  CIV: ["CIV1","CIV2","CIV3","CIV4","CIV5","CIV6","CIV7","CIV8","CIV9","CIV10","CIV11","CIV12","CIV13","CIV14","CIV15","CIV16","CIV17","CIV18","CIV19","CIV20"],
  ECU: ["ECU1","ECU2","ECU3","ECU4","ECU5","ECU6","ECU7","ECU8","ECU9","ECU10","ECU11","ECU12","ECU13","ECU14","ECU15","ECU16","ECU17","ECU18","ECU19","ECU20"],
  NED: ["NED1","NED2","NED3","NED4","NED5","NED6","NED7","NED8","NED9","NED10","NED11","NED12","NED13","NED14","NED15","NED16","NED17","NED18","NED19","NED20"],
  JPN: ["JPN1","JPN2","JPN3","JPN4","JPN5","JPN6","JPN7","JPN8","JPN9","JPN10","JPN11","JPN12","JPN13","JPN14","JPN15","JPN16","JPN17","JPN18","JPN19","JPN20"],
  SWE: ["SWE1","SWE2","SWE3","SWE4","SWE5","SWE6","SWE7","SWE8","SWE9","SWE10","SWE11","SWE12","SWE13","SWE14","SWE15","SWE16","SWE17","SWE18","SWE19","SWE20"],
  TUN: ["TUN1","TUN2","TUN3","TUN4","TUN5","TUN6","TUN7","TUN8","TUN9","TUN10","TUN11","TUN12","TUN13","TUN14","TUN15","TUN16","TUN17","TUN18","TUN19","TUN20"],
  BEL: ["BEL1","BEL2","BEL3","BEL4","BEL5","BEL6","BEL7","BEL8","BEL9","BEL10","BEL11","BEL12","BEL13","BEL14","BEL15","BEL16","BEL17","BEL18","BEL19","BEL20"],
  EGY: ["EGY1","EGY2","EGY3","EGY4","EGY5","EGY6","EGY7","EGY8","EGY9","EGY10","EGY11","EGY12","EGY13","EGY14","EGY15","EGY16","EGY17","EGY18","EGY19","EGY20"],
  IRN: ["IRN1","IRN2","IRN3","IRN4","IRN5","IRN6","IRN7","IRN8","IRN9","IRN10","IRN11","IRN12","IRN13","IRN14","IRN15","IRN16","IRN17","IRN18","IRN19","IRN20"],
  NZL: ["NZL1","NZL2","NZL3","NZL4","NZL5","NZL6","NZL7","NZL8","NZL9","NZL10","NZL11","NZL12","NZL13","NZL14","NZL15","NZL16","NZL17","NZL18","NZL19","NZL20"],
  ESP: ["ESP1","ESP2","ESP3","ESP4","ESP5","ESP6","ESP7","ESP8","ESP9","ESP10","ESP11","ESP12","ESP13","ESP14","ESP15","ESP16","ESP17","ESP18","ESP19","ESP20"],
  CPV: ["CPV1","CPV2","CPV3","CPV4","CPV5","CPV6","CPV7","CPV8","CPV9","CPV10","CPV11","CPV12","CPV13","CPV14","CPV15","CPV16","CPV17","CPV18","CPV19","CPV20"],
  KSA: ["KSA1","KSA2","KSA3","KSA4","KSA5","KSA6","KSA7","KSA8","KSA9","KSA10","KSA11","KSA12","KSA13","KSA14","KSA15","KSA16","KSA17","KSA18","KSA19","KSA20"],
  URU: ["URU1","URU2","URU3","URU4","URU5","URU6","URU7","URU8","URU9","URU10","URU11","URU12","URU13","URU14","URU15","URU16","URU17","URU18","URU19","URU20"],
  FRA: ["FRA1","FRA2","FRA3","FRA4","FRA5","FRA6","FRA7","FRA8","FRA9","FRA10","FRA11","FRA12","FRA13","FRA14","FRA15","FRA16","FRA17","FRA18","FRA19","FRA20"],
  SEN: ["SEN1","SEN2","SEN3","SEN4","SEN5","SEN6","SEN7","SEN8","SEN9","SEN10","SEN11","SEN12","SEN13","SEN14","SEN15","SEN16","SEN17","SEN18","SEN19","SEN20"],
  IRQ: ["IRQ1","IRQ2","IRQ3","IRQ4","IRQ5","IRQ6","IRQ7","IRQ8","IRQ9","IRQ10","IRQ11","IRQ12","IRQ13","IRQ14","IRQ15","IRQ16","IRQ17","IRQ18","IRQ19","IRQ20"],
  NOR: ["NOR1","NOR2","NOR3","NOR4","NOR5","NOR6","NOR7","NOR8","NOR9","NOR10","NOR11","NOR12","NOR13","NOR14","NOR15","NOR16","NOR17","NOR18","NOR19","NOR20"],
  ARG: ["ARG1","ARG2","ARG3","ARG4","ARG5","ARG6","ARG7","ARG8","ARG9","ARG10","ARG11","ARG12","ARG13","ARG14","ARG15","ARG16","ARG17","ARG18","ARG19","ARG20"],
  ALG: ["ALG1","ALG2","ALG3","ALG4","ALG5","ALG6","ALG7","ALG8","ALG9","ALG10","ALG11","ALG12","ALG13","ALG14","ALG15","ALG16","ALG17","ALG18","ALG19","ALG20"],
  AUT: ["AUT1","AUT2","AUT3","AUT4","AUT5","AUT6","AUT7","AUT8","AUT9","AUT10","AUT11","AUT12","AUT13","AUT14","AUT15","AUT16","AUT17","AUT18","AUT19","AUT20"],
  JOR: ["JOR1","JOR2","JOR3","JOR4","JOR5","JOR6","JOR7","JOR8","JOR9","JOR10","JOR11","JOR12","JOR13","JOR14","JOR15","JOR16","JOR17","JOR18","JOR19","JOR20"],
  POR: ["POR1","POR2","POR3","POR4","POR5","POR6","POR7","POR8","POR9","POR10","POR11","POR12","POR13","POR14","POR15","POR16","POR17","POR18","POR19","POR20"],
  COD: ["COD1","COD2","COD3","COD4","COD5","COD6","COD7","COD8","COD9","COD10","COD11","COD12","COD13","COD14","COD15","COD16","COD17","COD18","COD19","COD20"],
  UZB: ["UZB1","UZB2","UZB3","UZB4","UZB5","UZB6","UZB7","UZB8","UZB9","UZB10","UZB11","UZB12","UZB13","UZB14","UZB15","UZB16","UZB17","UZB18","UZB19","UZB20"],
  COL: ["COL1","COL2","COL3","COL4","COL5","COL6","COL7","COL8","COL9","COL10","COL11","COL12","COL13","COL14","COL15","COL16","COL17","COL18","COL19","COL20"],
  ENG: ["ENG1","ENG2","ENG3","ENG4","ENG5","ENG6","ENG7","ENG8","ENG9","ENG10","ENG11","ENG12","ENG13","ENG14","ENG15","ENG16","ENG17","ENG18","ENG19","ENG20"],
  CRO: ["CRO1","CRO2","CRO3","CRO4","CRO5","CRO6","CRO7","CRO8","CRO9","CRO10","CRO11","CRO12","CRO13","CRO14","CRO15","CRO16","CRO17","CRO18","CRO19","CRO20"],
  GHA: ["GHA1","GHA2","GHA3","GHA4","GHA5","GHA6","GHA7","GHA8","GHA9","GHA10","GHA11","GHA12","GHA13","GHA14","GHA15","GHA16","GHA17","GHA18","GHA19","GHA20"],
  PAN: ["PAN1","PAN2","PAN3","PAN4","PAN5","PAN6","PAN7","PAN8","PAN9","PAN10","PAN11","PAN12","PAN13","PAN14","PAN15","PAN16","PAN17","PAN18","PAN19","PAN20"],
  CC: ["CC1","CC2","CC3","CC4","CC5","CC6","CC7","CC8","CC9","CC10","CC11","CC12","CC13","CC14"],
};

const ALL_CODES = Object.values(ALL_STICKERS).flat();
const TOTAL = ALL_CODES.length;

// ─── Storage ─────────────────────────────────────────────────────────────────

interface AlbumData {
  owned: string[];
  duplicates: Record<string, number>;
}

async function loadData(): Promise<AlbumData> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { owned: [], duplicates: {} };

  const { data, error } = await supabase
    .from('album')
    .select('owned, duplicates')
    .eq('user_id', user.id)
    .single();

  if (error || !data) {
    await supabase.from('album').insert({
      id: user.id,
      user_id: user.id,
      owned: [],
      duplicates: {},
    });
    return { owned: [], duplicates: {} };
  }

  return {
    owned: data.owned ?? [],
    duplicates: data.duplicates ?? {},
  };
}

async function saveData(albumData: AlbumData) {
  await supabase
    .from('album')
    .update({ owned: albumData.owned, duplicates: albumData.duplicates, updated_at: new Date().toISOString() })
    .eq('user_id', (await supabase.auth.getUser()).data.user!.id);
}

// ─── Auth Screen ──────────────────────────────────────────────────────────────

function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(''); setMessage(''); setLoading(true);
    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { data: { display_name: name } }
      });
      if (error) setError(error.message);
      else setMessage('Revisa tu correo para confirmar el registro.');
    }
    setLoading(false);
  };

  const inp: React.CSSProperties = {
    width: '100%', padding: '10px 14px', background: '#111827',
    border: '1px solid #2a3a6e', borderRadius: 8, color: '#e8eaf0',
    fontSize: 14, outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <div style={{ width: 360, background: '#111827', border: '1px solid #1e2d5a', borderRadius: 14, padding: '32px 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{ fontSize: 36 }}>⚽</span>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#fff', marginTop: 8 }}>Álbum Mundial 2026</div>
          <div style={{ fontSize: 12, color: '#7a8bbf', marginTop: 4 }}>
            {mode === 'login' ? 'Inicia sesión para continuar' : 'Crea tu cuenta'}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mode === 'register' && (
            <input style={inp} placeholder="Tu nombre" value={name} onChange={e => setName(e.target.value)} />
          )}
          <input style={inp} type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} />
          <input style={inp} type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()} />

          {error && <div style={{ fontSize: 12, color: '#ef9a9a', background: '#2a1010', border: '1px solid #c62828', borderRadius: 6, padding: '8px 12px' }}>{error}</div>}
          {message && <div style={{ fontSize: 12, color: '#a5d6a7', background: '#0d1e10', border: '1px solid #2e7d32', borderRadius: 6, padding: '8px 12px' }}>{message}</div>}

          <button onClick={handleSubmit} disabled={loading} style={{
            padding: '10px', background: '#1565c0', border: 'none', borderRadius: 8,
            color: '#fff', fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1, marginTop: 4,
          }}>
            {loading ? 'Cargando…' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>

          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setMessage(''); }}
            style={{ background: 'transparent', border: 'none', color: '#7a8bbf', fontSize: 13, cursor: 'pointer', marginTop: 4 }}>
            {mode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

type Tab = "album" | "duplicates";

export default function AlbumMundial2026() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [saved, setSaved] = useState<AlbumData>({ owned: [], duplicates: {} });
  const [pending, setPending] = useState<AlbumData>({ owned: [], duplicates: {} });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<Tab>("album");
  const [search, setSearch] = useState("");

  // Escuchar cambios de sesión
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Cargar datos cuando hay usuario
  useEffect(() => {
    if (!user) return;
    loadData().then(d => {
      setSaved(d);
      setPending(d);
      setLoading(false);
    });
  }, [user]);

  const savedSet = new Set(saved.owned);
  const pendingSet = new Set(pending.owned);
  const added = pending.owned.filter(c => !savedSet.has(c));
  const removed = saved.owned.filter(c => !pendingSet.has(c));
  const hasPendingChanges = added.length > 0 || removed.length > 0;

  const toggleOwned = (code: string) => {
    const owned = new Set(pending.owned);
    const dups = { ...pending.duplicates };
    if (owned.has(code)) { owned.delete(code); delete dups[code]; }
    else owned.add(code);
    setPending({ owned: [...owned], duplicates: dups });
  };

  const changeDup = (code: string, delta: number) => {
    const dups = { ...pending.duplicates };
    const next = Math.max(0, (dups[code] ?? 0) + delta);
    if (next === 0) delete dups[code]; else dups[code] = next;
    const next_data = { ...pending, duplicates: dups };
    setPending(next_data); setSaved(next_data); saveData(next_data);
  };

  const handleSave = async () => {
    setSaving(true);
    await saveData(pending);
    setSaved(pending);
    setSaving(false);
  };

  const handleDiscard = () => setPending(saved);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const totalOwned = pending.owned.length;
  const totalDups = Object.values(pending.duplicates).reduce((a, b) => a + b, 0);
  const pct = Math.round((totalOwned / TOTAL) * 100);

  const filteredGroups = Object.entries(ALL_STICKERS).filter(([group, codes]) => {
    if (!search) return true;
    const q = search.toUpperCase();
    return group.includes(q) || codes.some(c => c.toUpperCase().includes(q));
  });

  // Pantallas de carga y auth
  if (authLoading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0f1e', color: '#7a8bbf', fontSize: 16 }}>
      Cargando…
    </div>
  );

  if (!user) return <AuthScreen />;

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0f1e', color: '#7a8bbf', fontSize: 16 }}>
      Cargando álbum...
    </div>
  );

  const displayName = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Usuario';

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#0a0f1e", color: "#e8eaf0" }}>
      {/* Header */}
      <header style={{ background: "linear-gradient(135deg, #0d1b3e 0%, #1a2a5e 50%, #0d1b3e 100%)", borderBottom: "1px solid #2a3a6e", padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div className="header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>⚽</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-0.3px", color: "#fff" }}>Álbum Mundial 2026</div>
              <div style={{ fontSize: 11, color: "#7a8bbf", letterSpacing: "0.5px" }}>{displayName.toUpperCase()}</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#4fc3f7", lineHeight: 1 }}>{totalOwned}</div>
              <div style={{ fontSize: 10, color: "#7a8bbf", marginTop: 2 }}>de {TOTAL}</div>
            </div>
            <div style={{ width: 120 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#7a8bbf", marginBottom: 4 }}>
                <span>Completado</span><span style={{ color: "#4fc3f7", fontWeight: 600 }}>{pct}%</span>
              </div>
              <div style={{ height: 6, background: "#1e2d5a", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #1565c0, #4fc3f7)", borderRadius: 3, transition: "width 0.4s ease" }} />
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#ff7043", lineHeight: 1 }}>{totalDups}</div>
              <div style={{ fontSize: 10, color: "#7a8bbf", marginTop: 2 }}>repetidas</div>
            </div>
            <button onClick={handleLogout} style={{
              background: 'transparent', border: '1px solid #2a3a6e', borderRadius: 6,
              color: '#7a8bbf', fontSize: 12, padding: '6px 12px', cursor: 'pointer',
            }}>
              Salir
            </button>
          </div>
        </div>

        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 0 }}>
          <TabBtn active={tab === "album"} onClick={() => setTab("album")}>⚽ Mi Álbum</TabBtn>
          <TabBtn active={tab === "duplicates"} onClick={() => setTab("duplicates")}>🔄 Repetidas</TabBtn>
        </div>
      </header>

      {/* Barra flotante de cambios pendientes */}
      {hasPendingChanges && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          zIndex: 200, display: "flex", alignItems: "center", gap: 12,
          background: "#111e10", border: "1px solid #2e7d32", borderRadius: 10,
          padding: "10px 18px", boxShadow: "0 4px 24px rgba(0,0,0,0.5)"
        }}>
          <div style={{ fontSize: 13, color: "#a5d6a7" }}>
            {added.length > 0 && <span style={{ color: "#81c784", marginRight: 8 }}>+{added.length} añadida{added.length !== 1 ? "s" : ""}</span>}
            {removed.length > 0 && <span style={{ color: "#e57373" }}>−{removed.length} quitada{removed.length !== 1 ? "s" : ""}</span>}
          </div>
          <button onClick={handleSave} disabled={saving} style={{
            background: "#2e7d32", border: "none", borderRadius: 6,
            color: "#e8f5e9", fontSize: 13, fontWeight: 600,
            padding: "6px 16px", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1,
          }}>
            {saving ? "Guardando…" : "Guardar cambios"}
          </button>
          <button onClick={handleDiscard} style={{
            background: "transparent", border: "1px solid #c62828", borderRadius: 6,
            color: "#ef9a9a", fontSize: 13, padding: "6px 12px", cursor: "pointer",
          }}>
            Descartar
          </button>
        </div>
      )}

      {/* Search */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "16px 24px 0" }}>
        <input
          type="text"
          placeholder="Buscar por selección o código (ej: ARG, BRA15…)"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", padding: "10px 16px", background: "#111827", border: "1px solid #2a3a6e", borderRadius: 8, color: "#e8eaf0", fontSize: 14, outline: "none", boxSizing: "border-box" }}
        />
      </div>

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "16px 24px 80px" }}>
        {tab === "album" ? (
          <AlbumView groups={filteredGroups} savedSet={savedSet} pendingSet={pendingSet} toggleOwned={toggleOwned} />
        ) : (
          <DuplicatesView groups={filteredGroups} ownedSet={pendingSet} duplicates={pending.duplicates} changeDup={changeDup} />
        )}
      </main>
    </div>
  );
}

// ─── Album View ───────────────────────────────────────────────────────────────

function AlbumView({ groups, savedSet, pendingSet, toggleOwned }: {
  groups: [string, string[]][];
  savedSet: Set<string>;
  pendingSet: Set<string>;
  toggleOwned: (code: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {groups.map(([group, codes]) => {
        const owned = codes.filter(c => pendingSet.has(c)).length;
        const pct = Math.round((owned / codes.length) * 100);
        return (
          <div key={group} style={{ background: "#111827", border: "1px solid #1e2d5a", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", background: "#0d1b3e", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #1e2d5a" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: "#c5cae9", letterSpacing: "0.5px" }}>{group}</span>
                <span style={{ fontSize: 12, color: "#7a8bbf" }}>{owned}/{codes.length}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 80, height: 4, background: "#1e2d5a", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#43a047" : "#1565c0", borderRadius: 2, transition: "width 0.3s" }} />
                </div>
                <span style={{ fontSize: 11, color: pct === 100 ? "#43a047" : "#7a8bbf", minWidth: 32, textAlign: "right" }}>{pct}%</span>
              </div>
            </div>
            <div style={{ padding: "10px 12px", display: "flex", flexWrap: "wrap", gap: 5 }}>
              {codes.map(code => {
                const isSaved = savedSet.has(code);
                const isPending = pendingSet.has(code);
                const isAdded = isPending && !isSaved;
                const isRemoved = !isPending && isSaved;

                let bg = "transparent", border = "1px solid #2a3a6e", color = "#4a5a8a", label = code;
                if (isAdded)       { bg = "#1b4d1e"; border = "1px solid #2e7d32"; color = "#a5d6a7"; label = `+ ${code}`; }
                else if (isRemoved){ bg = "#4a1515"; border = "1px solid #c62828"; color = "#ef9a9a"; label = `✕ ${code}`; }
                else if (isSaved)  { bg = "#0d47a1"; border = "1px solid #1565c0"; color = "#90caf9"; label = `✓ ${code}`; }

                return (
                  <button key={code} onClick={() => toggleOwned(code)}
                    title={isAdded ? `Pendiente añadir — clic para cancelar` : isRemoved ? `Pendiente quitar — clic para cancelar` : isSaved ? `Tienes ${code} — clic para quitar` : `No tienes — clic para añadir`}
                    style={{ padding: "4px 8px", fontSize: 11, fontWeight: (isSaved || isAdded || isRemoved) ? 600 : 400, borderRadius: 5, border, background: bg, color, cursor: "pointer", transition: "all 0.15s", letterSpacing: "0.2px", minWidth: 44, textAlign: "center" }}>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Duplicates View ──────────────────────────────────────────────────────────

function DuplicatesView({ groups, ownedSet, duplicates, changeDup }: {
  groups: [string, string[]][];
  ownedSet: Set<string>;
  duplicates: Record<string, number>;
  changeDup: (code: string, delta: number) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 13, color: "#7a8bbf", padding: "4px 0" }}>
        Aquí puedes registrar cuántas repetidas tienes de cada lámina. Solo se muestran láminas que ya tienes. Usa los botones <strong style={{ color: "#e8eaf0" }}>+</strong> / <strong style={{ color: "#e8eaf0" }}>−</strong> para ajustar.
      </div>
      {groups.map(([group, codes]) => {
        const ownedCodes = codes.filter(c => ownedSet.has(c));
        if (ownedCodes.length === 0) return null;
        const groupDups = ownedCodes.reduce((s, c) => s + (duplicates[c] ?? 0), 0);
        return (
          <div key={group} style={{ background: "#111827", border: "1px solid #1e2d5a", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", background: "#0d1b3e", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #1e2d5a" }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: "#c5cae9", letterSpacing: "0.5px" }}>{group}</span>
              {groupDups > 0 && (
                <span style={{ fontSize: 12, color: "#ff8a65", background: "#1a1210", border: "1px solid #3e2720", borderRadius: 5, padding: "2px 8px" }}>
                  {groupDups} repetida{groupDups !== 1 ? "s" : ""}
                </span>
              )}
            </div>
            <div style={{ padding: "10px 12px", display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ownedCodes.map(code => {
                const count = duplicates[code] ?? 0;
                return (
                  <div key={code} style={{ display: "flex", alignItems: "center", gap: 4, background: count > 0 ? "#1a1a0a" : "#0d1b3e", border: count > 0 ? "1px solid #5d4037" : "1px solid #1e2d5a", borderRadius: 6, padding: "4px 6px" }}>
                    <span style={{ fontSize: 11, color: count > 0 ? "#ffcc80" : "#7a8bbf", minWidth: 44, textAlign: "center", fontWeight: count > 0 ? 600 : 400 }}>{code}</span>
                    <button onClick={() => changeDup(code, -1)} disabled={count === 0} style={counterBtn(count === 0)}>−</button>
                    <span style={{ fontSize: 12, fontWeight: 700, minWidth: 16, textAlign: "center", color: count > 0 ? "#ff8a65" : "#4a5a8a" }}>{count}</span>
                    <button onClick={() => changeDup(code, 1)} style={counterBtn(false)}>+</button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{ padding: "10px 20px", background: "transparent", border: "none", borderBottom: active ? "2px solid #4fc3f7" : "2px solid transparent", color: active ? "#4fc3f7" : "#7a8bbf", fontSize: 13, fontWeight: active ? 600 : 400, cursor: "pointer", transition: "all 0.15s", letterSpacing: "0.2px" }}>
      {children}
    </button>
  );
}

function counterBtn(disabled: boolean): React.CSSProperties {
  return { width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", background: disabled ? "transparent" : "#1e2d5a", border: "1px solid #2a3a6e", borderRadius: 4, color: disabled ? "#2a3a6e" : "#90caf9", fontSize: 14, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", padding: 0, lineHeight: 1 };
}