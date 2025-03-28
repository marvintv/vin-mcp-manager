import React from 'react';
import { MCPServer, EditableMCPServer } from '../../types/mcp';
import ServerForm from './ServerForm';

interface ServerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (server: EditableMCPServer) => void;
  server?: MCPServer;
  serverId?: string;
  title: string;
}

const ServerDialog: React.FC<ServerDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  server,
  serverId,
  title,
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
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            marginBottom: '1rem', 
            paddingBottom: '0.5rem', 
            borderBottom: '1px solid #eee' 
          }}>
            {title}
          </h2>
          
          {/* Note about editing the server name */}
          {server && (
            <p style={{ 
              fontSize: '0.875rem',
              color: '#666',
              marginBottom: '1rem'
            }}>
              You can change the server identifier by updating the Server Name field.
            </p>
          )}
          
          <ServerForm
            server={server}
            serverId={serverId}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ServerDialog; 



