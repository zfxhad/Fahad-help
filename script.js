
const langToggle = document.getElementById('langToggle');
let lang = 'en';

function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
  langToggle.textContent = lang === 'en' ? 'العربية' : 'English';
}
langToggle.addEventListener('click', () => {
  lang = lang === 'en' ? 'ar' : 'en';
  applyLang();
});

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const dialog = document.getElementById('toolDialog');
const toolContent = document.getElementById('toolContent');
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());

function money(v) {
  return new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-SA', {
    maximumFractionDigits: 2
  }).format(Number(v || 0));
}

const tools = {
  raise: {
    en: `
      <h2>Salary Raise Calculator</h2>
      <div class="about-tool"><strong>About this tool</strong><p>Enter your current and new monthly salary to see the raise amount, raise percentage, and full annual difference.</p></div>
      <form class="tool-form" id="raiseForm">
        <label>Current monthly salary<input type="number" name="current" required min="0"></label>
        <label>New monthly salary<input type="number" name="next" required min="0"></label>
        <button class="btn btn-primary">Calculate</button>
      </form>
      <div id="raiseResult"></div>`,
    ar: `
      <h2>حاسبة الزيادة</h2>
      <div class="about-tool"><strong>عن الأداة</strong><p>اكتب راتبك الحالي والجديد وبتعرف مقدار الزيادة، نسبتها، والفرق السنوي كامل.</p></div>
      <form class="tool-form" id="raiseForm">
        <label>الراتب الشهري الحالي<input type="number" name="current" required min="0"></label>
        <label>الراتب الشهري الجديد<input type="number" name="next" required min="0"></label>
        <button class="btn btn-primary">احسب</button>
      </form>
      <div id="raiseResult"></div>`
  },
  oee: {
    en: `
      <h2>OEE Calculator</h2>
      <div class="about-tool"><strong>About this tool</strong><p>OEE combines Availability, Performance, and Quality to show how effectively production equipment is being used.</p></div>
      <form class="tool-form" id="oeeForm">
        <label>Availability %<input type="number" name="a" required min="0" max="100" step="0.01"></label>
        <label>Performance %<input type="number" name="p" required min="0" max="100" step="0.01"></label>
        <label>Quality %<input type="number" name="q" required min="0" max="100" step="0.01"></label>
        <button class="btn btn-primary">Calculate OEE</button>
      </form>
      <div id="oeeResult"></div>`,
    ar: `
      <h2>حاسبة OEE</h2>
      <div class="about-tool"><strong>عن الأداة</strong><p>يجمع OEE بين التوافر والأداء والجودة عشان يوضح كفاءة استخدام معدات الإنتاج.</p></div>
      <form class="tool-form" id="oeeForm">
        <label>التوافر %<input type="number" name="a" required min="0" max="100" step="0.01"></label>
        <label>الأداء %<input type="number" name="p" required min="0" max="100" step="0.01"></label>
        <label>الجودة %<input type="number" name="q" required min="0" max="100" step="0.01"></label>
        <button class="btn btn-primary">احسب OEE</button>
      </form>
      <div id="oeeResult"></div>`
  },
  offer: {
    en: `
      <h2>Job Offer Comparison</h2>
      <div class="about-tool"><strong>About this tool</strong><p>Compare two job offers using their complete annual value, not only the basic monthly salary. Add monthly compensation and annual bonus to see the yearly difference.</p></div>
      <form class="tool-form" id="offerForm">
        <label>Company A name<input name="aName" value="Company A"></label>
        <label>Company A monthly total<input type="number" name="aMonthly" required min="0"></label>
        <label>Company A annual bonus<input type="number" name="aBonus" value="0" min="0"></label>
        <label>Company B name<input name="bName" value="Company B"></label>
        <label>Company B monthly total<input type="number" name="bMonthly" required min="0"></label>
        <label>Company B annual bonus<input type="number" name="bBonus" value="0" min="0"></label>
        <button class="btn btn-primary">Compare</button>
      </form>
      <div id="offerResult"></div>`,
    ar: `
      <h2>مقارنة عرضين وظيفيين</h2>
      <div class="about-tool"><strong>عن الأداة</strong><p>قارن عرضين وظيفيين بالقيمة السنوية الكاملة، مو بس الراتب الأساسي. أضف الإجمالي الشهري والبونص السنوي وبتشوف الفرق بينهم بالسنة.</p></div>
      <form class="tool-form" id="offerForm">
        <label>اسم شركة A<input name="aName" value="شركة A"></label>
        <label>إجمالي شركة A الشهري<input type="number" name="aMonthly" required min="0"></label>
        <label>بونص شركة A السنوي<input type="number" name="aBonus" value="0" min="0"></label>
        <label>اسم شركة B<input name="bName" value="شركة B"></label>
        <label>إجمالي شركة B الشهري<input type="number" name="bMonthly" required min="0"></label>
        <label>بونص شركة B السنوي<input type="number" name="bBonus" value="0" min="0"></label>
        <button class="btn btn-primary">قارن</button>
      </form>
      <div id="offerResult"></div>`
  },
  commute: {
    en: `
      <h2>Commute Calculator</h2>
      <div class="about-tool"><strong>About this tool</strong><p>Estimate how much time and money your commute costs. Choose whether your entered distance and time are daily or weekly.</p></div>
      <form class="tool-form" id="commuteForm">
        <label>Input period<select name="period"><option value="daily">Daily</option><option value="weekly">Weekly</option></select></label>
        <label>Round-trip distance (km)<input type="number" name="distance" required min="0"></label>
        <label>Working days per week<input type="number" name="days" value="5" required min="1" max="7"></label>
        <label>Vehicle efficiency (km/L)<input type="number" name="eff" value="12" required min="0.1"></label>
        <label>Fuel price per liter (SAR)<input type="number" name="price" value="2.33" required min="0" step="0.01"></label>
        <label>Round-trip time (minutes)<input type="number" name="minutes" required min="0"></label>
        <button class="btn btn-primary">Calculate</button>
      </form>
      <div id="commuteResult"></div>`,
    ar: `
      <h2>حاسبة التنقل</h2>
      <div class="about-tool"><strong>عن الأداة</strong><p>احسب كم يكلفك مشوار العمل من وقت وفلوس، واختر هل المسافة والوقت اللي تدخلها يومية أو أسبوعية.</p></div>
      <form class="tool-form" id="commuteForm">
        <label>فترة الإدخال<select name="period"><option value="daily">يومي</option><option value="weekly">أسبوعي</option></select></label>
        <label>مسافة الذهاب والعودة (كم)<input type="number" name="distance" required min="0"></label>
        <label>أيام العمل بالأسبوع<input type="number" name="days" value="5" required min="1" max="7"></label>
        <label>كفاءة السيارة (كم/لتر)<input type="number" name="eff" value="12" required min="0.1"></label>
        <label>سعر لتر الوقود (ريال)<input type="number" name="price" value="2.33" required min="0" step="0.01"></label>
        <label>وقت الذهاب والعودة (دقيقة)<input type="number" name="minutes" required min="0"></label>
        <button class="btn btn-primary">احسب</button>
      </form>
      <div id="commuteResult"></div>`
  },
  root: {
    en: `
      <h2>Root Cause Helper</h2>
      <div class="about-tool"><strong>About this tool</strong><p>Use the 5 Whys method to move from the visible problem to its likely root cause, then record the next corrective action.</p></div>
      <form class="tool-form" id="rootForm">
        <label>Problem statement<textarea name="problem" required rows="3"></textarea></label>
        <label>Why 1<textarea name="w1" rows="2"></textarea></label>
        <label>Why 2<textarea name="w2" rows="2"></textarea></label>
        <label>Why 3<textarea name="w3" rows="2"></textarea></label>
        <label>Why 4<textarea name="w4" rows="2"></textarea></label>
        <label>Why 5<textarea name="w5" rows="2"></textarea></label>
        <label>Corrective action<textarea name="action" rows="3"></textarea></label>
        <button class="btn btn-primary">Generate Summary</button>
      </form>
      <div id="rootResult"></div>`,
    ar: `
      <h2>مساعد تحليل السبب الجذري</h2>
      <div class="about-tool"><strong>عن الأداة</strong><p>استخدم طريقة 5 لماذا عشان تنتقل من المشكلة الظاهرة للسبب الجذري المحتمل، وبعدها سجّل الإجراء التصحيحي.</p></div>
      <form class="tool-form" id="rootForm">
        <label>وصف المشكلة<textarea name="problem" required rows="3"></textarea></label>
        <label>لماذا 1<textarea name="w1" rows="2"></textarea></label>
        <label>لماذا 2<textarea name="w2" rows="2"></textarea></label>
        <label>لماذا 3<textarea name="w3" rows="2"></textarea></label>
        <label>لماذا 4<textarea name="w4" rows="2"></textarea></label>
        <label>لماذا 5<textarea name="w5" rows="2"></textarea></label>
        <label>الإجراء التصحيحي<textarea name="action" rows="3"></textarea></label>
        <button class="btn btn-primary">أنشئ الملخص</button>
      </form>
      <div id="rootResult"></div>`
  },
  shift: {
    en: `
      <h2>Shift Handover Generator</h2>
      <div class="about-tool"><strong>About this tool</strong><p>Create a clear handover note covering production status, open issues, safety points, and actions required for the next shift.</p></div>
      <form class="tool-form" id="shiftForm">
        <label>Shift / Date<input name="shift" required></label>
        <label>Production summary<textarea name="production" rows="3"></textarea></label>
        <label>Downtime / Issues<textarea name="issues" rows="3"></textarea></label>
        <label>Safety notes<textarea name="safety" rows="3"></textarea></label>
        <label>Open actions<textarea name="actions" rows="3"></textarea></label>
        <button class="btn btn-primary">Generate Handover</button>
      </form>
      <div id="shiftResult"></div>`,
    ar: `
      <h2>مولد تسليم الشفت</h2>
      <div class="about-tool"><strong>عن الأداة</strong><p>سو ملاحظة تسليم واضحة تشمل حالة الإنتاج، المشاكل المفتوحة، ملاحظات السلامة، والإجراءات المطلوبة للشفت الجاي.</p></div>
      <form class="tool-form" id="shiftForm">
        <label>الشفت / التاريخ<input name="shift" required></label>
        <label>ملخص الإنتاج<textarea name="production" rows="3"></textarea></label>
        <label>التوقفات / المشكلات<textarea name="issues" rows="3"></textarea></label>
        <label>ملاحظات السلامة<textarea name="safety" rows="3"></textarea></label>
        <label>الإجراءات المفتوحة<textarea name="actions" rows="3"></textarea></label>
        <button class="btn btn-primary">أنشئ التقرير</button>
      </form>
      <div id="shiftResult"></div>`
  },
  kpi: {
    en: `
      <h2>KPI Dashboard</h2>
      <div class="about-tool"><strong>About this tool</strong><p>Enter production, rejects, operating time, and downtime to get a quick view of target achievement, quality, and availability.</p></div>
      <form class="tool-form" id="kpiForm">
        <label>Target production<input type="number" name="target" required min="0"></label>
        <label>Actual production<input type="number" name="actual" required min="0"></label>
        <label>Total units<input type="number" name="total" required min="0"></label>
        <label>Rejected units<input type="number" name="rejects" value="0" min="0"></label>
        <label>Planned operating minutes<input type="number" name="planned" required min="0"></label>
        <label>Downtime minutes<input type="number" name="down" value="0" min="0"></label>
        <button class="btn btn-primary">Calculate KPIs</button>
      </form>
      <div id="kpiResult"></div>`,
    ar: `
      <h2>لوحة مؤشرات الأداء</h2>
      <div class="about-tool"><strong>عن الأداة</strong><p>اكتب الإنتاج والرفض ووقت التشغيل والتوقف عشان تشوف بسرعة نسبة تحقيق الهدف والجودة والتوافر.</p></div>
      <form class="tool-form" id="kpiForm">
        <label>الإنتاج المستهدف<input type="number" name="target" required min="0"></label>
        <label>الإنتاج الفعلي<input type="number" name="actual" required min="0"></label>
        <label>إجمالي الوحدات<input type="number" name="total" required min="0"></label>
        <label>الوحدات المرفوضة<input type="number" name="rejects" value="0" min="0"></label>
        <label>دقائق التشغيل المخططة<input type="number" name="planned" required min="0"></label>
        <label>دقائق التوقف<input type="number" name="down" value="0" min="0"></label>
        <button class="btn btn-primary">احسب المؤشرات</button>
      </form>
      <div id="kpiResult"></div>`
  }
};

