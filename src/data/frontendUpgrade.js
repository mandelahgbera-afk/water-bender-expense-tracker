// Frontend upgrade layers for the Flask Expense Tracker.
// Restaurant + kitchen analogies for the interactive JS layer.
// Each layer is an independent skill the learner adds to their station.

export const FRONTEND_LAYERS = [
  {
    id: 'toast',
    num: 1,
    title: 'Toast Notifications (Order Chit Call)',
    analogy: 'When the kitchen calls out an order, the waiter acknowledges with a nod. A toast is that acknowledgment — visible, auto-dismissing, non-blocking.',
    files: ['static/app.js', 'templates/base.html'],
    concepts: ['functions', 'strings'],
    summary: 'Replaces Flask flash messages with JS-powered toasts that auto-dismiss after 2.4s. No page reload needed.',
    code: `// app.js — Order acknowledgment chit
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
    title: 'Modal Dialog (Side Counter / Express Station)',
    analogy: 'A quick express station at the bar where you grab a coffee without waiting for a table. The modal opens over the dining room without clearing it.',
    files: ['static/app.js', 'templates/base.html', 'templates/dashboard.html'],
    concepts: ['functions', 'strings', 'lists'],
    summary: 'Add transaction in a modal dialog instead of navigating away. Context never lost.',
    code: `// app.js — Open express station
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
    title: 'Ripple Buttons (Plate Press / Stamp)',
    analogy: 'When the chef plates a dish, they press the logo stamp on the rim. A ripple button presses a branded mark at the exact touch point.',
    files: ['static/style.css', 'static/app.js'],
    concepts: ['functions', 'strings'],
    summary: 'Every button click spawns an animated branded ripple at the exact touch point.',
    code: `/* style.css — plate press */
.ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    background: rgba(255,255,255,0.4);
    animation: ripple-anim 0.55s linear;
}
@keyframes ripple-anim { to { transform: scale(4); opacity: 0; } }`
  },
  {
    id: 'inline-edit',
    num: 4,
    title: 'Inline Edit (Ticket Correction at the Pass)',
    analogy: 'A ticket comes back from the table: "no onions". Instead of reprinting the whole order, the expeditor crosses off the line and writes the correction at the pass.',
    files: ['static/app.js', 'templates/dashboard.html', 'app.py'],
    concepts: ['functions', 'conditionals', 'loops', 'database', 'exceptions'],
    summary: 'Click Edit on a table row — cells morph into inputs. Save sends JSON to /edit_transaction/<id> without page reload.',
    code: `// app.js — Ticket correction at the pass
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
    title: 'AJAX Delete with Animation (Table Bussing)',
    analogy: 'Bussing a table smoothly — wipe, stack chairs, walk away — instead of knocking the plate off the table.',
    files: ['static/app.js', 'app.py', 'templates/dashboard.html'],
    concepts: ['functions', 'exceptions', 'database'],
    summary: 'Delete button triggers AJAX POST to /delete_transaction/<id>, row animates out (rowRemove), table refreshes silently.',
    code: `// app.js — Smooth table bussing
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
    title: 'Live Debounced Filter (Rail Sorter)',
    analogy: 'A server scanning the order rail as tickets come in, rerouting matching tickets to the front. The filter is the sorter eye.',
    files: ['static/app.js', 'app.py', 'templates/dashboard.html'],
    concepts: ['functions', 'loops', 'strings', 'lists', 'conditionals'],
    summary: 'Typing triggers a debounced AJAX GET after 280ms. Server applies keyword filter, returns refreshed table HTML.',
    code: `// app.js — Rail sorter
const filter = debounce(async (query) => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', query);
    const html = await ajax(url.toString());
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    tableWrap.innerHTML = doc.getElementById('transactions-table-wrap').innerHTML;
}, 280);`
  },
  {
    id: 'live-charts',
    num: 7,
    title: 'Live Pie Chart (Sales Board)',
    analogy: 'The kitchen\'s live sales board showing tonight\'s moves by category — no manual tally needed.',
    files: ['static/app.js', 'static/style.css', 'templates/dashboard.html', 'templates/base.html'],
    concepts: ['lists', 'dictionaries', 'visualization', 'loops'],
    summary: 'Chart.js renders a pie chart from the transaction table. After add/delete, the board redraws automatically.',
    code: `// app.js — Sales board
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
    title: 'Animated Budget Bars (Live Station Gauges)',
    analogy: 'Each prep station has a gauge showing daily spend. When an order goes out, the gauge shifts in real-time.',
    files: ['static/app.js', 'static/style.css', 'templates/dashboard.html', 'app.py'],
    concepts: ['operators', 'conditionals', 'variables', 'css'],
    summary: 'Budget progress bars get a live-pulse CSS animation. On AJAX refresh, bars smoothly transition width and color (green → red when over).',
    code: `/* style.css — live station gauge */
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
    title: 'Progressive Enhancement (Full-Service Restaurant)',
    analogy: 'A full-service restaurant that works whether you call orders in by phone, use the call button, or walk up to the counter. Every method works; the fancy ones are just smoother.',
    files: ['app.py', 'templates/dashboard.html', 'static/app.js'],
    concepts: ['functions', 'conditionals', 'file', 'exceptions'],
    summary: 'All POST endpoints return JSON for XHR AND redirect for form submits. noscript tags provide full non-JS fallback. data-js-only hides enhancements until JS loads.',
    code: `# app.py — Serve every guest, regardless of method
def _wants_json():
    return request.headers.get('X-Requested-With') == 'XMLHttpRequest'

@app.route("/add_transaction", methods=["POST"])
def add_transaction():
    # ... handle both JSON body and form data ...
    if _wants_json():
        return jsonify(success=True)  # AJAX — express counter
    return redirect(url_for("dashboard"))  # Form — table service

{# dashboard.html — noscript fallback #}
<noscript>
<form method="POST" action="{{ url_for('add_transaction') }}">
    <!-- full form for non-JS guests -->
</form>
</noscript>
<button id="btn-add-modal" data-js-only style="display:none;">Quick Add</button>`
  }
]
