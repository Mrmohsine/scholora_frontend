// src/app/dashboard/pricing-packs/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface PricingPack {
  id: number;
  name: string;
  slug: string;
  price: number;
  currency: string;
  billing_period: string;
  virtual_classrooms: number;
  sessions_per_week: number | null;
  max_students: number;
  basic_payment_collection: boolean;
  automated_invoicing: boolean;
  student_roster: boolean;
  attendance_tracking: boolean;
  full_tool_suite: boolean;
  premium_features: boolean;
  description: string;
  is_active: boolean;
  is_popular: boolean;
  sort_order: number;
}

export default function PricingPacksPage() {
  const [packs, setPacks] = useState<PricingPack[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPack, setEditingPack] = useState<PricingPack | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchPacks();
  }, []);

  const fetchPacks = async () => {
    try {
      const res = await fetch('/api/admin/pricing-packs');
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setPacks(data);
      } else if (data.data && Array.isArray(data.data)) {
        setPacks(data.data);
      } else {
        setPacks([]);
      }
    } catch (error) {
      console.error('Error fetching packs:', error);
      setPacks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce pack ?')) return;

    try {
      await fetch(`/api/admin/pricing-packs/${id}`, { method: 'DELETE' });
      setPacks(packs.filter((p) => p.id !== id));
      showToast('Pack supprimé avec succès!', 'success');
    } catch (error) {
      console.error('Error deleting pack:', error);
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  const handleSave = async (pack: Partial<PricingPack>) => {
    try {
      if (editingPack) {
        const res = await fetch(`/api/admin/pricing-packs/${editingPack.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pack),
        });
        const updated = await res.json();
        setPacks(packs.map((p) => (p.id === updated.id ? updated : p)));
        showToast('Pack modifié avec succès!', 'success');
      } else {
        const res = await fetch('/api/admin/pricing-packs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pack),
        });
        const created = await res.json();
        setPacks([...packs, created]);
        showToast('Pack créé avec succès!', 'success');
      }
      setShowModal(false);
      fetchPacks();
    } catch (error) {
      console.error('Error saving pack:', error);
      showToast('Erreur lors de la sauvegarde', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#0168AF] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-8">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-[60] animate-in slide-in-from-top">
          <div className={`rounded-lg px-6 py-4 shadow-lg ${
            toast.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            <div className="flex items-center gap-3">
              {toast.type === 'success' ? (
                <CheckCircleIcon className="h-5 w-5" />
              ) : (
                <XCircleIcon className="h-5 w-5" />
              )}
              <span className="font-medium">{toast.message}</span>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Pricing Packs</h1>
          <p className="mt-2 text-lg text-gray-600">
            Gérez les plans d'abonnement pour vos tuteurs
          </p>
        </div>
        <button
          onClick={() => {
            setEditingPack(null);
            setShowModal(true);
          }}
          className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0168AF] to-[#0152a3] px-6 py-3 text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
        >
          <PlusIcon className="h-5 w-5" />
          Nouveau Pack
        </button>
      </div>

      {packs.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
          <SparklesIcon className="mx-auto h-16 w-16 text-gray-300" />
          <h3 className="mt-4 text-xl font-semibold text-gray-900">
            Aucun pack disponible
          </h3>
          <p className="mt-2 text-gray-600">
            Créez votre premier pack pour commencer
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {packs.map((pack) => (
            <div
              key={pack.id}
              className={`group relative transform rounded-3xl bg-white p-6 shadow-xl transition-all hover:scale-105 hover:shadow-2xl ${
                pack.is_popular ? 'ring-4 ring-[#0168AF]/20' : ''
              }`}
            >
              {pack.is_popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-1.5 text-sm font-bold text-white shadow-lg">
                    <StarIcon className="h-4 w-4" />
                    POPULAIRE
                  </span>
                </div>
              )}

              <div className="mb-6 pt-4">
                <h3 className="text-2xl font-bold text-gray-900">{pack.name}</h3>
                <p className="mt-2 text-gray-600">{pack.description}</p>
              </div>

              <div className="mb-8 border-b border-gray-100 pb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-[#0168AF]">
                    {pack.price}
                  </span>
                  <span className="text-xl font-medium text-gray-500">
                    {pack.currency}
                  </span>
                </div>
                <span className="mt-1 block text-sm text-gray-500">
                  par {pack.billing_period === 'monthly' ? 'mois' : 'an'}
                </span>
              </div>

              <div className="mb-8 space-y-3">
                <Feature
                  text={`${pack.virtual_classrooms} salle${pack.virtual_classrooms > 1 ? 's' : ''} virtuelle${pack.virtual_classrooms > 1 ? 's' : ''}`}
                />
                <Feature
                  text={
                    pack.sessions_per_week
                      ? `${pack.sessions_per_week} sessions/semaine`
                      : 'Sessions illimitées'
                  }
                />
                <Feature text={`Jusqu'à ${pack.max_students} étudiants`} />
                {pack.automated_invoicing && (
                  <Feature text="Facturation automatisée" />
                )}
                {pack.full_tool_suite && (
                  <Feature text="Suite complète d'outils" />
                )}
                {pack.basic_payment_collection && !pack.automated_invoicing && (
                  <Feature text="Collecte de paiements" />
                )}
                {pack.student_roster && (
                  <Feature text="Gestion des présences" />
                )}
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${
                    pack.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {pack.is_active ? (
                    <>
                      <CheckCircleIcon className="h-4 w-4" />
                      Actif
                    </>
                  ) : (
                    <>
                      <XCircleIcon className="h-4 w-4" />
                      Inactif
                    </>
                  )}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingPack(pack);
                      setShowModal(true);
                    }}
                    className="rounded-lg p-2 text-[#0168AF] transition-all hover:bg-blue-50"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(pack.id)}
                    className="rounded-lg p-2 text-red-600 transition-all hover:bg-red-50"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <PackModal
          pack={editingPack}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-[#0168AF]" />
      <span className="text-sm text-gray-700">{text}</span>
    </div>
  );
}

function PackModal({
  pack,
  onClose,
  onSave,
}: {
  pack: PricingPack | null;
  onClose: () => void;
  onSave: (pack: Partial<PricingPack>) => void;
}) {
  const [formData, setFormData] = useState<Partial<PricingPack>>(
    pack || {
      name: '',
      slug: '',
      price: 0,
      currency: 'MAD',
      billing_period: 'monthly',
      virtual_classrooms: 1,
      sessions_per_week: null,
      max_students: 10,
      basic_payment_collection: true,
      automated_invoicing: false,
      student_roster: true,
      attendance_tracking: true,
      full_tool_suite: false,
      premium_features: false,
      description: '',
      is_active: true,
      is_popular: false,
      sort_order: 0,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="bg-gradient-to-r from-[#0168AF] to-[#0152a3] px-8 py-6">
          <h2 className="text-3xl font-bold text-white">
            {pack ? 'Modifier le Pack' : 'Créer un Nouveau Pack'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[calc(90vh-100px)] overflow-y-auto p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Nom du Pack
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-900 transition-colors focus:border-[#0168AF] focus:outline-none"
                placeholder="Ex: Professional Pack"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-900 transition-colors focus:border-[#0168AF] focus:outline-none"
                placeholder="professional"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Prix</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-900 transition-colors focus:border-[#0168AF] focus:outline-none"
                placeholder="319"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Période
              </label>
              <select
                value={formData.billing_period}
                onChange={(e) => setFormData({ ...formData, billing_period: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 transition-colors focus:border-[#0168AF] focus:outline-none"
              >
                <option value="monthly">Mensuel</option>
                <option value="annual">Annuel</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Salles Virtuelles
              </label>
              <input
                type="number"
                value={formData.virtual_classrooms}
                onChange={(e) =>
                  setFormData({ ...formData, virtual_classrooms: Number(e.target.value) })
                }
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-900 transition-colors focus:border-[#0168AF] focus:outline-none"
                placeholder="3"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Sessions/Semaine (vide = illimité)
              </label>
              <input
                type="number"
                value={formData.sessions_per_week || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sessions_per_week: e.target.value ? Number(e.target.value) : null,
                  })
                }
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-900 transition-colors focus:border-[#0168AF] focus:outline-none"
                placeholder="Illimité"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Étudiants Max
              </label>
              <input
                type="number"
                value={formData.max_students}
                onChange={(e) =>
                  setFormData({ ...formData, max_students: Number(e.target.value) })
                }
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-900 transition-colors focus:border-[#0168AF] focus:outline-none"
                placeholder="50"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Ordre</label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) =>
                  setFormData({ ...formData, sort_order: Number(e.target.value) })
                }
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-900 transition-colors focus:border-[#0168AF] focus:outline-none"
                placeholder="1"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-900 transition-colors focus:border-[#0168AF] focus:outline-none"
              placeholder="Description du pack..."
            />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-xl border-2 border-gray-200 p-4 transition-colors hover:border-[#0168AF]/30 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.automated_invoicing}
                onChange={(e) =>
                  setFormData({ ...formData, automated_invoicing: e.target.checked })
                }
                className="h-5 w-5 rounded border-gray-300 text-[#0168AF] focus:ring-[#0168AF]"
              />
              <span className="text-sm font-medium text-gray-700">Facturation Auto</span>
            </label>

            <label className="flex items-center gap-3 rounded-xl border-2 border-gray-200 p-4 transition-colors hover:border-[#0168AF]/30 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.full_tool_suite}
                onChange={(e) =>
                  setFormData({ ...formData, full_tool_suite: e.target.checked })
                }
                className="h-5 w-5 rounded border-gray-300 text-[#0168AF] focus:ring-[#0168AF]"
              />
              <span className="text-sm font-medium text-gray-700">Suite Complète</span>
            </label>

            <label className="flex items-center gap-3 rounded-xl border-2 border-gray-200 p-4 transition-colors hover:border-[#0168AF]/30 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="h-5 w-5 rounded border-gray-300 text-[#0168AF] focus:ring-[#0168AF]"
              />
              <span className="text-sm font-medium text-gray-700">Actif</span>
            </label>

            <label className="flex items-center gap-3 rounded-xl border-2 border-gray-200 p-4 transition-colors hover:border-[#0168AF]/30 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_popular}
                onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                className="h-5 w-5 rounded border-gray-300 text-[#0168AF] focus:ring-[#0168AF]"
              />
              <span className="text-sm font-medium text-gray-700">Populaire</span>
            </label>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border-2 border-gray-200 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-[#0168AF] to-[#0152a3] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              {pack ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}