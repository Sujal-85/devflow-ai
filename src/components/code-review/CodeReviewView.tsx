import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Copy, Check, Sparkles, Code2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sampleCode = `function fetchUserData(userId) {
  return fetch('/api/users/' + userId)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return data;
    });
}`;

import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

// ... (sampleCode remains)

interface ReviewIssue {
  type: 'warning' | 'info' | 'suggestion' | 'critical' | 'success';
  line: number;
  message: string;
  suggestion: string;
}

interface ReviewResult {
  score: number;
  issues: ReviewIssue[];
}

export const CodeReviewView = () => {
  const { user } = useAuth();
  const [code, setCode] = useState(sampleCode);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [reviewResult, setReviewResult] = useState<ReviewResult>({ score: 0, issues: [] });
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setShowResults(false);

    try {
      const response = await fetch('http://localhost:5000/api/codereview/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify({ code })
      });

      const data = await response.json();

      if (response.ok) {
        setReviewResult(data);
        setShowResults(true);
        toast.success('Code analysis complete!');
      } else {
        toast.error(data.message || 'Analysis failed');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <Code2 className="w-7 h-7 text-primary" />
            AI Code Review
          </h1>
          <p className="text-muted-foreground mt-1">
            Get instant AI-powered code analysis and suggestions
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <span className="text-sm text-muted-foreground ml-2">code-input.js</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-80 p-4 bg-transparent font-mono text-sm text-foreground resize-none focus:outline-none"
              placeholder="Paste your code here..."
              spellCheck={false}
            />
            <div className="absolute left-0 top-0 p-4 pointer-events-none select-none">
              {code.split('\n').map((_, i) => (
                <div key={i} className="text-sm text-muted-foreground/50 font-mono leading-[1.7]">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 py-3 border-t border-border flex justify-end">
            <Button
              variant="gradient"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="gap-2"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze Code
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Analysis Results</span>
            {showResults && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Score:</span>
                <span className={cn(
                  "text-lg font-bold",
                  reviewResult.score >= 80 ? "text-success" :
                    reviewResult.score >= 60 ? "text-warning" : "text-destructive"
                )}>
                  {reviewResult.score}/100
                </span>
              </div>
            )}
          </div>

          <div className="p-4 space-y-4 h-[380px] overflow-y-auto">
            {showResults ? (
              reviewResult.issues.map((issue, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={cn(
                    "p-4 rounded-xl border",
                    issue.type === 'warning' && "bg-warning/5 border-warning/20",
                    issue.type === 'info' && "bg-info/5 border-info/20",
                    issue.type === 'suggestion' && "bg-primary/5 border-primary/20",
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full",
                          issue.type === 'warning' && "bg-warning/20 text-warning",
                          issue.type === 'info' && "bg-info/20 text-info",
                          issue.type === 'suggestion' && "bg-primary/20 text-primary",
                        )}>
                          {issue.type.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Line {issue.line}
                        </span>
                      </div>
                      <p className="text-sm text-foreground mt-2">{issue.message}</p>
                    </div>
                  </div>
                  <div className="mt-3 p-2 rounded-lg bg-card font-mono text-xs text-muted-foreground">
                    💡 {issue.suggestion}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <p>Paste code and click "Analyze" to get AI-powered review</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
