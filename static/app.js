/**
 * app.js — Interactive layer for the Expense Tracker Flask app.
 *
 * Water analogy:
 *   - Toast = spillway feedback (water exits with a splash)
 *   - Modal = side-valve (opens without draining the main pipe)
 *   - Ripple = pressure pulse at the point of contact
 *   - Live filter = screening the conveyor belt mid-flow
 *   - AJAX = quick-release coupler (water moves without rebuilding the pipe)
 *
 * All features are opt-in via data attributes on HTML elements.
 */

(() => {
    'use strict';

    // ===================== Water Bender Utilities =====================

    /** Format number as ₦ currency string */
    function formatNaira(n) {
        return '₦' + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    /** Debounce: wait until flow settles before hitting the valve */
    function debounce(fn, ms = 280) {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn(...args), ms);
        };
    }

    /** Random water-themed toast icon */
    const TOAST_ICONS = { success: '💧', error: '🚨', info: '🌊' };

    // ===================== Toast System (Spillway Feedback) =====================

    function toast(message, type = 'success') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        const el = document.createElement('div');
        el.className = `toast ${type}`;
        el.textContent = `${TOAST_ICONS[type] || ''} ${message}`;
        container.appendChild(el);
        // Auto-remove after animation
        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, 2400);
    }

    // ===================== Ripple Button (Pressure Pulse) =====================

    function initRipples() {
        document.querySelectorAll('.btn.ripple-host').forEach(btn => {
            btn.addEventListener('click', function (e) {
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                const rip = document.createElement('span');
                rip.className = 'ripple';
                rip.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;`;
                this.appendChild(rip);
                setTimeout(() => rip.remove(), 600);
            });
        });
    }

    // ===================== Modal System (Side-Valve) =====================

    let activeModal = null;

    function openModal(title, bodyHTML, onSave = null) {
        closeModal();
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal-card">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">${bodyHTML}</div>
            </div>
        `;
        document.body.appendChild(overlay);
        activeModal = overlay;

        // Close handlers
        overlay.querySelector('.modal-close').addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });

        // Optional save handler
        if (onSave) {
            const form = overlay.querySelector('form');
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());
                    const result = await onSave(data);
                    if (result) closeModal();
                });
            }
        }
    }

    function closeModal() {
        if (activeModal) {
            activeModal.remove();
            activeModal = null;
        }
    }

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ===================== AJAX Helper (Quick-Release Coupler) =====================

    async function ajax(url, opts = {}) {
        const defaults = {
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            credentials: 'same-origin'
        };
        const res = await fetch(url, { ...defaults, ...opts });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ct = res.headers.get('content-type') || '';
        return ct.includes('application/json') ? res.json() : res.text();
    }

    // ===================== Live Table Filter (Screen the Conveyor Belt) =====================

    function initLiveFilter() {
        const input = document.getElementById('live-filter-input');
        const tableWrap = document.getElementById('transactions-table-wrap');
        if (!input || !tableWrap) return;

        const filter = debounce(async (query) => {
            const url = new URL(window.location.href);
            if (query) url.searchParams.set('q', query);
            else url.searchParams.delete('q');

            // Fetch the filtered dashboard HTML fragment
            const html = await ajax(url.toString());
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newTableWrap = doc.getElementById('transactions-table-wrap');
            if (newTableWrap) {
                tableWrap.innerHTML = newTableWrap.innerHTML;
                attachRowActions();
            } else {
                tableWrap.innerHTML = '<p class="empty-state">No transactions found.</p>';
            }
        }, 300);

        input.addEventListener('input', (e) => filter(e.target.value.trim()));
    }

    // ===================== Inline Edit (Adjust Valves While Flow Runs) =====================

    function attachRowActions() {
        // Edit button: replace row cells with inline inputs
        document.querySelectorAll('.tx-row .btn-edit').forEach(btn => {
            if (btn.dataset.bound === '1') return;
            btn.dataset.bound = '1';
            btn.addEventListener('click', async () => {
                const tr = btn.closest('tr');
                const id = tr.dataset.id;

                // Fetch current values via small inline JSON endpoint data attr
                const json = tr.dataset.row;
                const row = JSON.parse(json);

                tr.classList.add('editing');
                tr.innerHTML = `
                    <td><input type="date" value="${row.date}" class="edit-date"></td>
                    <td>
                        <select class="edit-type">
                            <option value="income" ${row.type === 'income' ? 'selected' : ''}>income</option>
                            <option value="expense" ${row.type === 'expense' ? 'selected' : ''}>expense</option>
                        </select>
                    </td>
                    <td><input type="text" value="${row.category}" class="edit-category"></td>
                    <td><input type="number" step="0.01" value="${row.amount}" class="edit-amount"></td>
                    <td><input type="text" value="${row.note || ''}" class="edit-note"></td>
                    <td class="edit-actions">
                        <button class="btn btn-primary btn-sm btn-save-edit" data-id="${id}">Save</button>
                        <button class="btn btn-clear btn-sm btn-cancel-edit">Cancel</button>
                    </td>
                `;

                tr.querySelector('.btn-save-edit').addEventListener('click', async () => {
                    const data = {
                        type: tr.querySelector('.edit-type').value,
                        category: tr.querySelector('.edit-category').value.trim(),
                        amount: parseFloat(tr.querySelector('.edit-amount').value) || 0,
                        date: tr.querySelector('.edit-date').value,
                        note: tr.querySelector('.edit-note').value.trim()
                    };
                    await ajax(`/edit_transaction/${id}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                    toast('Transaction updated', 'success');
                    refreshDashboard();
                });

                tr.querySelector('.btn-cancel-edit').addEventListener('click', () => {
                    tr.classList.remove('editing');
                    refreshDashboard();
                });
            });
        });

        // Delete button: AJAX remove with animation
        document.querySelectorAll('.tx-row .btn-delete').forEach(btn => {
            if (btn.dataset.bound === '1') return;
            btn.dataset.bound = '1';
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                if (!confirm('Drain this transaction from the pipe?')) return;
                const tr = btn.closest('tr');
                const id = tr.dataset.id;
                tr.classList.add('row-removing');
                await ajax(`/delete_transaction/${id}`, { method: 'POST' });
                toast('Transaction deleted', 'info');
                refreshDashboard();
            });
        });
    }

    // Full dashboard refresh (re-renders server-side)
    async function refreshDashboard() {
        const params = new URLSearchParams(window.location.search);
        const res = await ajax('/?' + params.toString());
        const parser = new DOMParser();
        const doc = parser.parseFromString(res, 'text/html');
        const newWrap = doc.getElementById('transactions-table-wrap');
        if (newWrap) {
            const old = document.getElementById('transactions-table-wrap');
            if (old) old.innerHTML = newWrap.innerHTML;
        }
        // Update summary cards
        const newSummary = doc.querySelector('.summary-cards');
        if (newSummary) {
            const oldSummary = document.querySelector('.summary-cards');
            if (oldSummary) oldSummary.innerHTML = newSummary.innerHTML;
        }
        // Update budget bars
        const newBudget = doc.querySelector('.budget-panel-inner');
        if (newBudget) {
            const oldBudget = document.querySelector('.budget-panel-inner');
            if (oldBudget) oldBudget.innerHTML = newBudget.innerHTML;
        }
        attachRowActions();
    }

    // ===================== Modal Add Transaction =====================

    function initModalAdd() {
        const btn = document.getElementById('btn-add-modal');
        if (!btn) return;

        btn.addEventListener('click', () => {
            const today = new Date().toISOString().slice(0, 10);
            const body = `
                <form id="modal-add-form">
                    <div class="form-grid">
                        <select name="type" required>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                        <input type="text" name="category" placeholder="Category" required list="modal-category-list">
                        <input type="number" name="amount" placeholder="Amount (₦)" step="0.01" min="0.01" required>
                        <input type="date" name="date" value="${today}" required>
                        <input type="text" name="note" placeholder="Note (optional)">
                    </div>
                    <datalist id="modal-category-list">
                        ${Array.from(document.querySelectorAll('#category-list option')).map(o => `<option value="${o.value}">`).join('\n')}
                    </datalist>
                    <div style="margin-top:16px;display:flex;gap:8px;justify-content:flex-end;">
                        <button type="submit" class="btn btn-primary">Add Transaction</button>
                        <button type="button" class="btn btn-clear modal-cancel-btn">Cancel</button>
                    </div>
                </form>
            `;
            openModal('Add Transaction', body, async (data) => {
                await ajax('/add_transaction', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(data).toString()
                });
                toast('Transaction added', 'success');
                refreshDashboard();
                return true;
            });
            document.querySelector('.modal-cancel-btn')?.addEventListener('click', closeModal);
        });
    }

    // ===================== Live Budget Bars (Animated on Hover/Update) =====================

    function initLiveBudgetBars() {
        document.querySelectorAll('.progress-bar-fill').forEach(bar => {
            bar.classList.add('live-pulse');
            // Remove pulse class after user interaction to settle
            bar.addEventListener('animationend', () => bar.classList.remove('live-pulse'), { once: true });
        });
    }

    // ===================== Live Charts (Flow Diagram) =====================

    function initCharts() {
        const canvas = document.getElementById('chart-pie');
        if (!canvas) return;

        // Wait for Chart.js to be available (injected via script tag)
        const tryInit = () => {
            if (typeof Chart === 'undefined') {
                setTimeout(tryInit, 200);
                return;
            }
            const spentByCat = {};
            document.querySelectorAll('.tx-table tbody tr').forEach(tr => {
                const cells = tr.querySelectorAll('td');
                if (cells.length < 5) return;
                const type = cells[1]?.textContent?.trim();
                const cat = cells[2]?.textContent?.trim();
                const amt = parseFloat((cells[3]?.textContent || '₦0').replace(/[₦,]/g, '')) || 0;
                if (type === 'expense') spentByCat[cat] = (spentByCat[cat] || 0) + amt;
            });

            if (Object.keys(spentByCat).length === 0) return;

            new Chart(canvas, {
                type: 'pie',
                data: {
                    labels: Object.keys(spentByCat),
                    datasets: [{
                        data: Object.values(spentByCat),
                        backgroundColor: ['#1a7f4e', '#2563eb', '#c0392b', '#fbbf24', '#a78bfa', '#38bdf8']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: 'Spending by Category', color: '#1f2430' },
                        legend: { position: 'bottom' }
                    }
                }
            });
        };
        tryInit();
    }

    // ===================== Boot Sequence =====================

    document.addEventListener('DOMContentLoaded', () => {
        // Show JS-enhanced elements (hidden by default for no-JS fallback)
        const jsOnly = document.querySelectorAll('[data-js-only]');
        jsOnly.forEach(el => el.style.display = '');

        initRipples();
        initLiveFilter();
        attachRowActions();
        initModalAdd();
        initLiveBudgetBars();
        initCharts();
        initBudgetForm();
    });

    function initBudgetForm() {
        const form = document.querySelector('.budget-panel-inner form');
        if (!form) return;
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fd = new FormData(form);
            const data = Object.fromEntries(fd.entries());
            await ajax('/set_budget', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            toast('Budget set', 'success');
            refreshDashboard();
        });
    }

    // Expose for inline onclick handlers
    window.WaterBender = {
        toast,
        openModal,
        closeModal,
        refreshDashboard,
        formatNaira
    };
})();