function bindTool(tool) {
  if (tool === 'raise') {
    document.getElementById('raiseForm').onsubmit = e => {
      e.preventDefault();
      const d = new FormData(e.target);
      const current = +d.get('current'), next = +d.get('next');
      const diff = next - current;
      const pct = current ? diff / current * 100 : 0;
      document.getElementById('raiseResult').innerHTML =
        `<div class="result"><strong>${lang==='ar'?'نسبة الزيادة':'Increase'}: ${money(pct)}%</strong><br>${lang==='ar'?'الفرق الشهري':'Monthly difference'}: ${money(diff)} SAR<br>${lang==='ar'?'الفرق السنوي':'Annual difference'}: ${money(diff*12)} SAR</div>`;
    }
  }
  if (tool === 'oee') {
    document.getElementById('oeeForm').onsubmit = e => {
      e.preventDefault();
      const d = new FormData(e.target);
      const oee = (+d.get('a')/100)*(+d.get('p')/100)*(+d.get('q')/100)*100;
      const status = oee >= 85 ? (lang==='ar'?'ممتاز':'Excellent') : oee >= 65 ? (lang==='ar'?'يحتاج تحسين':'Needs improvement') : (lang==='ar'?'منخفض':'Low');
      document.getElementById('oeeResult').innerHTML = `<div class="result"><strong>OEE: ${money(oee)}%</strong><br>${status}</div>`;
    }
  }
  if (tool === 'offer') {
    document.getElementById('offerForm').onsubmit = e => {
      e.preventDefault();
      const d = new FormData(e.target);
      const aName = d.get('aName') || (lang==='ar'?'شركة A':'Company A');
      const bName = d.get('bName') || (lang==='ar'?'شركة B':'Company B');
      const a = +d.get('aMonthly')*12 + +d.get('aBonus');
      const b = +d.get('bMonthly')*12 + +d.get('bBonus');
      const best = a === b ? (lang==='ar'?'العرضان متساويان بالقيمة السنوية':'Both offers have the same annual value') : a > b ? `${aName} ${lang==='ar'?'أعلى سنويًا':'has the higher annual value'}` : `${bName} ${lang==='ar'?'أعلى سنويًا':'has the higher annual value'}`;
      const difference = Math.abs(a-b);
      document.getElementById('offerResult').innerHTML = `<div class="result">${aName}: ${money(a)} SAR / ${lang==='ar'?'سنة':'year'}<br>${bName}: ${money(b)} SAR / ${lang==='ar'?'سنة':'year'}<br><strong>${best}</strong>${difference ? `<br>${lang==='ar'?'الفرق السنوي':'Annual difference'}: ${money(difference)} SAR` : ''}</div>`;
    }
  }
  if (tool === 'commute') {
    document.getElementById('commuteForm').onsubmit = e => {
      e.preventDefault();
      const d = new FormData(e.target);
      const period = d.get('period');
      const days = +d.get('days');
      const enteredKm = +d.get('distance');
      const enteredMinutes = +d.get('minutes');
      const weeklyKm = period === 'daily' ? enteredKm * days : enteredKm;
      const weeklyMinutes = period === 'daily' ? enteredMinutes * days : enteredMinutes;
      const liters = weeklyKm / +d.get('eff');
      const weeklyCost = liters * +d.get('price');
      document.getElementById('commuteResult').innerHTML = `<div class="result">${lang==='ar'?'المسافة الأسبوعية':'Weekly distance'}: ${money(weeklyKm)} km<br>${lang==='ar'?'تكلفة الوقود الأسبوعية':'Weekly fuel cost'}: ${money(weeklyCost)} SAR<br>${lang==='ar'?'الوقت الأسبوعي':'Weekly commute time'}: ${money(weeklyMinutes/60)} h</div>`;
    }
  }
  if (tool === 'root') {
    document.getElementById('rootForm').onsubmit = e => {
      e.preventDefault();
      const d = new FormData(e.target);
      const whys = ['w1','w2','w3','w4','w5'].map(k => d.get(k)).filter(Boolean);
      document.getElementById('rootResult').innerHTML = `<div class="result"><strong>${lang==='ar'?'المشكلة':'Problem'}:</strong> ${d.get('problem')}<br><br><strong>5 Whys:</strong><ol>${whys.map(x=>`<li>${x}</li>`).join('')}</ol><strong>${lang==='ar'?'الإجراء':'Action'}:</strong> ${d.get('action')||'-'}</div>`;
    }
  }
  if (tool === 'shift') {
    document.getElementById('shiftForm').onsubmit = e => {
      e.preventDefault();
      const d = new FormData(e.target);
      document.getElementById('shiftResult').innerHTML = `<div class="result"><strong>${d.get('shift')}</strong><br><br><strong>${lang==='ar'?'الإنتاج':'Production'}:</strong><br>${d.get('production')||'-'}<br><br><strong>${lang==='ar'?'المشكلات':'Issues'}:</strong><br>${d.get('issues')||'-'}<br><br><strong>${lang==='ar'?'السلامة':'Safety'}:</strong><br>${d.get('safety')||'-'}<br><br><strong>${lang==='ar'?'الإجراءات':'Actions'}:</strong><br>${d.get('actions')||'-'}</div>`;
    }
  }
  if (tool === 'kpi') {
    document.getElementById('kpiForm').onsubmit = e => {
      e.preventDefault();
      const d = new FormData(e.target);
      const target = +d.get('target'), actual=+d.get('actual'), total=+d.get('total'), rejects=+d.get('rejects'), planned=+d.get('planned'), down=+d.get('down');
      const achievement = target ? actual/target*100 : 0;
      const quality = total ? (total-rejects)/total*100 : 0;
      const availability = planned ? (planned-down)/planned*100 : 0;
      document.getElementById('kpiResult').innerHTML = `<div class="result">${lang==='ar'?'تحقيق الهدف':'Target achievement'}: ${money(achievement)}%<br>${lang==='ar'?'الجودة':'Quality'}: ${money(quality)}%<br>${lang==='ar'?'التوافر':'Availability'}: ${money(availability)}%</div>`;
    }
  }
}

document.querySelectorAll('.open-tool').forEach(btn => {
  btn.addEventListener('click', () => {
    const tool = btn.dataset.tool;
    toolContent.innerHTML = tools[tool][lang];
    dialog.showModal();
    bindTool(tool);
  });
});
