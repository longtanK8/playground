interface UnoProps {
  playerName: string
  onClose: () => void
}

export const Uno: React.FC<UnoProps> = ({ playerName, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      color: 'white',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      <h1>🎴 Uno</h1>
      <p>Welcome {playerName}!</p>
      <p>Game content coming soon...</p>
      <button
        onClick={onClose}
        style={{
          padding: '0.75rem 1.5rem',
          background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
          border: 'none',
          color: 'white',
          borderRadius: '50px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '600'
        }}
      >
        Back to Menu
      </button>
    </div>
  )
}
