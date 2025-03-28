import React, { useState } from 'react';
import { MCPConfig } from '../../types/mcp';
import { ConfigService } from '../../services/configService';

interface ImportJsonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (config: MCPConfig) => void;
}

const ImportJsonDialog: React.FC<ImportJsonDialogProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [jsonText, setJsonText] = useState<string>('');
  const [parseError, setParseError] = useState<string | null>(null);
  const [parsedConfig, setParsedConfig] = useState<MCPConfig | null>(null);

  if (!isOpen) return null;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setJsonText(text);
    
    try {
      // Try to parse the JSON
      const config = ConfigService.parseConfig(text);
      setParseError(null);
      setParsedConfig(config);
    } catch (error: any) {
      setParseError(`Error parsing JSON: ${error.message}`);
      setParsedConfig(null);
    }
  };

  const handleImport = () => {
    if (parsedConfig) {
      onImport(parsedConfig);
    }
  };

  // Count the number of servers in the parsed config
  const serverCount = parsedConfig ? Object.keys(parsedConfig.mcpServers).length : 0;

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
        maxWidth: '40rem',
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
            Import Servers from JSON
          </h2>
          
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            Paste a valid MCP configuration JSON in the text area below.
          </p>
          
          <textarea
            value={jsonText}
            onChange={handleTextChange}
            placeholder={'{\n  "mcpServers": {\n    "server-id": {\n      "command": "command",\n      "args": [],\n      "env": {}\n    }\n  }\n}'}
            style={{
              width: '100%',
              height: '200px',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
              fontFamily: 'monospace',
              marginBottom: '1rem',
              resize: 'vertical'
            }}
          />
          
          {parseError && (
            <div style={{ 
              padding: '0.75rem',
              backgroundColor: '#FEE2E2',
              border: '1px solid #F87171',
              borderRadius: '0.25rem',
              color: '#B91C1C',
              marginBottom: '1rem'
            }}>
              {parseError}
            </div>
          )}
          
          {parsedConfig && !parseError && (
            <div style={{ 
              padding: '0.75rem',
              backgroundColor: '#D1FAE5',
              border: '1px solid #34D399',
              borderRadius: '0.25rem',
              color: '#065F46',
              marginBottom: '1rem'
            }}>
              Valid configuration detected with {serverCount} server{serverCount !== 1 ? 's' : ''}
            </div>
          )}
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: '0.5rem',
            marginTop: '1rem'
          }}>
            <button 
              onClick={onClose} 
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                border: '1px solid #ccc',
                background: 'none',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button 
              onClick={handleImport} 
              disabled={!parsedConfig || !!parseError}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                border: '1px solid #1a1a1a',
                backgroundColor: parsedConfig && !parseError ? '#1a1a1a' : '#ccc',
                color: 'white',
                cursor: parsedConfig && !parseError ? 'pointer' : 'not-allowed'
              }}
            >
              Import Servers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportJsonDialog; 