import { NavLink, useLocation } from 'react-router-dom'
import { modules, navigationGroups } from '../data/modules'
import { ReactNode, useState } from 'react'

type Props = { children: ReactNode }

export default function AppShell({ children }: Props) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const active = modules.find((item) => location.pathname === `/module/${item.id}`)
  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="brand"><div className="brand-mark">ط</div><div><strong>مركز التركي الطبي</strong><small>نظام إدارة المنشأة</small></div><button className="close-menu" onClick={() => setOpen(false)} aria-label="إغلاق القائمة">×</button></div>
        <NavLink to="/" end className={({ isActive }) => `nav-link dashboard-link ${isActive ? 'active' : ''}`} onClick={() => setOpen(false)}><span>▦</span> لوحة التحكم</NavLink>
        <div className="nav-scroll">{navigationGroups.map((group) => <section className="nav-group" key={group}><div className="nav-heading">{group}</div>{modules.filter((m) => m.group === group).map((m) => <NavLink key={m.id} to={`/module/${m.id}`} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setOpen(false)}><span className="nav-icon">{m.icon}</span>{m.title}</NavLink>)}</section>)}</div>
        <div className="sidebar-foot"><span className="status-dot" /> النظام يعمل محلياً <small>نسخة واجهة تجريبية</small></div>
      </aside>
      {open && <button className="scrim" onClick={() => setOpen(false)} aria-label="إغلاق القائمة" />}
      <main className="main-area">
        <header className="topbar"><button className="menu-button" onClick={() => setOpen(true)} aria-label="فتح القائمة">☰</button><div className="breadcrumbs">الرئيسية <span>/</span> {active?.title ?? 'لوحة التحكم'}</div><div className="top-actions"><span className="today-label">السبت، ١٤ نوفمبر ٢٠٢٦</span><button className="icon-button" title="الإشعارات">♧<i /></button><div className="user-chip"><div className="avatar">م</div><div><b>مدير النظام</b><small>مدير المنشأة</small></div></div></div></header>
        <div className="page-content">{children}</div>
        <footer className="app-footer"><span>© 2026 مركز التركي الطبي</span><span>واجهة تجريبية مستقلة عن قاعدة البيانات</span></footer>
      </main>
    </div>
  )
}
