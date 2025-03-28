import React, { useState } from 'react';
import { MCPServer, EditableMCPServer } from '../../types/mcp';
import { v4 as uuidv4 } from 'uuid';

interface ServerFormProps {
  onSubmit: (server: EditableMCPServer) => void;
  onCancel: () => void;
  server?: MCPServer;
  serverId?: string;
}

const ServerForm: React.FC<ServerFormProps> = ({ onSubmit, onCancel, server, serverId }) => {
  const [formData, setFormData] = useState<EditableMCPServer>({
    id: serverId || uuidv4(),
    command: server?.command || '',
    args: server?.args || [],
    env: server?.env || {},
  });

  const [serverName, setServerName] = useState(() => {
    console.log(`Initializing server form with serverId: "${serverId || 'none'}"`);
    return serverId || '';
  });
  const [newArg, setNewArg] = useState('');
  const [newEnvKey, setNewEnvKey] = useState('');
  const [newEnvValue, setNewEnvValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Handles changes to the server name input field
   * Updates both the serverName state and the server ID
   * @param e Input change event
   */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(`Server name changed to: "${value}"`);
    
    // Update the serverName state
    setServerName(value);
    
    // Update the server ID in the form data
    setFormData(prev => {
      const updated = { ...prev, id: value || uuidv4() };
      console.log(`Updated form data ID: "${updated.id}"`);
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalFormData = { ...formData };
    // Ensure the ID is set to the server name (or fallback to UUID)
    finalFormData.id = serverName || uuidv4();
    onSubmit(finalFormData);
  };

  /**
   * Adds a new argument to the server configuration
   * Uses early return pattern for cleaner code
   */
  const addArg = () => {
    const trimmedArg = newArg.trim();
    
    if (!trimmedArg) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      args: [...prev.args, trimmedArg]
    }));
    
    setNewArg('');
  };

  /**
   * Handles keyboard events for the argument input
   * Prevents form submission and adds argument when Enter is pressed
   * @param e Keyboard event
   */
  const handleArgKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Add argument when Enter key is pressed
    if (e.key === 'Enter') {
      e.preventDefault();
      addArg();
    }
  };

  /**
   * Removes an argument from the server configuration by index
   * @param index The position of the argument to remove
   */
  const removeArg = (index: number) => {
    setFormData(prev => ({
      ...prev,
      args: prev.args.filter((_, i) => i !== index)
    }));
  };

  /**
   * Adds a new environment variable to the server configuration
   * Uses early return pattern for cleaner code
   */
  const addEnvVariable = () => {
    const trimmedKey = newEnvKey.trim();
    const trimmedValue = newEnvValue.trim();
    
    if (!trimmedKey || !trimmedValue) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      env: {
        ...prev.env,
        [trimmedKey]: trimmedValue
      }
    }));
    
    setNewEnvKey('');
    setNewEnvValue('');
  };

  /**
   * Handles keyboard events for environment variable inputs
   * Prevents form submission and adds environment variable when Enter is pressed
   * @param e Keyboard event
   */
  const handleEnvKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Add environment variable when Enter key is pressed
    if (e.key === 'Enter') {
      e.preventDefault();
      addEnvVariable();
    }
  };

  /**
   * Removes an environment variable from the server configuration by key
   * @param key The key of the environment variable to remove
   */
  const removeEnvVariable = (key: string) => {
    const newEnv = { ...formData.env };
    delete newEnv[key];
    setFormData(prev => ({
      ...prev,
      env: newEnv
    }));
  };

  const buttonStyle = {
    base: {
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      cursor: 'pointer',
      fontSize: '0.875rem'
    },
    primary: {
      backgroundColor: '#f1f1f1',
      border: '1px solid #ccc'
    },
    secondary: {
      backgroundColor: 'transparent',
      border: '1px solid #ccc'
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label 
          htmlFor="serverName" 
          style={{ 
            display: 'block', 
            fontSize: '0.875rem', 
            fontWeight: 500, 
            marginBottom: '0.25rem' 
          }}
        >
          Server Name
        </label>
        <input
          id="serverName"
          name="serverName"
          value={serverName}
          onChange={handleNameChange}
          required
          placeholder="Enter a unique name for this server"
          style={{ 
            width: '100%', 
            padding: '0.5rem', 
            border: '1px solid #ccc', 
            borderRadius: '0.25rem' 
          }}
        />
        <small style={{ 
          display: 'block', 
          marginTop: '0.25rem', 
          fontSize: '0.75rem', 
          color: '#666'
        }}>
          This name will be used as the server identifier
        </small>
      </div>

      <div>
        <label 
          htmlFor="command" 
          style={{ 
            display: 'block', 
            fontSize: '0.875rem', 
            fontWeight: 500, 
            marginBottom: '0.25rem' 
          }}
        >
          Command
        </label>
        <input
          id="command"
          name="command"
          value={formData.command}
          onChange={handleChange}
          required
          placeholder="Enter command (e.g., npm run start)"
          style={{ 
            width: '100%', 
            padding: '0.5rem', 
            border: '1px solid #ccc', 
            borderRadius: '0.25rem' 
          }}
        />
      </div>

      <div>
        <label 
          style={{ 
            display: 'block', 
            fontSize: '0.875rem', 
            fontWeight: 500, 
            marginBottom: '0.25rem' 
          }}
        >
          Arguments
        </label>
        <div style={{ display: 'flex', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
          <input
            value={newArg}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewArg(e.target.value)}
            onKeyDown={handleArgKeyPress}
            placeholder="Add an argument"
            style={{ 
              flex: 1, 
              padding: '0.5rem', 
              border: '1px solid #ccc', 
              borderRadius: '0.25rem', 
              marginRight: '0.5rem' 
            }}
          />
          <button 
            type="button" 
            onClick={addArg} 
            style={{ ...buttonStyle.base, ...buttonStyle.primary }}
          >
            Add
          </button>
        </div>
        {formData.args.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            {formData.args.map((arg, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  flex: 1, 
                  backgroundColor: '#f5f5f5', 
                  padding: '0.5rem', 
                  borderRadius: '0.25rem' 
                }}>
                  {arg}
                </div>
                <button
                  type="button"
                  onClick={() => removeArg(index)}
                  style={{ 
                    background: 'none',
                    border: 'none',
                    padding: '0.25rem 0.5rem',
                    marginLeft: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label 
          style={{ 
            display: 'block', 
            fontSize: '0.875rem', 
            fontWeight: 500, 
            marginBottom: '0.25rem' 
          }}
        >
          Environment Variables
        </label>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '0.5rem', 
          marginTop: '0.25rem', 
          marginBottom: '0.5rem' 
        }}>
          <input
            value={newEnvKey}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewEnvKey(e.target.value)}
            onKeyDown={handleEnvKeyPress}
            placeholder="Key"
            style={{ 
              padding: '0.5rem', 
              border: '1px solid #ccc', 
              borderRadius: '0.25rem' 
            }}
          />
          <input
            value={newEnvValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewEnvValue(e.target.value)}
            onKeyDown={handleEnvKeyPress}
            placeholder="Value"
            style={{ 
              padding: '0.5rem', 
              border: '1px solid #ccc', 
              borderRadius: '0.25rem' 
            }}
          />
        </div>
        <button 
          type="button" 
          onClick={addEnvVariable} 
          style={{ 
            ...buttonStyle.base, 
            ...buttonStyle.primary,
            marginTop: '0.25rem' 
          }}
        >
          Add Variable
        </button>
        
        {Object.keys(formData.env).length > 0 && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem', 
            marginTop: '0.5rem' 
          }}>
            {Object.entries(formData.env).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  flex: 1, 
                  backgroundColor: '#f5f5f5', 
                  padding: '0.5rem', 
                  borderRadius: '0.25rem' 
                }}>
                  <span style={{ fontWeight: 600 }}>{key}</span>: {value}
                </div>
                <button
                  type="button"
                  onClick={() => removeEnvVariable(key)}
                  style={{ 
                    background: 'none',
                    border: 'none',
                    padding: '0.25rem 0.5rem',
                    marginLeft: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        gap: '0.5rem', 
        paddingTop: '1rem' 
      }}>
        <button 
          type="button" 
          onClick={onCancel} 
          style={{ ...buttonStyle.base, ...buttonStyle.secondary }}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          style={{ 
            ...buttonStyle.base, 
            backgroundColor: '#1a1a1a', 
            border: '1px solid #1a1a1a',
            color: 'white'
          }}
        >
          {server ? 'Update' : 'Add'} Server
        </button>
      </div>
    </form>
  );
};

export default ServerForm; 