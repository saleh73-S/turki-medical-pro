import { Link } from 'react-router-dom'
import { modules } from '../data/modules'

const metrics = [
  { label: 'زيارات اليوم', value: '١٢٨', note: '↑ ٨٪ عن أمس', icon: '🧑‍🤝‍🧑', color: 'teal' },
  { label: 'مواعيد اليوم', value: '٤٦', note: '١٢ موعداً قادماً', icon: '📅', color: 'blue' },
  { label: 'إيرادات اليوم', value: '١٨٬٤٥٠', note: 'ريال سعودي', icon: '💰', color: 'amber' },
  { label: 'بانتظار الخدمة', value: '١٧', note: 'في مختلف الأقسام', icon: '⏱️', color: 'violet' },
]
const visits = [
  ['09:15', 'أحمد محمد', 'الباطنية', 'د. ناصر العتيبي', 'بانتظار الطبيب'],
  ['09:30', 'سارة علي', 'الأطفال', 'د. ريم الحربي', 'تم التسجيل'],
  ['09:45', 'خالد عمر', 'الأسنان', 'د. مازن التركي', 'قيد الكشف'],
  ['10:00', 'منى سعد', 'الجلدية', 'د. هالة صالح', 'موعد مؤكد'],
]
export default function Dashboard() {
  return <>
    <div className="page-title-row"><div><div className="eyebrow">نظرة عامة</div><h1>مرحباً بك، مدير النظام <span>👋</span></h1><p>إليك ملخص سير العمل في مركز التركي الطبي اليوم.</p></div><Link to="/module/reception" className="button primary">＋ تسجيل زيارة</Link></div>
    <section className="metric-grid">{metrics.map((m) => <article className="metric-card" key={m.label}><div className={`metric-icon ${m.color}`}>{m.icon}</div><div className="metric-label">{m.label}</div><div className="metric-value">{m.value}</div><div className="metric-note">{m.note}</div></article>)}</section>
    <section className="dashboard-grid"><article className="panel visits-panel"><div className="panel-heading"><div><h2>حركة المرضى اليوم</h2><p>آخر الزيارات المسجلة في الاستقبال</p></div><Link to="/module/reception" className="text-link">عرض الكل ←</Link></div><div className="table-wrap"><table><thead><tr>{['الوقت', 'المريض', 'العيادة', 'الطبيب', 'الحالة'].map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{visits.map((row) => <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{i === 4 ? <span className={`badge ${cell === 'قيد الكشف' ? 'badge-blue' : 'badge-amber'}`}>{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div></article>
      <article className="panel appointments-panel"><div className="panel-heading"><div><h2>المواعيد القادمة</h2><p>خلال الساعات القادمة</p></div><span className="subtle-count">٤ مواعيد</span></div><div className="appointment-list">{[['09:45', 'خالد عمر', 'الأسنان'], ['10:00', 'منى سعد', 'الجلدية'], ['10:30', 'عبدالله سالم', 'الباطنية'], ['11:00', 'فاطمة حسن', 'الأطفال']].map((a) => <div className="appointment-item" key={a[0]}><b>{a[0]}</b><div className="appointment-avatar">{a[1].slice(0, 1)}</div><div><strong>{a[1]}</strong><small>{a[2]}</small></div><span className="appointment-arrow">←</span></div>)}</div></article></section>
    <section className="panel shortcuts-panel"><div className="panel-heading"><div><h2>الوصول السريع</h2><p>انتقل مباشرة إلى وحدات النظام</p></div></div><div className="shortcut-grid">{modules.slice(0, 8).map((m) => <Link className="shortcut" to={`/module/${m.id}`} key={m.id}><span>{m.icon}</span><b>{m.title}</b><small>فتح الوحدة ←</small></Link>)}</div></section>
    <div className="demo-notice"><span>ⓘ</span><div><b>بيئة عرض تجريبية</b><p>الأرقام والسجلات المعروضة بيانات توضيحية فقط. لم يتم ربط قاعدة بيانات أو خدمة خارجية.</p></div></div>
  </>
}
