const roles: [string, string, string, string][] = [
  [
    '/figma/icons/key-square.svg',
    '/figma/icons/key-square-dark.svg',
    'I’m looking for a home',
    'Find a landlord and a place that feels right.',
  ],
  ['/figma/icons/house-white.svg', '/figma/icons/house.svg', 'I have a home to share', 'Meet tenants who match your space.'],
  ['/figma/icons/users-white.svg', '/figma/icons/users.svg', 'I’m looking for a roommate', 'Connect with people you’ll enjoy living with.'],
];

export function RoleScreen({
  selectedRole,
  setSelectedRole,
  onContinue,
}: {
  selectedRole: number;
  setSelectedRole: (role: number) => void;
  onContinue: () => void;
}) {
  return (
    <main className="app-shell role-screen">
      <div className="role-header">
        <img src="/figma/icons/logo-icon-header.svg" alt="Hausom" width={78} height={79} />
      </div>
      <div className="role-body">
        <div className="role-copy">
          <p className="role-eyebrow">LET’S GET STARTED</p>
          <h1>What brings you to Hausom?</h1>
          <p>Choose the role that fits you best. You can change this later.</p>
        </div>
        <div className="role-options">
          {roles.map(([iconWhite, iconDark, title, subtitle], index) => {
            const selected = selectedRole === index;
            return (
              <button className={`role-card ${selected ? 'role-card--selected' : ''}`} key={title} onClick={() => setSelectedRole(index)}>
                <span className="role-icon">
                  <img src={selected ? iconWhite : iconDark} alt="" width={22} height={22} />
                </span>
                <span className="role-text">
                  <strong>{title}</strong>
                  <small>{subtitle}</small>
                </span>
                <img
                  src={selected ? '/figma/icons/selection-active.svg' : '/figma/icons/selection-inactive.svg'}
                  alt=""
                  width={20}
                  height={20}
                />
              </button>
            );
          })}
        </div>
        <button className="role-continue" onClick={onContinue}>
          CONTINUE
          <img src="/figma/icons/arrow-right.svg" alt="" width={20} height={20} />
        </button>
        <p className="role-signin">
          Already have an account? <button>Sign in</button>
        </p>
      </div>
    </main>
  );
}
