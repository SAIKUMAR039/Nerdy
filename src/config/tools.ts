import { Tool } from '../types';

export const tools: Tool[] = [
  {
    id: 'code-analyzer',
    name: 'Code Complexity Analyzer',
    description: 'Analyze code complexity and suggest improvements',
    icon: 'Code2',
    promptTemplate: 'Analyze this {language} code for complexity and provide detailed feedback:\n\n{code}\n\nFocus on:\n- Time complexity analysis\n- Space complexity analysis\n- Performance bottlenecks\n- Optimization suggestions\n- Code quality improvements\n\nProvide the analysis in a structured format with clear sections and practical recommendations.'
  },
  {
    id: 'algorithm-optimizer',
    name: 'Algorithm Optimizer',
    description: 'Get optimization suggestions for algorithms',
    icon: 'Cpu',
    promptTemplate: 'Review this algorithm implemented in {language}:\n\n{code}\n\nProvide optimization suggestions focusing on:\n- Current time complexity: {current_complexity}\n- Target complexity: {target_complexity}\n- Memory usage optimization\n- Edge cases handling\n- Performance improvements\n\nInclude code examples for the suggested optimizations.'
  },
  {
    id: 'code-refactor',
    name: 'Code Refactoring Assistant',
    description: 'Get suggestions for code refactoring and improvements',
    icon: 'FileCode2',
    promptTemplate: 'Analyze this {language} code for potential refactoring:\n\n{code}\n\nConsider these aspects:\n- Code organization\n- Design patterns\n- Best practices\n- Maintainability\n- Readability\n\nProvide specific refactoring suggestions with before/after code examples.'
  },
  {
    id: 'tweets',
    name: 'AI Tweet Generator',
    description: 'Create engaging tweets that grab attention',
    icon: 'Twitter',
    promptTemplate: 'Write a compelling and engaging tweet about {topic} that would resonate with {audience}. Use a {tone} tone, include {emoji_count} relevant emojis, and incorporate trending elements. The tweet should drive {goal} and stay within Twitter\'s character limit. Add a strong call-to-action.'
  },
  {
    id: 'hashtags',
    name: 'AI Hashtag Generator',
    description: 'Generate relevant hashtags for your content',
    icon: 'Hash',
    promptTemplate: 'Generate {count} highly effective and trending hashtags for content about {topic} specifically for {platform}. Include a mix of popular ({followers}+ followers) and niche hashtags. Focus on {industry} industry and {engagement_type} engagement. Avoid banned or spammy hashtags.'
  },
  {
    id: 'linkedin',
    name: 'AI LinkedIn Post',
    description: 'Create professional LinkedIn posts',
    icon: 'Linkedin',
    promptTemplate: 'Write a professional LinkedIn post about {topic} that demonstrates expertise in {field}. The post should be written in a {tone} tone, include personal insights, and showcase thought leadership. Target {industry} professionals, include relevant statistics or case studies, and end with a compelling call-to-action to {goal}. Format with appropriate line breaks and emojis for better readability.'
  },
  {
    id: 'email',
    name: 'AI Email Composer',
    description: 'Draft professional emails quickly',
    icon: 'Mail',
    promptTemplate: 'Compose a {type} email to {recipient} regarding {subject}. Use a {tone} tone appropriate for {relationship} communication. The email should {goal} and maintain professional etiquette. Include a clear subject line, greeting, body with {key_points} main points, and appropriate closing.'
  },
  {
    id: 'study-notes',
    name: 'AI Study Notes',
    description: 'Generate concise study notes on any topic',
    icon: 'BookOpen',
    promptTemplate: 'Create comprehensive study notes about {topic} at a {level} academic level. Include key concepts, definitions, examples, and mnemonics. Structure the content with clear headings, bullet points, and {focus_areas} key focus areas. Add review questions and summary points. Use {learning_style} learning approach.'
  },
  {
    id: 'meeting-summary',
    name: 'Meeting Summarizer',
    description: 'Convert meeting transcripts into actionable summaries',
    icon: 'FileText',
    promptTemplate: 'Transform this {meeting_type} meeting transcript into a structured summary. Extract key decisions, action items, and responsibilities. Identify {priority_level} priority tasks, deadlines, and assignees. Format with clear sections for: Overview, Key Discussions, Decisions Made, Action Items (with owners and deadlines), and Next Steps.'
  },
  {
    id: 'cover-letter',
    name: 'Cover Letter Generator',
    description: 'Create personalized cover letters',
    icon: 'PenSquare',
    promptTemplate: 'Write a compelling cover letter for a {position} position at {company}. Highlight expertise in {skills} and demonstrate understanding of {company_values}. Include specific achievements that align with the role requirements. Maintain a {tone} tone while showing genuine interest and cultural fit. Address key qualifications from the job description.'
  },
  {
    id: 'chat-response',
    name: 'Chat Response Helper',
    description: 'Draft professional chat responses',
    icon: 'MessageSquare',
    promptTemplate: 'Craft a professional response to this chat message: "{message}". Use a {tone} tone suitable for {context} communication. Address all points raised, maintain appropriate formality for {platform}, and ensure clarity. Include {elements} in the response while keeping it concise and effective.'
  },
  {
    id: 'business-idea',
    name: 'Business Idea Generator',
    description: 'Generate innovative business ideas',
    icon: 'Briefcase',
    promptTemplate: 'Generate an innovative business idea in the {industry} industry that solves {problem}. Consider market trends, target audience ({demographic}), and potential revenue streams. Include unique value proposition, initial setup requirements, and competitive advantages. Address market gaps and scalability potential. Suggest {monetization_strategy} monetization strategies.'
  }
];