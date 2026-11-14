import { FormEvent, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { modules } from '../data/modules'

export default function ModulePage() {
  const { moduleId } = useParams()
  const module = modules.find((item) => item.id === moduleId)
  const [records, setRecords] = useState(module?.records ?? [])
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [values, setValues] = useState<string[]>([])
  const filtered = useMemo(() => records.filter((row) => row.values.some((value) => value.toLocaleLowerCase('ar').includes(query.toLocaleLowerCase('ar')))), [records, query])
  if (!module) return <div className="empty-state"><span>🔎</span><h2>الوحدة غير موجودة</h2><p>اختر وحدة من القائمة الجانبية.</p></div>
  const openForm = () => { setValues(module.fields.map(() => '')); setShowForm(true) }
  const submit = (event: FormEvent) => { event.preventDefault(); setRecords((current) => [{ id: `${Date.now()}`, values }, ...current]); setShowForm(false) }
  const barcode = module.id === 'pos' || module.id === 'inventory' || module.id === 'pharmacy'
  return <>
    <div className="page-title-row"><div><div className="eyebrow">{module.group}</div><h1>{module.icon} {module.title}</h1><p>{module.description}</p></div><div className="title-actions"><button className="button secondary" onClick={() => window.print()}>⎙ طباعة</button><button className="button primary" onClick={openForm}>＋ إضافة {module.title}</button></div></div>
    {barcode && <div className="barcode-card"><span>▥</span><label htmlFor="barcode">قراءة الباركود</label><input id="barcode" dir="ltr" placeholder="امسح الرمز أو أدخل رقم الصنف..." onKeyDown={(e) => { if (e.key === 'Enter' && e.currentTarget.value.trim()) { setQuery(e.currentTarget.value.trim()); e.currentTarget.value = '' } }} /><small>يدعم قارئ الباركود الذي يعمل كلوحة مفاتيح</small></div>}
    <section className="panel data-panel"><div className="panel-heading"><div><h2>سجل {module.title}</h2><p>{filtered.length} سجل معروض</p></div><div className="table-tools"><label className="search-box"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث في السجلات..." /></label><button className="button secondary compact" onClick={() => { setQuery(''); setRecords(module.records) }}>إعادة تعيين</button></div></div><div className="table-wrap"><table><thead><tr>{module.columns.map((column) => <th key={column}>{column}</th>)}<th>إجراء</th></tr></thead><tbody>{filtered.map((record) => <tr key={record.id}>{record.values.map((value, i) => <td key={i}>{i === record.values.length - 1 ? <span className={`badge ${value.includes('منخفض') || value.includes('انتظار') ? 'badge-amber' : 'badge-green'}`}>{value}</span> : value}</td>)}<td><button className="row-action" title="طباعة السجل" onClick={() => window.print()}>⎙</button></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="no-results">لا توجد نتائج مطابقة.</div>}</div><div className="table-foot">عرض {filtered.length} من {records.length} سجل <span>البيانات محلية لهذه الجلسة فقط</span></div></section>
    <div className="demo-notice"><span>ⓘ</span><div><b>واجهة مستقلة عن قاعدة البيانات</b><p>الإضافة والبحث يعملان محلياً كتجربة. لا يتم حفظ أي بيانات ولا يوجد اتصال بـ Supabase.</p></div></div>
    {showForm && <div className="modal-backdrop" role="presentation" onClick={() => setShowForm(false)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title" onClick={(e) => e.stopPropagation()}><div className="modal-head"><div><h2 id="form-title">إضافة سجل جديد</h2><p>{module.title}</p></div><button className="close-modal" onClick={() => setShowForm(false)} aria-label="إغلاق">×</button></div><form onSubmit={submit}><div className="form-grid">{module.fields.map((field, index) => <label key={field}>{field}<input required value={values[index]} onChange={(e) => setValues((current) => current.map((value, i) => i === index ? e.target.value : value))} /></label>)}</div><div className="modal-actions"><button type="button" className="button secondary" onClick={() => setShowForm(false)}>إلغاء</button><button className="button primary" type="submit">حفظ محلياً</button></div></form></section></div>}
  </>
}
