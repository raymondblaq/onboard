import type { Documentation } from './types';

export const documentationData: Documentation[] = [
  {
    title: 'Getting Started',
    slug: 'getting-started',
    category: 'basics',
    content: 'Welcome to our comprehensive documentation. This guide will help you understand the core concepts and get started with our platform quickly and efficiently.',
    sections: [
      {
        title: 'Quick Start Guide',
        content: 'Follow these steps to get started with our platform. We\'ll walk you through the basic setup and configuration.',
        code: {
          language: 'javascript',
          code: `// Initialize the application
const app = createApp({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Start the service
app.start();`
        },
        examples: [
          'Basic configuration example',
          'Simple integration demo'
        ]
      },
      {
        title: 'Core Concepts',
        content: 'Understanding the fundamental concepts is crucial for making the most of our platform.',
        examples: [
          'Authentication flow',
          'Data management',
          'API integration'
        ]
      }
    ]
  },
  {
    title: 'Authentication',
    slug: 'authentication',
    category: 'security',
    content: 'Learn about our secure authentication system and how to implement it in your application.',
    sections: [
      {
        title: 'Setting Up Authentication',
        content: 'Implement secure user authentication with our built-in authentication system.',
        code: {
          language: 'typescript',
          code: `import { auth } from '@platform/auth';

const authenticate = async (credentials) => {
  try {
    const user = await auth.signIn(credentials);
    return user;
  } catch (error) {
    console.error('Authentication failed:', error);
  }
};`
        }
      },
      {
        title: 'Security Best Practices',
        content: 'Follow these security guidelines to ensure your application remains secure.',
        examples: [
          'Two-factor authentication setup',
          'Password policies',
          'Session management'
        ]
      }
    ]
  },
  {
    title: 'API Reference',
    slug: 'api-reference',
    category: 'api',
    content: 'Complete API documentation with examples and use cases.',
    sections: [
      {
        title: 'REST API Endpoints',
        content: 'Detailed information about available API endpoints and their usage.',
        code: {
          language: 'bash',
          code: `# Get user data
curl -X GET https://api.example.com/users/:id \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"`
        }
      },
      {
        title: 'Rate Limiting',
        content: 'Understanding API rate limits and best practices for handling them.',
        examples: [
          'Rate limit headers',
          'Handling rate limit errors',
          'Implementing backoff strategies'
        ]
      }
    ]
  }
];