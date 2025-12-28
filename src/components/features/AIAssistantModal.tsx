import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface AIAssistantModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AIAssistantModal = ({ isOpen, onClose }: AIAssistantModalProps) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: `Hi ${user?.name?.split(' ')[0] || 'there'}! I'm DevFlow AI. I can help you with your project, debug code, or plan sprints. How can I assist you today?`,
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify({ message: userMessage.content })
            });

            const data = await response.json();

            if (response.ok) {
                const botMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: data.reply,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botMessage]);
            } else {
                throw new Error(data.message || 'Failed to get response');
            }
        } catch (error) {
            console.error(error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I'm sorry, I'm having trouble connecting to the server. Please check your connection or API key.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-background border-l border-border z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-border flex items-center justify-between bg-card/50">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">DevFlow AI</h3>
                                    <p className="text-xs text-muted-foreground">Context-aware Project Assistant</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                  `}>
                                        {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </div>
                                    <div className={`
                    max-w-[80%] p-3 rounded-2xl text-sm
                    ${msg.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                                            : 'bg-muted/50 text-foreground border border-border rounded-tl-none'}
                  `}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <div className="bg-muted/50 p-3 rounded-2xl rounded-tl-none border border-border">
                                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-border bg-card/50">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about your project..."
                                    className="flex-1 h-10 px-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
