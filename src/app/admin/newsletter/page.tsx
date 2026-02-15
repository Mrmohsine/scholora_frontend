'use client';

import { useEffect, useState } from 'react';
import {
  BoldIcon,
  ItalicIcon,
  ListBulletIcon,
  LinkIcon,
  PhotoIcon,
  ChatBubbleLeftEllipsisIcon,
  TableCellsIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
  Bars3CenterLeftIcon,
} from '@heroicons/react/24/outline';


interface Newsletter {
  id: number;
  email: string;
  created_at: string;
}


export default function NewsletterTable() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState<File | null>(null);

   // Undo/Redo stacks
  const [history, setHistory] = useState<string[]>(['']);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  // Toast states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/index?page=${page}`, {
        headers: { 'Accept': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(`Failed to fetch: ${data.message || res.status}`);
      setNewsletters(Array.isArray(data?.data) ? data.data : []);
      setMeta(data?.meta ?? null);
      setCurrentPage(page);
    } catch (err: any) {
      console.error(err);
      setNewsletters([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Keep history
  useEffect(() => {
    if (message !== history[history.length - 1]) {
      setHistory((prev) => [...prev, message]);
    }
  }, [message]);

    const handleUndo = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      const last = newHistory.pop() as string;
      setRedoStack((prev) => [last, ...prev]);
      setHistory(newHistory);
      setMessage(newHistory[newHistory.length - 1] || '');
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const [next, ...rest] = redoStack;
      setHistory((prev) => [...prev, next]);
      setMessage(next);
      setRedoStack(rest);
    }
  };

  const filteredNewsletters = newsletters.filter(n =>
    n.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendEmailsClick = () => {
    if (selectedEmails.length === 0) {
      showToast('Please select at least one email!', 'error');
      return;
    }
    setShowModal(true);
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleConfirmSend = async () => {
    try {
      const formData = new FormData();
      formData.append('message', message);
      formData.append('link', link);
      selectedEmails.forEach((email, index) => {
        formData.append(`emails[${index}]`, email);
      });
      if (file) formData.append('file', file);

      const res = await fetch('http://localhost:8000/api/newsletters/send-emails', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || res.status);

      showToast(data.message ?? 'Emails sent successfully!', 'success');

      setShowModal(false);
      setMessage('');
      setLink('');
      setFile(null);
      setSelectedEmails([]);
      setHistory(['']);
      setRedoStack([]);
    } catch (err: any) {
      console.error(err);
      showToast(`Failed to send emails: ${err.message}`, 'error');
    }
  };

  const formatText = (type: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = message.slice(start, end);
    let formatted = selectedText;

    switch (type) {
      case 'bold':
        formatted = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        formatted = `*${selectedText || 'italic text'}*`;
        break;
      case 'list':
        formatted = selectedText
          ? selectedText.split('\n').map(line => `• ${line}`).join('\n')
          : '• List item';
        break;
      case 'link':
        formatted = `[${selectedText || 'link text'}](http://)`;
        break;
      case 'align-left':
        formatted = `<div style="text-align:left">${selectedText || 'left aligned'}</div>`;
        break;
      case 'align-center':
        formatted = `<div style="text-align:center">${selectedText || 'center aligned'}</div>`;
        break;
      case 'align-right':
        formatted = `<div style="text-align:right">${selectedText || 'right aligned'}</div>`;
        break;
      case 'image':
        formatted = `![alt text](http://image-url.com)`;
        break;
      case 'quote':
        formatted = `> ${selectedText || 'quote text'}`;
        break;
      case 'table':
        formatted = `
  | Column 1 | Column 2 |
  |----------|----------|
  | Row 1    | Data     |
  | Row 2    | Data     |`;
        break;
    }

    const newText = message.slice(0, start) + formatted + message.slice(end);
    setMessage(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + formatted.length);
    }, 0);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-5">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-12 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 relative">
      <h2 className="text-xl font-bold mb-3 text-gray-900">Newsletters</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mt-16">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">All Newsletters</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-6 text-left text-xs font-medium text-black">
                  <input
                    type="checkbox"
                    checked={selectedEmails.length === filteredNewsletters.length && filteredNewsletters.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedEmails(filteredNewsletters.map(n => n.email));
                      } else {
                        setSelectedEmails([]);
                      }
                    }}
                  />
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-black">Email</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-black">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredNewsletters.length > 0 ? (
                filteredNewsletters.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-800">
                      <input
                        type="checkbox"
                        checked={selectedEmails.includes(item.email)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEmails([...selectedEmails, item.email]);
                          } else {
                            setSelectedEmails(selectedEmails.filter(email => email !== item.email));
                          }
                        }}
                      />
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800">{item.email}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{new Date(item.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center p-4 text-gray-500">
                    No newsletters found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta && meta.total > 0 && (
          <div className="flex items-center justify-end gap-2 mt-2">
            <button onClick={() => fetchData(1)} disabled={meta.current_page === 1} className="px-2 py-1 rounded  text-gray-700 hover:bg-gray-300 disabled:opacity-50">{'<<'}</button>
            <button onClick={() => fetchData(meta.current_page - 1)} disabled={!meta.prev_page_url} className="px-2 py-1 rounded  text-gray-700 hover:bg-gray-300 disabled:opacity-50">{'<'}</button>
            {Array.from({ length: meta.last_page }, (_, i) => i + 1)
              .filter(page =>
                page === 1 ||
                page === meta.last_page ||
                (page >= meta.current_page - 1 && page <= meta.current_page + 1)
              )
              .map((page, index, arr) => {
                const prevPage = arr[index - 1];
                return (
                  <span key={page}>
                    {prevPage && page - prevPage > 1 && <span className="px-1">…</span>}
                    <button
                      onClick={() => fetchData(page)}
                      className={`px-3 py-1 rounded ${page === meta.current_page ? 'bg-primary-500 text-white' : ' text-gray-700 hover:bg-gray-300'}`}
                    >
                      {page}
                    </button>
                  </span>
                );
              })}
            <button onClick={() => fetchData(meta.current_page + 1)} disabled={!meta.next_page_url} className="px-2 py-1 rounded  text-gray-700 hover:bg-gray-300 disabled:opacity-50">{'>'}</button>
            <button onClick={() => fetchData(meta.last_page)} disabled={meta.current_page === meta.last_page} className="px-2 py-1 rounded  text-gray-700 hover:bg-gray-300 disabled:opacity-50">{'>>'}</button>
          </div>
        )}

        {/* Send Emails Button */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleSendEmailsClick}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={selectedEmails.length === 0}
          >
            Send Emails ({selectedEmails.length})
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white p-6 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-600">Compose Message</h3>

          {/* Toolbar */}
          <div className="flex items-center gap-2 mb-2 border-b pb-2 text-gray-600">
            <button onClick={() => formatText('bold')}><BoldIcon className="w-5 h-5" /></button>
            <button onClick={() => formatText('italic')}><ItalicIcon className="w-5 h-5" /></button>
            <button onClick={() => formatText('list')}><ListBulletIcon className="w-5 h-5" /></button>
            <button onClick={() => formatText('link')}><LinkIcon className="w-5 h-5" /></button>
            <button onClick={() => formatText('align-left')}><Bars3BottomLeftIcon className="w-5 h-5" /></button>
            <button onClick={() => formatText('align-center')}><Bars3CenterLeftIcon className="w-5 h-5" /></button>
            <button onClick={() => formatText('align-right')}><Bars3BottomRightIcon className="w-5 h-5" /></button>
            <button onClick={() => formatText('image')}><PhotoIcon className="w-5 h-5" /></button>
            <button onClick={() => formatText('quote')}><ChatBubbleLeftEllipsisIcon className="w-5 h-5" /></button>
            <button onClick={() => formatText('table')}><TableCellsIcon className="w-5 h-5" /></button>
            <button onClick={handleUndo} disabled={history.length <= 1}><ArrowUturnLeftIcon className="w-5 h-5" /></button>
            <button onClick={handleRedo} disabled={redoStack.length === 0}><ArrowUturnRightIcon className="w-5 h-5" /></button>
          </div>

          {/* Textarea */}
          <textarea
            className="w-full border rounded p-2 h-24 mb-3 text-gray-600"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input type="url" placeholder="Paste a link (optional)" className="w-full border rounded p-2 mb-3 text-gray-600 bg-gray-50" value={link} onChange={(e) => setLink(e.target.value)} />
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="w-full mb-3 text-gray-600" />

          <div className="flex justify-end gap-2">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-white bg-red-600">Cancel</button>
            <button onClick={handleConfirmSend} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Send</button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white font-medium ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}
