import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { CodeReviewView } from '@/components/code-review/CodeReviewView';
import { DocumentationView } from '@/components/documentation/DocumentationView';
import { SprintPlannerView } from '@/components/sprint-planner/SprintPlannerView';
import { TeamInsightsView } from '@/components/team-insights/TeamInsightsView';
import { SettingsView } from '@/components/settings/SettingsView';

const sectionTitles: Record<string, { title: string; subtitle: string }> = {
  'dashboard': { title: 'Dashboard', subtitle: 'Overview of your development activity' },
  'code-review': { title: 'Code Review', subtitle: 'AI-powered code analysis' },
  'documentation': { title: 'Documentation', subtitle: 'Auto-generate docs from code' },
  'sprint-planner': { title: 'Sprint Planner', subtitle: 'Manage tasks and sprints' },
  'team-insights': { title: 'Team Insights', subtitle: 'Performance analytics' },
  'settings': { title: 'Settings', subtitle: 'Configure your workspace' },
};

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardView />;
      case 'code-review':
        return <CodeReviewView />;
      case 'documentation':
        return <DocumentationView />;
      case 'sprint-planner':
        return <SprintPlannerView />;
      case 'team-insights':
        return <TeamInsightsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  const currentSection = sectionTitles[activeSection] || sectionTitles['dashboard'];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isCollapsed={isSidebarCollapsed}
        onCollapse={setIsSidebarCollapsed}
      />

      <div
        className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-[80px]' : 'ml-[280px]'}`}
      >
        <Header title={currentSection.title} subtitle={currentSection.subtitle} />
        <main className="min-h-[calc(100vh-64px)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
