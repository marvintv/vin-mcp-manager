import React from 'react';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  serverName: string;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  serverName,
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        border: '1px solid #ccc',
        maxWidth: '28rem',
        width: '100%'
      }}>
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            marginBottom: '1rem' 
          }}>
            Delete Server
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Are you sure you want to delete the server 
            <span style={{ fontWeight: 600, padding: '0 0.25rem' }}>{serverName}</span>?
            This action cannot be undone.
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: '0.5rem'
          }}>
            <button 
              onClick={onClose} 
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                border: '1px solid #ccc',
                background: 'none'
              }}
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm} 
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                border: '1px solid #f44336',
                backgroundColor: '#f44336',
                color: 'white'
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog; 