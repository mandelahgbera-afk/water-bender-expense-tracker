// Frontend upgrade layers for the Flask Expense Tracker.
// Each layer is an interactive feature with water analogy, purpose, and code.

export const FRONTEND_LAYERS = [
  {
    id: 'toast',
    num: 1,
    title: 'Toast Notifications (Spillway Feedback)',
    analogy: 'When water exits a pipe, it splashes — a toast is that splash confirming the action.',
    files: ['static/app.js', 'templates/base.html'],
    concepts: ['functions', 'strings'],
    summary: 'Replaces Flask flash messages with JS-powered toasts that auto-dismiss after 2.4s. No page reload needed.',
    code: `// app.js — Toast spillway
function toast(message, type = 'success') {
    const container = document.querySelector('.toast-container');
    const el = document.createElement('div');
    el.className = \`toast \${type}\`;
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => el.remove(), 2400);
}`
  },
  {
    id: 'modal',
    num: 2,
    title: 'Modal Dialog (Side-Valve)',
    analogy: 'A side-valve lets you open a new channel without draining the main pipe. The modal opens over the running flow.',
    files: ['static/app.js', 'templates/base.html', 'templates/dashboard.html'],
    concepts: ['functions', 'strings', 'lists'],
    summary: 'Add transaction in a modal dialog instead of navigating to a new page. No context lost.',
    code: `// app.js — Open side-valve
function openModal(title, bodyHTML, onSave) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = \`
        <div class="modal-card">
            <div class="modal-header">
                <h3>\${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">\${bodyHTML}</div>
        </div>\`;
    document.body.appendChild(overlay);
}`
  },
  {
    id: 'ripple',
    num: 3,
    title: 'Ripple Buttons (Pressure Pulse)',
    analogy: 'When a water bender touches a pipe, a pressure pulse radiates outward — the ripple follows the finger.',
    files: ['static/style.css', 'static/app.js'],
    concepts: ['functions', 'strings'],
    summary: 'Every button click spawns an animated water ripple at the exact touch point.',
    code: `/* style.css — ripple pulse */
.ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    background: rgba(255,255,255,0.4);
    animation: ripple-anim 0.55s linear;
    pointer-events: none;
}
@keyframes ripple-anim { to { transform: scale(4); opacity: 0; } }`
  },
  {
    id: 'inline-edit',
    num: 4,
    title: 'Inline Edit (Adjust Valves While Flow Runs)',
    analogy: 'Instead of shutting down the pipe to replace a section, you open a service port and adjust the valve in place.',
    files: ['static/app.js', 'templates/dashboard.html', 'app.py'],
    concepts: ['functions', 'conditionals', 'loops', 'database', 'exceptions'],
    summary: 'Click "Edit" on a table row — cells morph into inputs. Save sends JSON to /edit_transaction/<id> without page reload.',
    code: `// app.js — Transform row into edit form
btn.addEventListener('click', () => {
    tr.classList.add('editing');
    tr.innerHTML = \`
        <td><input type="date" value="\${row.date}"></td>
        <td><select class="edit-type">...</select></td>
        <td><input type="text" value="\${row.category}"></td>
        <td><input type="number" value="\${row.amount}"></td>
        <td>
            <button class="btn-save-edit">Save</button>
            <button class="btn-cancel-edit">Cancel</button>
        </td>\`;
});`
  },
  {
    id: 'ajax-delete',
    num: 5,
    title: 'AJAX Delete with Animation (Drain with Style)',
    analogy: 'Draining a pipe section with a smooth drain animation instead of a jarring cutoff.',
    files: ['static/app.js', 'app.py', 'templates/dashboard.html'],
    concepts: ['functions', 'exceptions', 'database'],
    summary: 'Delete button triggers AJAX POST to /delete_transaction/<id>, row animates out (rowRemove), table refreshes silently.',
    code: `// app.js — Drain with animation
btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const tr = btn.closest('tr');
    tr.classList.add('row-removing');
    await ajax(\`/delete_transaction/\${id}\`, { method: 'POST' });
    toast('Transaction deleted', 'info');
    refreshDashboard();
});`
  },
  {
    id: 'live-filter',
    num: 6,
    title: 'Live Debounced Filter (Screen the Conveyor Belt)',
    analogy: 'A live filter is a mesh screen placed over the conveyor belt — water (data) passes through only what matches.',
    files: ['static/app.js', 'app.py', 'templates/dashboard.html'],
    concepts: ['functions', 'loops', 'strings', 'lists', 'conditionals'],
    summary: 'Typing in the filter input triggers a debounced AJAX GET after 300ms. Server applies keyword filter, returns refreshed table HTML.',
    code: `// app.js — Debounced conveyor screen
const filter = debounce(async (query) => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', query);
    const html = await ajax(url.toString());
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    tableWrap.innerHTML = doc.getElementById('transactions-table-wrap').innerHTML;
}, 300);`
  },
  {
    id: 'live-charts',
    num: 7,
    title: 'Live Pie Chart (Flow Diagram)',
    analogy: 'A flow diagram that redraws itself every time the water flow changes — no manual blueprints needed.',
    files: ['static/app.js', 'static/style.css', 'templates/dashboard.html', 'templates/base.html'],
    concepts: ['lists', 'dictionaries', 'visualization', 'loops'],
    summary: 'Chart.js renders a pie chart from the transaction table on load. After add/delete, the chart redraws from the refreshed DOM.',
    code: `// app.js — Flow diagram redraw
const canvas = document.getElementById('chart-pie');
const spentByCat = {};
document.querySelectorAll('.tx-table tbody tr').forEach(tr => {
    const cells = tr.querySelectorAll('td');
    const type = cells[1]?.textContent?.trim();
    const cat = cells[2]?.textContent?.trim();
    const amt = parseFloat((cells[3]?.textContent || '₦0').replace(/[₦,]/g, '')) || 0;
    if (type === 'expense') spentByCat[cat] = (spentByCat[cat] || 0) + amt;
});
new Chart(canvas, { type: 'pie', data: { labels: Object.keys(spentByCat), datasets: [{ data: Object.values(spentByCat) }] } });`
  },
  {
    id: 'live-bars',
    num: 8,
    title: 'Animated Budget Bars (Live Pressure Gauges)',
    analogy: 'Pressure gauges that animate in real-time as water drains — no more static, stale readings.',
    files: ['static/app.js', 'static/style.css', 'templates/dashboard.html', 'app.py'],
    concepts: ['operators', 'conditionals', 'variables', 'css'],
    summary: 'Budget progress bars get a live-pulse CSS animation. On AJAX refresh, bars smoothly transition width (0.5s ease) and color (green→red when over).',
    code: `/* style.css — live gauge pulse */
.progress-bar-fill {
    transition: width 0.5s ease, background 0.4s ease;
}
.progress-bar-fill.live-pulse {
    animation: livePulse 1.2s ease infinite;
}
@keyframes livePulse {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.3); }
}`
  },
  {
    id: 'progressive',
    num: 9,
    title: 'Progressive Enhancement (Backward Compatibility)',
    analogy: 'The main pipe still works even if the side-valves are closed. Every feature degrades gracefully.',
    files: ['app.py', 'templates/dashboard.html', 'static/app.js'],
    concepts: ['functions', 'conditionals', 'file', 'exceptions'],
    summary: 'All POST endpoints return JSON for XHR requests AND redirect for form submits. noscript tags provide full non-JS fallback. data-js-only hides JS buttons until app.js loads.',
    code: `# app.py — Progressive enhancement pattern
def _wants_json():
    return request.headers.get('X-Requested-With') == 'XMLHttpRequest'

@app.route("/add_transaction", methods=["POST"])
def add_transaction():
    # ... handle both form and JSON ...
    if _wants_json():
        return jsonify(success=True)
    return redirect(url_for("dashboard"))

{# dashboard.html — noscript fallback #}
<noscript>
<form method="POST" action="{{ url_for('add_transaction') }}">
    <!-- full form -->
</form>
</noscript>
<button id="btn-add-modal" data-js-only style="display:none;">Quick Add</button>`
  }
]
