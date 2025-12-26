import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Download, Eye, RefreshCw, FolderOpen, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockFiles = [
  { name: 'auth.service.ts', type: 'service', documented: true },
  { name: 'UserController.ts', type: 'controller', documented: true },
  { name: 'database.utils.ts', type: 'utility', documented: false },
  { name: 'api.middleware.ts', type: 'middleware', documented: false },
  { name: 'socket.handler.ts', type: 'handler', documented: true },
];

const generatedDoc = `# Auth Service Documentation

## Overview
The \`AuthService\` provides authentication and authorization functionality for the application.

## Methods

### \`login(email: string, password: string): Promise<AuthResponse>\`
Authenticates a user with email and password credentials.

**Parameters:**
- \`email\` - User's email address
- \`password\` - User's password

**Returns:** Promise resolving to AuthResponse object

### \`logout(): Promise<void>\`
Terminates the current user session and clears authentication tokens.

### \`refreshToken(): Promise<string>\`
Refreshes the current authentication token before expiration.

## Usage Example
\`\`\`typescript
const authService = new AuthService();
const response = await authService.login('user@example.com', 'password');
\`\`\`
`;

export const DocumentationView = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState(mockFiles[0]);
  const [showPreview, setShowPreview] = useState(true);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowPreview(true);
    }, 2500);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <FileText className="w-7 h-7 text-primary" />
            Documentation Generator
          </h1>
          <p className="text-muted-foreground mt-1">
            Automatically generate documentation from your codebase
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export All
          </Button>
          <Button variant="gradient" onClick={handleGenerate} disabled={isGenerating} className="gap-2">
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Docs
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Project Files</span>
          </div>
          
          <div className="p-2 max-h-[500px] overflow-y-auto">
            {mockFiles.map((file, index) => (
              <motion.button
                key={file.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => setSelectedFile(file)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                  selectedFile.name === file.name 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-muted/50 text-foreground'
                }`}
              >
                <FileCode className="w-4 h-4" />
                <span className="text-sm font-mono flex-1 text-left truncate">{file.name}</span>
                {file.documented ? (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">
                    Documented
                  </span>
                ) : (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    Pending
                  </span>
                )}
              </motion.button>
            ))}
          </div>
          
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Documented</span>
              <span className="text-foreground font-medium">
                {mockFiles.filter(f => f.documented).length}/{mockFiles.length}
              </span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-[hsl(45,100%,60%)] transition-all"
                style={{ width: `${(mockFiles.filter(f => f.documented).length / mockFiles.length) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Documentation Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass rounded-2xl overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Preview</span>
              <span className="text-sm text-muted-foreground">— {selectedFile.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">Raw</Button>
              <Button variant="secondary" size="sm">Preview</Button>
            </div>
          </div>
          
          <div className="p-6 max-h-[500px] overflow-y-auto prose prose-invert prose-sm max-w-none">
            {showPreview ? (
              <div className="space-y-4">
                {generatedDoc.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={i} className="text-2xl font-bold text-foreground">{line.slice(2)}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={i} className="text-xl font-semibold text-foreground mt-6">{line.slice(3)}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={i} className="text-lg font-medium text-foreground mt-4 font-mono">{line.slice(4)}</h3>;
                  }
                  if (line.startsWith('```')) {
                    return null;
                  }
                  if (line.startsWith('- ')) {
                    return <li key={i} className="text-muted-foreground ml-4">{line.slice(2)}</li>;
                  }
                  if (line.startsWith('**')) {
                    return <p key={i} className="text-foreground font-medium">{line.replace(/\*\*/g, '')}</p>;
                  }
                  return line ? <p key={i} className="text-muted-foreground">{line}</p> : null;
                })}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <p>Select a file and click "Generate Docs" to create documentation</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
