import React, { useState, useEffect } from 'react';
import { 
  Laptop, 
  Mail, 
  Slack, 
  Calendar, 
  Shield, 
  FileKey, 
  CheckCircle2,
  ChevronRight,
  Building2,
  X,
  Play,
  Sun,
  Moon,
  Sparkles,
  Trophy
} from 'lucide-react';
import Documentation from './pages/Documentation';

interface SubStep {
  id: number;
  instruction: string;
  completed: boolean;
}

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  expanded: boolean;
  videoUrl: string | null;
  subSteps: SubStep[];
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showDocs, setShowDocs] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 1,
      title: "Company Email Setup",
      description: "Access your new corporate email and calendar",
      icon: <Mail className="w-6 h-6" />,
      completed: false,
      expanded: false,
      videoUrl: "https://example.com/videos/onboarding-tutorial.mp4",
      subSteps: [
        { id: 1, instruction: "Open your web browser and navigate to outlook.office.com", completed: false },
        { id: 2, instruction: "Enter your company email (firstname.lastname@fintech.com)", completed: false },
        { id: 3, instruction: "Set up two-factor authentication for your email account", completed: false },
        { id: 4, instruction: "Configure your calendar timezone and working hours", completed: false }
      ]
    },
    {
      id: 2,
      title: "Workspace Access",
      description: "Set up your laptop and required software",
      icon: <Laptop className="w-6 h-6" />,
      completed: false,
      expanded: false,
      videoUrl: "https://example.com/videos/onboarding-tutorial.mp4",
      subSteps: [
        { id: 1, instruction: "Log into your laptop using your temporary credentials", completed: false },
        { id: 2, instruction: "Change your password following security guidelines", completed: false },
        { id: 3, instruction: "Install required software from the company portal", completed: false },
        { id: 4, instruction: "Set up your development environment", completed: false }
      ]
    },
    {
      id: 3,
      title: "Communication Tools",
      description: "Join Slack channels and team spaces",
      icon: <Slack className="w-6 h-6" />,
      completed: false,
      expanded: false,
      videoUrl: "https://example.com/videos/onboarding-tutorial.mp4",
      subSteps: [
        { id: 1, instruction: "Download and install Slack from slack.com", completed: false },
        { id: 2, instruction: "Sign in with your company email", completed: false },
        { id: 3, instruction: "Join the required channels (#general, #team-fintech, #announcements)", completed: false },
        { id: 4, instruction: "Set up your Slack profile with your photo and role", completed: false }
      ]
    },
    {
      id: 4,
      title: "Security Training",
      description: "Complete required security awareness training",
      icon: <Shield className="w-6 h-6" />,
      completed: false,
      expanded: false,
      videoUrl: "https://example.com/videos/onboarding-tutorial.mp4",
      subSteps: [
        { id: 1, instruction: "Access the security training portal", completed: false },
        { id: 2, instruction: "Complete the 'Information Security Basics' course", completed: false },
        { id: 3, instruction: "Take the security awareness quiz", completed: false },
        { id: 4, instruction: "Download your completion certificate", completed: false }
      ]
    },
    {
      id: 5,
      title: "Important Meetings",
      description: "Schedule onboarding meetings with your team",
      icon: <Calendar className="w-6 h-6" />,
      completed: false,
      expanded: false,
      videoUrl: "https://example.com/videos/onboarding-tutorial.mp4",
      subSteps: [
        { id: 1, instruction: "Schedule a welcome meeting with your manager", completed: false },
        { id: 2, instruction: "Book your HR onboarding session", completed: false },
        { id: 3, instruction: "Set up 1:1s with team members", completed: false },
        { id: 4, instruction: "Add team recurring meetings to your calendar", completed: false }
      ]
    },
    {
      id: 6,
      title: "Access Management",
      description: "Set up MFA and password management",
      icon: <FileKey className="w-6 h-6" />,
      completed: false,
      expanded: false,
      videoUrl: "https://example.com/videos/onboarding-tutorial.mp4",
      subSteps: [
        { id: 1, instruction: "Install the company's authenticator app", completed: false },
        { id: 2, instruction: "Set up Multi-Factor Authentication", completed: false },
        { id: 3, instruction: "Configure password manager access", completed: false },
        { id: 4, instruction: "Test all your access credentials", completed: false }
      ]
    }
  ]);

  const progress = (steps.filter(s => s.completed).length / steps.length) * 100;

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const toggleExpand = (stepId: number) => {
    setSteps(steps.map(step => 
      step.id === stepId 
        ? { ...step, expanded: !step.expanded }
        : { ...step, expanded: false }
    ));
  };

  const completeSubStep = (stepId: number, subStepId: number) => {
    setSteps(steps.map(step => {
      if (step.id === stepId) {
        const updatedSubSteps = step.subSteps.map(subStep =>
          subStep.id === subStepId ? { ...subStep, completed: !subStep.completed } : subStep
        );
        
        const allSubStepsCompleted = updatedSubSteps.every(subStep => subStep.completed);
        
        if (allSubStepsCompleted && !step.completed) {
          setShowConfetti(true);
        }
        
        return {
          ...step,
          subSteps: updatedSubSteps,
          completed: allSubStepsCompleted
        };
      }
      return step;
    }));

    const updatedSteps = steps.map(step => {
      if (step.id === stepId) {
        const allCompleted = step.subSteps.every(ss => ss.completed);
        if (allCompleted && stepId < steps.length) {
          setCurrentStep(stepId + 1);
        }
      }
      return step;
    });
  };

  return (
    <>
      <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
        <header className={`sticky top-0 z-10 backdrop-blur-md ${isDarkMode ? 'bg-black/50 border-[#1a1a1a]' : 'bg-white/50 border-gray-200'} border-b`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Building2 className="w-8 h-8 text-[#ff5101]" />
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400" />
                </div>
                <h1 className="text-xl font-semibold">FinTech Solutions</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#ff5101] to-[#ff8144] text-white">
                  <Trophy className="w-5 h-5 mr-2" />
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'hover:bg-[#333333]' 
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => setShowDocs(true)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                    isDarkMode 
                      ? 'border-[#333333] hover:bg-[#333333] text-white' 
                      : 'border-gray-300 hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  Docs
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative mb-12 rounded-2xl overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1548504773-429e84f586d2?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
            </div>
            <div className="relative py-16 px-8 text-center text-white">
              <h2 className="text-4xl font-bold mb-4">Welcome to Your New Journey</h2>
              <p className="max-w-2xl mx-auto text-gray-200">
                Let's get you set up with everything you need to succeed. Follow these steps to complete your onboarding process.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <div className={`h-2 rounded-full ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-200'}`}>
              <div 
                className="h-full bg-gradient-to-r from-[#ff5101] to-[#ff8144] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`rounded-xl border transition-all duration-300 transform hover:scale-[1.01] ${
                  step.completed 
                    ? 'border-[#ff5101] bg-gradient-to-r from-[#ff510115] to-[#ff814415]' 
                    : step.expanded
                      ? isDarkMode 
                        ? 'border-[#333333] bg-[#1a1a1a]'
                        : 'border-gray-200 bg-white'
                      : isDarkMode
                        ? 'border-[#1a1a1a] bg-[#111111]'
                        : 'border-gray-100 bg-white'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        step.completed 
                          ? 'bg-[#ff5101]' 
                          : isDarkMode 
                            ? 'bg-[#1a1a1a]'
                            : 'bg-gray-100'
                      }`}>
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {step.completed && (
                        <CheckCircle2 className="w-6 h-6 text-[#ff5101]" />
                      )}
                      <button
                        onClick={() => toggleExpand(step.id)}
                        className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-all duration-300 ${
                          step.expanded
                            ? isDarkMode 
                              ? 'bg-[#333333] text-white'
                              : 'bg-gray-100 text-gray-900'
                            : step.completed
                              ? 'bg-[#ff5101] hover:bg-[#ff5101]/90 text-white'
                              : isDarkMode
                                ? 'bg-[#1a1a1a] hover:bg-[#333333] text-gray-400 hover:text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {step.expanded ? (
                          <>
                            <X className="w-4 h-4" />
                            <span>Close</span>
                          </>
                        ) : (
                          <>
                            <span>{step.completed ? 'Review' : 'Start'}</span>
                            <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {step.expanded && (
                  <div className={`border-t p-6 ${
                    isDarkMode ? 'border-[#1a1a1a]' : 'border-gray-200'
                  }`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h4 className="text-lg font-semibold mb-4">Step-by-Step Instructions</h4>
                        <div className="space-y-4">
                          {step.subSteps.map((subStep) => (
                            <div 
                              key={subStep.id}
                              className="flex items-center space-x-4 p-3 rounded-lg transition-all duration-300"
                              style={{
                                backgroundColor: subStep.completed 
                                  ? 'rgba(255, 81, 1, 0.1)' 
                                  : 'transparent'
                              }}
                            >
                              <button
                                onClick={() => completeSubStep(step.id, subStep.id)}
                                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                                  subStep.completed 
                                    ? 'bg-[#ff5101]' 
                                    : isDarkMode
                                      ? 'bg-[#333333]'
                                      : 'bg-gray-300'
                                }`}
                              >
                                <span
                                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                                    subStep.completed ? 'translate-x-6' : 'translate-x-0'
                                  }`}
                                />
                              </button>
                              <span className={`flex-1 ${
                                subStep.completed 
                                  ? 'text-[#ff5101]' 
                                  : isDarkMode
                                    ? 'text-white'
                                    : 'text-gray-900'
                              }`}>
                                {subStep.instruction}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Tutorial Video</h4>
                        <div className={`aspect-video rounded-lg overflow-hidden relative group ${
                          isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'
                        }`}>
                          {step.videoUrl ? (
                            <video
                              src={step.videoUrl}
                              controls
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                                  isDarkMode ? 'bg-[#333333]' : 'bg-gray-200'
                                }`}>
                                  <Play className={`w-8 h-8 ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                  }`} />
                                </div>
                                <p className={`mt-4 ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                  Video tutorial coming soon
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={`mt-12 p-6 rounded-xl border ${
            isDarkMode 
              ? 'border-[#1a1a1a] bg-[#111111]'
              : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Contact IT Support at support@fintech.com or call ext. 1234
                </p>
              </div>
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#ff5101] to-[#ff8144] text-white hover:opacity-90 transition-opacity duration-300">
                Contact Support
              </button>
            </div>
          </div>
        </main>
      </div>

      {showDocs && (
        <Documentation
          isDarkMode={isDarkMode}
          onClose={() => setShowDocs(false)}
        />
      )}

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-yellow-400 animate-spin" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;