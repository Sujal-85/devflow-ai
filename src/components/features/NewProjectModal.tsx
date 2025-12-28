import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface NewProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NewProjectModal = ({ isOpen, onClose }: NewProjectModalProps) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        techStack: '',
        status: 'planning'
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify({
                    ...formData,
                    techStack: formData.techStack.split(',').map(tag => tag.trim())
                })
            });

            if (response.ok) {
                toast.success('Project created successfully!');
                onClose();
                setFormData({ name: '', description: '', techStack: '', status: 'planning' });
            } else {
                const error = await response.json();
                toast.error(error.message || 'Failed to create project');
            }
        } catch (error) {
            toast.error('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-border flex items-center justify-between">
                                <h2 className="text-xl font-bold text-foreground">Create New Project</h2>
                                <Button variant="ghost" size="icon" onClick={onClose}>
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Project Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full h-10 px-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/50 outline-none"
                                        placeholder="e.g., E-commerce Dashboard"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Description</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full h-24 px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/50 outline-none resize-none"
                                        placeholder="What is this project about?"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Tech Stack (comma separated)</label>
                                    <input
                                        type="text"
                                        value={formData.techStack}
                                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                        className="w-full h-10 px-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/50 outline-none"
                                        placeholder="React, Node.js, TypeScript"
                                    />
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                        Create Project
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
