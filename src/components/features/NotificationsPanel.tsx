import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Info, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
    _id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    createdAt: string;
}

interface NotificationsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    anchorRef: React.RefObject<HTMLButtonElement>;
}

// Dummy data for now - intended to be replaced by backend fetch
const DUMMY_NOTIFICATIONS: Notification[] = [
    { _id: '1', title: 'Welcome!', message: 'Welcome to DevFlow AI v1.0', type: 'success', read: false, createdAt: new Date().toISOString() },
    { _id: '2', title: 'System Update', message: 'Maintenance scheduled for tonight.', type: 'info', read: false, createdAt: new Date().toISOString() }
];

export const NotificationsPanel = ({ isOpen, onClose, anchorRef }: NotificationsPanelProps) => {

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <Check className="w-4 h-4 text-success" />;
            case 'warning': return <AlertTriangle className="w-4 h-4 text-warning" />;
            case 'error': return <XCircle className="w-4 h-4 text-destructive" />;
            default: return <Info className="w-4 h-4 text-info" />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={onClose} />
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        style={{
                            top: anchorRef.current ? anchorRef.current.getBoundingClientRect().bottom + 10 : 80,
                            right: anchorRef.current ? window.innerWidth - anchorRef.current.getBoundingClientRect().right : 24
                        }}
                        className="fixed w-80 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                        <div className="p-4 border-b border-border flex justify-between items-center">
                            <h3 className="font-semibold text-foreground">Notifications</h3>
                            <Button variant="ghost" size="xs" className="text-xs">Mark all read</Button>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                            {DUMMY_NOTIFICATIONS.length > 0 ? (
                                DUMMY_NOTIFICATIONS.map((notif) => (
                                    <div key={notif._id} className="p-4 border-b border-border hover:bg-muted/50 transition-colors cursor-pointer flex gap-3">
                                        <div className="mt-1">
                                            {getIcon(notif.type)}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-foreground">{notif.title}</h4>
                                            <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                                            <p className="text-[10px] text-muted-foreground mt-2 opacity-70">
                                                {new Date(notif.createdAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-muted-foreground text-sm">
                                    No new notifications
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
