'use client';

import { useState, useEffect, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════
   TYPES — matches your tutors table
   ═══════════════════════════════════════════════════════════════ */

interface Tutor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  main_subject: string;
  description: string;
  profile_photo: string | null;
  intro_video: string | null;
  video_link: string | null;
  hourly_rate: number;
  currency: string;
  is_over_18: boolean;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  submitted_at: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
  total_hours: number;
  average_rating: number | null;
  total_reviews: number;
  steps: TutorStep[];
}

interface TutorStep {
  step_name: string;
  status: 'incomplete' | 'complete' | 'pending_review';
  completed_at: string | null;
}

interface Stats {
  pending_review: number;
  approved_this_month: number;
  rejected_this_month: number;
  total_tutors: number;
}

/* ═══════════════════════════════════════════════════════════════
   API
   ═══════════════════════════════════════════════════════════════ */

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function api(path: string, options?: RequestInit) {
  try {
    const res = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('auth_token') : ''}`,
        ...options?.headers,
      },
    });
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('application/json')) return null;
    return await res.json();
  } catch {
    return null;
  }
}



/* ═══════════════════════════════════════════════════════════════
   SMALL COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function StatCard({ label, value, accent, icon, delay }: {
  label: string; value: number; accent: string; icon: React.ReactNode; delay: number;
}) {
  return (
    <div className="stat-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between mb-5">
        <span className={`stat-icon ${accent}`}>{icon}</span>
        <span className="stat-label">{label}</span>
      </div>
      <p className="stat-value">{value.toLocaleString()}</p>
    </div>
  );
}

function StatusChip({ status }: { status: string }) {
  const cls: Record<string, string> = {
    pending: 'chip-pending',
    approved: 'chip-approved',
    rejected: 'chip-rejected',
    draft: 'chip-draft',
  };
  const txt: Record<string, string> = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    draft: 'Draft',
  };
  return <span className={`chip ${cls[status] || cls.draft}`}>{txt[status] || status}</span>;
}

function StepIndicator({ steps }: { steps: TutorStep[] }) {
  const ordered = ['about', 'photo', 'description', 'video', 'pricing'];
  return (
    <div className="step-bar">
      {ordered.map(name => {
        const step = steps.find(s => s.step_name === name);
        const st = step?.status || 'incomplete';
        return (
          <div key={name} className="step-item" title={`${name}: ${st}`}>
            <span className={`step-dot ${st === 'complete' ? 'step-done' : st === 'pending_review' ? 'step-review' : 'step-todo'}`} />
            <span className="step-label">{name}</span>
          </div>
        );
      })}
    </div>
  );
}

function formatDate(d: string | null) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ═══════════════════════════════════════════════════════════════
   TUTOR CARD
   ═══════════════════════════════════════════════════════════════ */

function TutorCard({ tutor, onView, onApprove, onReject, index }: {
  tutor: Tutor; onView: (t: Tutor) => void;
  onApprove: (id: number) => void; onReject: (id: number) => void; index: number;
}) {
  const initials = `${tutor.first_name[0]}${tutor.last_name[0]}`;
  const colors = [
    'from-teal-400 to-emerald-500', 'from-sky-400 to-blue-500',
    'from-rose-400 to-pink-500', 'from-amber-400 to-orange-500',
    'from-violet-400 to-purple-500', 'from-cyan-400 to-teal-500',
  ];
  const isActionable = tutor.status === 'pending';

  return (
    <div className="tutor-card" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="flex items-start gap-5">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {tutor.profile_photo ? (
            <img src={tutor.profile_photo} alt="" className="w-[52px] h-[52px] rounded-2xl object-cover shadow-sm" />
          ) : (
            <div className={`w-[52px] h-[52px] rounded-2xl bg-gradient-to-br ${colors[tutor.id % colors.length]} flex items-center justify-center text-white text-base font-bold shadow-sm`}>
              {initials}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          {/* Row 1 */}
          <div className="flex items-center gap-2.5 flex-wrap mb-1">
            <h3 className="tutor-name">{tutor.first_name} {tutor.last_name}</h3>
            <StatusChip status={tutor.status} />
          </div>

          {/* Row 2: meta */}
          <div className="meta-row">
            <span>{tutor.email}</span>
            <span className="meta-dot" />
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {tutor.country}
            </span>
            <span className="meta-dot" />
            <span>{tutor.hourly_rate} {tutor.currency}/hr</span>
            {tutor.submitted_at && (
              <>
                <span className="meta-dot" />
                <span>Submitted {formatDate(tutor.submitted_at)}</span>
              </>
            )}
          </div>

          {/* Row 3: subject */}
          <div className="mt-2.5 mb-2.5">
            <span className="subject-tag">{tutor.main_subject}</span>
            {tutor.video_link && (
              <span className="video-tag">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
            )}
            {tutor.average_rating && (
              <span className="rating-tag">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                {tutor.average_rating} ({tutor.total_reviews})
              </span>
            )}
          </div>

          {/* Row 4: description preview */}
          <p className="desc-preview">{tutor.description}</p>

          {/* Row 5: registration steps progress */}
          <StepIndicator steps={tutor.steps} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0 pt-1">
          <button onClick={() => onView(tutor)} className="btn-ghost">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            Review
          </button>
          {isActionable && (
            <>
              <button onClick={() => onApprove(tutor.id)} className="btn-approve">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Approve
              </button>
              <button onClick={() => onReject(tutor.id)} className="btn-reject">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DETAIL DRAWER
   ═══════════════════════════════════════════════════════════════ */

function DetailDrawer({ tutor, onClose, onApprove, onReject }: {
  tutor: Tutor; onClose: () => void;
  onApprove: (id: number) => void; onReject: (id: number) => void;
}) {
  const initials = `${tutor.first_name[0]}${tutor.last_name[0]}`;
  const isActionable = tutor.status === 'pending';

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="drawer-close">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Header */}
        <div className="drawer-header">
          {tutor.profile_photo ? (
            <img src={tutor.profile_photo} alt="" className="w-[72px] h-[72px] rounded-2xl object-cover border-2 border-white/20" />
          ) : (
            <div className="w-[72px] h-[72px] rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-white text-xl font-bold border border-white/20">
              {initials}
            </div>
          )}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-white">{tutor.first_name} {tutor.last_name}</h2>
            <p className="text-white/50 text-sm mt-1">{tutor.email}</p>
            <div className="flex items-center gap-2 mt-3">
              <StatusChip status={tutor.status} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="drawer-body">
          {/* Facts */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {  label: 'Country', value: tutor.country || '—' },
              {  label: 'Rate', value: `${tutor.hourly_rate} ${tutor.currency}/hr` },
              {  label: 'Phone', value: tutor.phone || '—' },
              {  label: 'Submitted', value: formatDate(tutor.submitted_at) },
            ].map(f => (
              <div key={f.label} className="fact-card">
                <div>
                  <p className="fact-label">{f.label}</p>
                  <p className="fact-value">{f.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Subject */}
          <Section title="Subject">
            <span className="subject-tag">{tutor.main_subject}</span>
          </Section>

          {/* Description */}
          <Section title="Description">
            <p className="text-[13px] text-slate-600 leading-relaxed">{tutor.description || 'No description provided.'}</p>
          </Section>

          {/* Video */}
          {tutor.video_link && (
            <Section title="Introduction Video">
              <a href={tutor.video_link} target="_blank" rel="noopener noreferrer" className="video-link">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                <span>Watch introduction video</span>
                <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </Section>
          )}

          {/* Registration Steps */}
          <Section title="Registration Steps">
            <div className="space-y-2">
              {['about', 'photo', 'description', 'video', 'pricing'].map(name => {
                const step = tutor.steps.find(s => s.step_name === name);
                const st = step?.status || 'incomplete';
                return (
                  <div key={name} className="step-row">
                    <div className="flex items-center gap-3">
                      <span className={`step-row-dot ${st === 'complete' ? 'step-done' : st === 'pending_review' ? 'step-review' : 'step-todo'}`} />
                      <span className="text-[13px] font-medium text-slate-700 capitalize">{name}</span>
                    </div>
                    <span className={`text-[11px] font-semibold uppercase tracking-wide ${
                      st === 'complete' ? 'text-emerald-600' : st === 'pending_review' ? 'text-amber-600' : 'text-slate-400'
                    }`}>
                      {st === 'complete' ? 'Complete' : st === 'pending_review' ? 'Pending' : 'Incomplete'}
                    </span>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* Rejection reason */}
          {tutor.status === 'rejected' && tutor.rejection_reason && (
            <Section title="Rejection Reason">
              <div className="rejection-box">
                <p className="text-[13px] text-red-700">{tutor.rejection_reason}</p>
              </div>
            </Section>
          )}

          {/* Stats if approved */}
          {tutor.status === 'approved' && (
            <Section title="Teaching Stats">
              <div className="grid grid-cols-3 gap-3">
                <div className="fact-card flex-col items-center text-center">
                  <p className="text-lg font-bold text-slate-900">{tutor.total_hours}</p>
                  <p className="fact-label">Hours</p>
                </div>
                <div className="fact-card flex-col items-center text-center">
                  <p className="text-lg font-bold text-slate-900">{tutor.average_rating || '—'}</p>
                  <p className="fact-label">Rating</p>
                </div>
                <div className="fact-card flex-col items-center text-center">
                  <p className="text-lg font-bold text-slate-900">{tutor.total_reviews}</p>
                  <p className="fact-label">Reviews</p>
                </div>
              </div>
            </Section>
          )}
        </div>

        {/* Footer */}
        {isActionable && (
          <div className="drawer-footer">
            <button onClick={() => onReject(tutor.id)} className="btn-reject-lg">Reject Application</button>
            <button onClick={() => onApprove(tutor.id)} className="btn-approve-lg">Approve Tutor</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="section-title">{title}</h4>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   REJECT MODAL
   ═══════════════════════════════════════════════════════════════ */

function RejectModal({ tutor, onClose, onConfirm }: {
  tutor: Tutor; onClose: () => void; onConfirm: (reason: string) => void;
}) {
  const [selected, setSelected] = useState('');
  const [details, setDetails] = useState('');

  const reasons = [
    'Incomplete profile',
    'No introduction video',
    'Insufficient qualifications',
    'Inappropriate content',
    'Duplicate application',
    'Other',
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header-reject">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>Reject Application</span>
        </div>
        <div className="p-6 space-y-5">
          <p className="text-[14px] text-slate-600">
            Rejecting <span className="font-semibold text-slate-900">{tutor.first_name} {tutor.last_name}</span>&apos;s tutor application.
          </p>
          <div>
            <label className="field-label">Reason</label>
            <div className="flex flex-wrap gap-2">
              {reasons.map(r => (
                <button key={r} onClick={() => setSelected(r)} className={`reason-chip ${selected === r ? 'reason-active' : ''}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="field-label">Details (optional)</label>
            <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Additional context..." className="modal-textarea" rows={3} />
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-cancel">Cancel</button>
          <button
            onClick={() => onConfirm(selected + (details ? ` — ${details}` : ''))}
            disabled={!selected}
            className="btn-confirm-reject"
          >
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TOAST
   ═══════════════════════════════════════════════════════════════ */

function Toast({ type, message, onClose }: { type: 'success' | 'error'; message: string; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`toast ${type === 'success' ? 'toast-success' : 'toast-error'}`}>
      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        {type === 'success'
          ? <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          : <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        }
      </svg>
      <span className="text-[13px] font-medium">{message}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SKELETON
   ═══════════════════════════════════════════════════════════════ */

function Skeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => <div key={i} className="h-[104px] bg-slate-100/80 rounded-2xl" />)}
      </div>
      <div className="h-[52px] bg-slate-100/80 rounded-2xl" />
      {[...Array(3)].map((_, i) => <div key={i} className="h-[180px] bg-slate-100/80 rounded-2xl" />)}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function VerificationPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewTutor, setViewTutor] = useState<Tutor | null>(null);
  const [rejectTutor, setRejectTutor] = useState<Tutor | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, a] = await Promise.all([
        api('/admin/tutor-applications/stats'),
        api('/admin/tutor-applications'),
      ]);
      if (!s?.data || !a?.data) {
        setError('Unable to connect to the server. Please check your backend.');
        setStats({ pending_review: 0, approved_this_month: 0, rejected_this_month: 0, total_tutors: 0 });
        setTutors([]);
      } else {
        setStats(s.data);
        setTutors(a.data);
      }
    } catch {
      setError('Unable to connect to the server. Please check your backend.');
      setStats({ pending_review: 0, approved_this_month: 0, rejected_this_month: 0, total_tutors: 0 });
      setTutors([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleApprove = async (id: number) => {
    const result = await api(`/admin/tutor-applications/${id}/status`, {
      method: 'PUT', body: JSON.stringify({ status: 'approved' }),
    });
    if (result) {
      setTutors(p => p.map(t => t.id === id ? { ...t, status: 'approved' as const, approved_at: new Date().toISOString() } : t));
      setToast({ type: 'success', message: 'Tutor approved successfully!' });
      load(); // reload stats
    } else {
      setToast({ type: 'error', message: 'Failed to approve. Please try again.' });
    }
    setViewTutor(null);
  };

  const handleReject = (id: number) => {
    const t = tutors.find(x => x.id === id);
    if (t) { setRejectTutor(t); setViewTutor(null); }
  };

  const confirmReject = async (reason: string) => {
    if (!rejectTutor) return;
    const result = await api(`/admin/tutor-applications/${rejectTutor.id}/status`, {
      method: 'PUT', body: JSON.stringify({ status: 'rejected', reason }),
    });
    if (result) {
      setTutors(p => p.map(t => t.id === rejectTutor.id ? { ...t, status: 'rejected' as const, rejection_reason: reason } : t));
      setToast({ type: 'error', message: 'Application rejected' });
      load(); // reload stats
    } else {
      setToast({ type: 'error', message: 'Failed to reject. Please try again.' });
    }
    setRejectTutor(null);
  };

  const filtered = tutors.filter(t => {
    if (statusFilter && t.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return `${t.first_name} ${t.last_name} ${t.email} ${t.main_subject}`.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <>
      <div className="page">
        {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

        {/* Header */}
        <header className="page-header">
          <div className="flex items-center gap-4">
            <div className="header-icon">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div>
              <h1 className="page-title">Scholora Verification</h1>
              <p className="page-subtitle">Review and manage tutor applications</p>
            </div>
          </div>
          <button onClick={load} className="refresh-btn">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Refresh
          </button>
        </header>

        {/* Error State */}
        {error && (
          <div className="error-banner">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>{error}</span>
            <button onClick={load} className="error-retry">Retry</button>
          </div>
        )}

        {loading ? <Skeleton /> : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-4 gap-5">
              <StatCard label="Pending Review" value={stats?.pending_review || 0} accent="stat-amber" delay={0} icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              } />
              <StatCard label="Approved" value={stats?.approved_this_month || 0} accent="stat-emerald" delay={80} icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              } />
              <StatCard label="Rejected" value={stats?.rejected_this_month || 0} accent="stat-rose" delay={160} icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              } />
              <StatCard label="Total Tutors" value={stats?.total_tutors || 0} accent="stat-blue" delay={240} icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              } />
            </div>

            {/* Filters */}
            <div className="filter-bar">
              <div className="search-wrap">
                <svg className="search-icon" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email or subject..." className="search-input" />
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="filter-select">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <span className="results-count">{filtered.length} tutor{filtered.length !== 1 ? 's' : ''}</span>
            </div>

            {/* List */}
            <div className="space-y-3">
              {filtered.length > 0 ? filtered.map((t, i) => (
                <TutorCard key={t.id} tutor={t} index={i} onView={setViewTutor} onApprove={handleApprove} onReject={handleReject} />
              )) : (
                <div className="empty-state">
                  <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <p className="text-slate-500 font-medium">No tutors found</p>
                  <p className="text-slate-400 text-sm mt-1">Adjust your filters or check back later</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {viewTutor && <DetailDrawer tutor={viewTutor} onClose={() => setViewTutor(null)} onApprove={handleApprove} onReject={handleReject} />}
      {rejectTutor && <RejectModal tutor={rejectTutor} onClose={() => setRejectTutor(null)} onConfirm={confirmReject} />}

      {/* ═══ STYLES ═══ */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');

        .page {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f8fafb;
          padding: 2rem 2.5rem;
          max-width: 1480px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* ── Header ── */
        .page-header { display: flex; align-items: center; justify-content: space-between; }
        .header-icon { width: 48px; height: 48px; border-radius: 16px; background: linear-gradient(135deg, #0f766e, #0d9488); display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 14px rgba(13, 148, 136, 0.3); }
        .page-title { font-size: 1.5rem; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
        .page-subtitle { font-size: 0.8rem; color: #94a3b8; font-weight: 500; margin-top: 2px; }
        .refresh-btn { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 12px; font-size: 13px; font-weight: 600; color: #475569; background: white; border: 1px solid #e2e8f0; transition: all 0.2s; cursor: pointer; font-family: inherit; }
        .refresh-btn:hover { background: #f1f5f9; border-color: #cbd5e1; }

        /* ── Stat Cards ── */
        .stat-card { background: white; border-radius: 18px; padding: 1.25rem 1.5rem; border: 1px solid #f1f5f9; position: relative; overflow: hidden; animation: cardIn 0.4s ease both; transition: all 0.25s; }
        .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: 3px 3px 0 0; }
        .stat-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.06); transform: translateY(-2px); }
        .stat-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .stat-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; }
        .stat-value { font-size: 2rem; font-weight: 800; color: #0f172a; line-height: 1; letter-spacing: -0.02em; }
        .stat-amber { background: #fffbeb; color: #d97706; }
        .stat-card:has(.stat-amber)::before { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
        .stat-emerald { background: #ecfdf5; color: #059669; }
        .stat-card:has(.stat-emerald)::before { background: linear-gradient(90deg, #059669, #34d399); }
        .stat-rose { background: #fff1f2; color: #e11d48; }
        .stat-card:has(.stat-rose)::before { background: linear-gradient(90deg, #e11d48, #fb7185); }
        .stat-blue { background: #eff6ff; color: #2563eb; }
        .stat-card:has(.stat-blue)::before { background: linear-gradient(90deg, #2563eb, #60a5fa); }

        /* ── Filter Bar ── */
        .filter-bar { display: flex; align-items: center; gap: 12px; background: white; border-radius: 16px; padding: 12px 16px; border: 1px solid #f1f5f9; }
        .search-wrap { position: relative; flex: 1; min-width: 220px; }
        .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: #94a3b8; }
        .search-input { width: 100%; padding: 9px 12px 9px 40px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 13px; font-family: inherit; color: #334155; background: #f8fafc; transition: all 0.2s; outline: none; }
        .search-input:focus { border-color: #0d9488; background: white; box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.08); }
        .search-input::placeholder { color: #94a3b8; }
        .filter-select { padding: 9px 32px 9px 14px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 13px; font-family: inherit; color: #475569; background: #f8fafc url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e") right 10px center/16px no-repeat; appearance: none; cursor: pointer; transition: all 0.2s; outline: none; }
        .filter-select:focus { border-color: #0d9488; background-color: white; box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.08); }
        .results-count { font-size: 13px; color: #94a3b8; font-weight: 500; margin-left: auto; white-space: nowrap; }

        /* ── Chips ── */
        .chip { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.02em; }
        .chip-pending { background: #fef3c7; color: #92400e; }
        .chip-approved { background: #d1fae5; color: #065f46; }
        .chip-rejected { background: #ffe4e6; color: #9f1239; }
        .chip-draft { background: #f1f5f9; color: #64748b; }

        /* ── Tags ── */
        .subject-tag { display: inline-flex; padding: 4px 12px; background: #f0fdfa; color: #0f766e; border-radius: 8px; font-size: 12px; font-weight: 600; border: 1px solid #ccfbf1; margin-right: 6px; }
        .video-tag { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; background: #eff6ff; color: #2563eb; border-radius: 8px; font-size: 11px; font-weight: 600; border: 1px solid #dbeafe; margin-right: 6px; }
        .rating-tag { display: inline-flex; align-items: center; gap: 3px; padding: 4px 10px; background: #fffbeb; color: #b45309; border-radius: 8px; font-size: 11px; font-weight: 600; border: 1px solid #fef3c7; }

        /* ── Tutor Card ── */
        .tutor-card { background: white; border-radius: 16px; border: 1px solid #f1f5f9; padding: 1.25rem 1.5rem; transition: all 0.25s; animation: cardIn 0.4s ease both; }
        .tutor-card:hover { border-color: #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
        .tutor-name { font-size: 15px; font-weight: 700; color: #0f172a; }
        .meta-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 13px; color: #94a3b8; }
        .meta-dot { width: 3px; height: 3px; border-radius: 50%; background: #cbd5e1; }
        .desc-preview { font-size: 13px; color: #64748b; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 10px; }

        /* ── Step Indicator ── */
        .step-bar { display: flex; gap: 12px; margin-top: 6px; }
        .step-item { display: flex; align-items: center; gap: 5px; }
        .step-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .step-done { background: #059669; }
        .step-review { background: #f59e0b; }
        .step-todo { background: #e2e8f0; }
        .step-label { font-size: 11px; color: #94a3b8; font-weight: 500; text-transform: capitalize; }

        /* ── Buttons ── */
        .btn-ghost { display: inline-flex; align-items: center; gap: 5px; padding: 7px 14px; border-radius: 10px; font-size: 13px; font-weight: 600; color: #475569; background: #f8fafc; border: 1px solid #e2e8f0; cursor: pointer; transition: all 0.2s; font-family: inherit; }
        .btn-ghost:hover { background: #f1f5f9; border-color: #cbd5e1; }
        .btn-approve { display: inline-flex; align-items: center; gap: 5px; padding: 7px 14px; border-radius: 10px; font-size: 13px; font-weight: 600; color: white; background: #0d9488; border: none; cursor: pointer; transition: all 0.2s; font-family: inherit; }
        .btn-approve:hover { background: #0f766e; box-shadow: 0 4px 12px rgba(13,148,136,0.25); }
        .btn-reject { display: inline-flex; align-items: center; gap: 5px; padding: 7px 14px; border-radius: 10px; font-size: 13px; font-weight: 600; color: #e11d48; background: white; border: 1.5px solid #fecdd3; cursor: pointer; transition: all 0.2s; font-family: inherit; }
        .btn-reject:hover { background: #fff1f2; border-color: #fda4af; }

        /* ── Drawer ── */
        .drawer-overlay { position: fixed; inset: 0; z-index: 50; display: flex; justify-content: flex-end; }
        .drawer-overlay::before { content: ''; position: absolute; inset: 0; background: rgba(15,23,42,0.4); backdrop-filter: blur(4px); animation: fadeIn 0.2s ease; }
        .drawer { position: relative; width: 100%; max-width: 560px; background: white; display: flex; flex-direction: column; animation: slideIn 0.3s cubic-bezier(0.16,1,0.3,1); box-shadow: -20px 0 60px rgba(0,0,0,0.12); }
        .drawer-close { position: absolute; top: 20px; right: 20px; z-index: 10; padding: 8px; border-radius: 12px; color: rgba(255,255,255,0.5); background: none; border: none; cursor: pointer; transition: all 0.15s; }
        .drawer-close:hover { color: white; background: rgba(255,255,255,0.1); }
        .drawer-header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 2rem 1.75rem; }
        .drawer-body { padding: 1.75rem; space-y: 1.75rem; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 1.75rem; }
        .drawer-footer { padding: 1rem 1.75rem; border-top: 1px solid #f1f5f9; display: flex; gap: 12px; background: white; }
        .btn-reject-lg { flex: 1; padding: 12px; border-radius: 12px; font-size: 14px; font-weight: 600; color: #e11d48; background: white; border: 1.5px solid #fecdd3; cursor: pointer; font-family: inherit; transition: all 0.2s; }
        .btn-reject-lg:hover { background: #fff1f2; }
        .btn-approve-lg { flex: 1; padding: 12px; border-radius: 12px; font-size: 14px; font-weight: 600; color: white; background: linear-gradient(135deg, #0d9488, #0f766e); border: none; cursor: pointer; font-family: inherit; transition: all 0.2s; box-shadow: 0 4px 14px rgba(13,148,136,0.3); }
        .btn-approve-lg:hover { box-shadow: 0 6px 20px rgba(13,148,136,0.4); }

        /* ── Drawer Detail ── */
        .fact-card { display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: #f8fafb; border-radius: 12px; border: 1px solid #f1f5f9; }
        .fact-label { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; }
        .fact-value { font-size: 13px; font-weight: 600; color: #1e293b; }
        .section-title { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
        .field-label { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; display: block; }
        .video-link { display: flex; align-items: center; gap: 10px; padding: 14px 16px; background: #eff6ff; border-radius: 12px; border: 1px solid #dbeafe; color: #2563eb; font-size: 13px; font-weight: 600; text-decoration: none; transition: all 0.15s; }
        .video-link:hover { background: #dbeafe; }
        .step-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-radius: 10px; border: 1px solid #f1f5f9; }
        .step-row-dot { width: 10px; height: 10px; border-radius: 50%; }
        .rejection-box { padding: 14px 16px; background: #fff1f2; border-radius: 12px; border: 1px solid #ffe4e6; }

        /* ── Modal ── */
        .modal-overlay { position: fixed; inset: 0; z-index: 60; display: flex; align-items: center; justify-content: center; padding: 1rem; background: rgba(15,23,42,0.5); backdrop-filter: blur(4px); animation: fadeIn 0.2s ease; }
        .modal { background: white; border-radius: 20px; max-width: 480px; width: 100%; overflow: hidden; animation: modalIn 0.3s cubic-bezier(0.16,1,0.3,1); box-shadow: 0 25px 60px rgba(0,0,0,0.15); }
        .modal-header-reject { display: flex; align-items: center; gap: 8px; padding: 16px 24px; background: linear-gradient(135deg, #e11d48, #be123c); color: white; font-weight: 700; font-size: 15px; }
        .modal-footer { display: flex; gap: 10px; padding: 16px 24px; border-top: 1px solid #f1f5f9; }
        .modal-textarea { width: 100%; padding: 12px 14px; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 13px; font-family: inherit; color: #334155; background: #f8fafc; resize: none; outline: none; transition: all 0.2s; }
        .modal-textarea:focus { border-color: #e11d48; box-shadow: 0 0 0 3px rgba(225,29,72,0.08); background: white; }
        .reason-chip { padding: 7px 14px; border-radius: 10px; font-size: 12px; font-weight: 600; color: #475569; background: #f8fafc; border: 1px solid #e2e8f0; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .reason-chip:hover { border-color: #fda4af; background: #fff1f2; color: #e11d48; }
        .reason-active { background: #fff1f2 !important; border-color: #fda4af !important; color: #e11d48 !important; }
        .btn-cancel { flex: 1; padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 600; color: #475569; background: white; border: 1px solid #e2e8f0; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .btn-cancel:hover { background: #f8fafc; }
        .btn-confirm-reject { flex: 1; padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 600; color: white; background: linear-gradient(135deg, #e11d48, #be123c); border: none; cursor: pointer; font-family: inherit; transition: all 0.2s; }
        .btn-confirm-reject:hover { box-shadow: 0 4px 14px rgba(225,29,72,0.3); }
        .btn-confirm-reject:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }

        /* ── Toast ── */
        .toast { position: fixed; top: 1.5rem; right: 1.5rem; z-index: 70; display: flex; align-items: center; gap: 8px; padding: 12px 20px; border-radius: 14px; color: white; font-family: 'DM Sans', sans-serif; animation: toastIn 0.35s cubic-bezier(0.16,1,0.3,1); box-shadow: 0 12px 40px rgba(0,0,0,0.15); }
        .toast-success { background: linear-gradient(135deg, #059669, #047857); }
        .toast-error { background: linear-gradient(135deg, #e11d48, #be123c); }

        /* ── Empty ── */
        .empty-state { text-align: center; padding: 4rem 1rem; background: white; border-radius: 16px; border: 1px solid #f1f5f9; }

        /* ── Error Banner ── */
        .error-banner { display: flex; align-items: center; gap: 10px; padding: 14px 20px; background: #fff1f2; border: 1px solid #fecdd3; border-radius: 14px; color: #9f1239; font-size: 13px; font-weight: 500; animation: cardIn 0.3s ease; }
        .error-retry { margin-left: auto; padding: 6px 16px; background: white; border: 1px solid #fecdd3; border-radius: 8px; font-size: 12px; font-weight: 600; color: #e11d48; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .error-retry:hover { background: #fff1f2; border-color: #fda4af; }

        /* ── Animations ── */
        @keyframes cardIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes toastIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </>
  );
}