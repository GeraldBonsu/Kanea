import React from 'react';
import { ToolHeader } from '../components/shared';

const users = [
  { n: 'Akua Sarpong',    r: 'Ops manager',       p: 'Full access',               on: true },
  { n: 'Kwame Adjei',     r: 'Technician',         p: 'Field app · tickets',       on: true },
  { n: 'Yaa Boahen',      r: 'Technician',         p: 'Field app · tickets',       on: true },
  { n: 'Emmanuel Osei',   r: 'Customer success',   p: 'Sites · tickets · holds',   on: true },
  { n: 'Linda Mensah',    r: 'Finance',            p: 'Collections · analytics',   on: false },
  { n: 'Kojo Danso',      r: 'Sales agent',        p: 'Field app · onboarding',    on: true },
];

export default function UsersView() {
  return (
    <div>
      <ToolHeader title="Users & roles" desc="Manage agents, technicians and ops users. Role-based access on field and ops."
        right={<button className="btn btn-primary">+ Invite user</button>} />
      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="ops-table">
          <thead><tr><th>Name</th><th>Role</th><th>Permissions</th><th>Status</th></tr></thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <span className="avatar">{u.n.split(' ').map(x => x[0]).join('')}</span>
                  <span style={{ fontWeight: 600 }}>{u.n}</span>
                </div></td>
                <td style={{ color: 'var(--ink-2)' }}>{u.r}</td>
                <td style={{ color: 'var(--ink-3)', fontSize: 13.5 }}>{u.p}</td>
                <td><span className={`chip ${u.on ? 'on' : 'neutral'}`}><span className="dot" />{u.on ? 'Active' : 'Invited'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
