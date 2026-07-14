
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
      <form class="tool-form" id="raiseForm">
        <label>Current monthly salary<input type="number" name="current" required min="0"></label>
        <label>New monthly salary<input type="number" name="next" required min="0"></label>
        <button class="btn btn-primary">Calculate</button>
      </form>
      <div id="raiseResult"></div>`,
    ar: `
      <h2>حاسبة الزيادة</h2>
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
      <form class="tool-form" id="oeeForm">
        <label>Availability %<input type="number" name="a" required min="0" max="100" step="0.01"></label>
        <label>Performance %<input type="number" name="p" required min="0" max="100" step="0.01"></label>
        <label>Quality %<input type="number" name="q" required min="0" max="100" step="0.01"></label>
        <button class="btn btn-primary">Calculate OEE</button>
      </form>
      <div id="oeeResult"></div>`,
    ar: `
      <h2>حاسبة OEE</h2>
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
      <form class="tool-form" id="offerForm">
        <label>Offer A monthly total<input type="number" name="aMonthly" required min="0"></label>
        <label>Offer A annual bonus<input type="number" name="aBonus" value="0" min="0"></label>
        <label>Offer B monthly total<input type="number" name="bMonthly" required min="0"></label>
        <label>Offer B annual bonus<input type="number" name="bBonus" value="0" min="0"></label>
        <button class="btn btn-primary">Compare</button>
      </form>
      <div id="offerResult"></div>`,
    ar: `
      <h2>مقارنة عرضين وظيفيين</h2>
      <form class="tool-form" id="offerForm">
        <label>إجمالي عرض A الشهري<input type="number" name="aMonthly" required min="0"></label>
        <label>بونص عرض A السنوي<input type="number" name="aBonus" value="0" min="0"></label>
        <label>إجمالي عرض B الشهري<input type="number" name="bMonthly" required min="0"></label>
        <label>بونص عرض B السنوي<input type="number" name="bBonus" value="0" min="0"></label>
        <button class="btn btn-primary">قارن</button>
      </form>
      <div id="offerResult"></div>`
  },
  commute: {
    en: `
      <h2>Commute Calculator</h2>
      <form class="tool-form" id="commuteForm">
        <label>Round-trip distance per day (km)<input type="number" name="distance" required min="0"></label>
        <label>Working days per month<input type="number" name="days" value="22" required min="1"></label>
        <label>Vehicle efficiency (km/L)<input type="number" name="eff" value="12" required min="0.1"></label>
        <label>Fuel price per liter (SAR)<input type="number" name="price" value="2.33" required min="0" step="0.01"></label>
        <label>Round-trip time per day (minutes)<input type="number" name="minutes" required min="0"></label>
        <button class="btn btn-primary">Calculate</button>
      </form>
      <div id="commuteResult"></div>`,
    ar: `
      <h2>حاسبة التنقل</h2>
      <form class="tool-form" id="commuteForm">
        <label>مسافة الذهاب والعودة يوميًا (كم)<input type="number" name="distance" required min="0"></label>
        <label>أيام العمل شهريًا<input type="number" name="days" value="22" required min="1"></label>
        <label>كفاءة السيارة (كم/لتر)<input type="number" name="eff" value="12" required min="0.1"></label>
        <label>سعر لتر الوقود (ريال)<input type="number" name="price" value="2.33" required min="0" step="0.01"></label>
        <label>وقت الذهاب والعودة يوميًا (دقيقة)<input type="number" name="minutes" required min="0"></label>
        <button class="btn btn-primary">احسب</button>
      </form>
      <div id="commuteResult"></div>`
  },
  gosi: {
    en: `
      <h2>GOSI Deduction Calculator</h2>
      <form class="tool-form" id="gosiForm">
        <label>Basic salary<input type="number" name="basic" required min="0"></label>
        <label>Housing allowance<input type="number" name="housing" value="0" min="0"></label>
        <label>Salary month<input type="month" name="month" value="2026-07" required></label>
        <label>Any GOSI or civil pension contribution before 3 July 2024?
          <select name="prior" required>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <button class="btn btn-primary">Calculate Deduction</button>
      </form>
      <div id="gosiResult"></div>`,
    ar: `
      <h2>حاسبة خصم التأمينات</h2>
      <form class="tool-form" id="gosiForm">
        <label>الراتب الأساسي<input type="number" name="basic" required min="0"></label>
        <label>بدل السكن<input type="number" name="housing" value="0" min="0"></label>
        <label>شهر الراتب<input type="month" name="month" value="2026-07" required></label>
        <label>هل عندك أي مدة اشتراك بالتأمينات أو التقاعد المدني قبل 3 يوليو 2024؟
          <select name="prior" required>
            <option value="yes">نعم</option>
            <option value="no">لا</option>
          </select>
        </label>
        <button class="btn btn-primary">احسب الخصم</button>
      </form>
      <div id="gosiResult"></div>`
  },
  root: {
    en: `
      <h2>Root Cause Helper</h2>
      <form class="tool-form" id="rootForm">
        <label>Problem statement<textarea name="problem" required rows="3"></textarea></label>
        <label>Why 1<textarea name="w1" rows="2"></textarea></label>
        <label>Why 2<textarea name="w2" rows="2"></textarea></label>
        <label>Why 3<textarea name="w3" rows="2"></textarea></label>
        <label>Why 4<textarea name="w4" rows="2"></textarea></label>
        <label>Why 5<textarea name="w5" rows="2"></textarea></label>
        <label>Next action<textarea name="action" rows="3"></textarea></label>
        <button class="btn btn-primary">Generate Summary</button>
      </form>
      <div id="rootResult"></div>`,
    ar: `
      <h2>مساعد تحليل السبب الجذري</h2>
      <form class="tool-form" id="rootForm">
        <label>وصف المشكلة<textarea name="problem" required rows="3"></textarea></label>
        <label>لماذا 1<textarea name="w1" rows="2"></textarea></label>
        <label>لماذا 2<textarea name="w2" rows="2"></textarea></label>
        <label>لماذا 3<textarea name="w3" rows="2"></textarea></label>
        <label>لماذا 4<textarea name="w4" rows="2"></textarea></label>
        <label>لماذا 5<textarea name="w5" rows="2"></textarea></label>
        <label>الإجراء التالي<textarea name="action" rows="3"></textarea></label>
        <button class="btn btn-primary">أنشئ الملخص</button>
      </form>
      <div id="rootResult"></div>`
  },
  shift: {
    en: `
      <h2>Shift Handover Generator</h2>
      <form class="tool-form" id="shiftForm">
        <label>Shift / Date<input name="shift" required></label>
        <label>Production summary<textarea name="production" rows="3"></textarea></label>
        <label>Downtime / Issues<textarea name="issues" rows="3"></textarea></label>
        <label>Open actions<textarea name="actions" rows="3"></textarea></label>
        <button class="btn btn-primary">Generate Handover</button>
      </form>
      <div id="shiftResult"></div>`,
    ar: `
      <h2>مولد تسليم الشفت</h2>
      <form class="tool-form" id="shiftForm">
        <label>الشفت / التاريخ<input name="shift" required></label>
        <label>ملخص الإنتاج<textarea name="production" rows="3"></textarea></label>
        <label>التوقفات / المشكلات<textarea name="issues" rows="3"></textarea></label>
        <label>الإجراءات المفتوحة<textarea name="actions" rows="3"></textarea></label>
        <button class="btn btn-primary">أنشئ التقرير</button>
      </form>
      <div id="shiftResult"></div>`
  },
  kpi: {
    en: `
      <h2>KPI Dashboard</h2>
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
      const a = +d.get('aMonthly')*12 + +d.get('aBonus');
      const b = +d.get('bMonthly')*12 + +d.get('bBonus');
      const best = a === b ? (lang==='ar'?'العرضان متساويان':'Both offers are equal') : a > b ? 'A' : 'B';
      document.getElementById('offerResult').innerHTML = `<div class="result">A: ${money(a)} SAR<br>B: ${money(b)} SAR<br><strong>${lang==='ar'?'الأفضل':'Better offer'}: ${best}</strong></div>`;
    }
  }
  if (tool === 'commute') {
    document.getElementById('commuteForm').onsubmit = e => {
      e.preventDefault();
      const d = new FormData(e.target);
      const km = +d.get('distance') * +d.get('days');
      const liters = km / +d.get('eff');
      const cost = liters * +d.get('price');
      const hours = (+d.get('minutes') * +d.get('days')) / 60;
      document.getElementById('commuteResult').innerHTML = `<div class="result">${lang==='ar'?'المسافة الشهرية':'Monthly distance'}: ${money(km)} km<br>${lang==='ar'?'تكلفة الوقود الشهرية':'Monthly fuel cost'}: ${money(cost)} SAR<br>${lang==='ar'?'الوقت الشهري':'Monthly commute time'}: ${money(hours)} h<br>${lang==='ar'?'التكلفة السنوية':'Annual cost'}: ${money(cost*12)} SAR</div>`;
    }
  }
  if (tool === 'gosi') {
    document.getElementById('gosiForm').onsubmit = e => {
      e.preventDefault();
      const d = new FormData(e.target);
      const wage = Math.min((+d.get('basic') || 0) + (+d.get('housing') || 0), 45000);
      const month = String(d.get('month'));
      const prior = d.get('prior');
      let pension = 9;
      let system = lang === 'ar' ? 'النظام الحالي' : 'Current system';

      if (prior === 'no') {
        system = lang === 'ar' ? 'نظام التأمينات الجديد' : 'New Social Insurance Law';
        if (month >= '2028-07') pension = 11;
        else if (month >= '2027-07') pension = 10.5;
        else if (month >= '2026-07') pension = 10;
        else if (month >= '2025-07') pension = 9.5;
        else pension = 9;
      }

      const saned = 0.75;
      const pensionAmount = wage * pension / 100;
      const sanedAmount = wage * saned / 100;
      const total = pensionAmount + sanedAmount;

      document.getElementById('gosiResult').innerHTML = `<div class="result">
        <strong>${lang==='ar'?'إجمالي الخصم الشهري':'Total monthly deduction'}: ${money(total)} SAR</strong><br>
        ${lang==='ar'?'النظام المطبق':'Applicable system'}: ${system}<br>
        ${lang==='ar'?'الأجر الخاضع للاشتراك':'Contributory wage'}: ${money(wage)} SAR<br>
        ${lang==='ar'?'نسبة المعاشات':'Pension rate'}: ${money(pension)}%<br>
        ${lang==='ar'?'خصم المعاشات':'Pension deduction'}: ${money(pensionAmount)} SAR<br>
        ${lang==='ar'?'نسبة ساند':'SANED rate'}: 0.75%<br>
        ${lang==='ar'?'خصم ساند':'SANED deduction'}: ${money(sanedAmount)} SAR
      </div>`;
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
      document.getElementById('shiftResult').innerHTML = `<div class="result"><strong>${d.get('shift')}</strong><br><br><strong>${lang==='ar'?'الإنتاج':'Production'}:</strong><br>${d.get('production')||'-'}<br><br><strong>${lang==='ar'?'المشكلات':'Issues'}:</strong><br>${d.get('issues')||'-'}<br><br><strong>${lang==='ar'?'الإجراءات':'Actions'}:</strong><br>${d.get('actions')||'-'}</div>`;
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
