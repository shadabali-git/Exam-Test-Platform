import React from 'react';
import { CardDescription } from '@/components/ui/card';

function YourTestComponent({ currentQuestion }:{ currentQuestion: { question_text: string } }) {
  // Define styles for code blocks
  const codeBlockStyle = {
    backgroundColor: '#1e1e1e', // Dark background for code
    color: '#d4d4d4',           // Light text color for code
    padding: '15px',
    borderRadius: '8px',
    fontFamily: 'monospace',    // Ensure monospace font for code
    whiteSpace: 'pre-wrap',     // Preserve whitespace and wrap lines
    wordBreak: 'break-word' as const,    // Break long words
    margin: '1rem 0',           // Add some margin above/below code blocks
    overflowX: 'auto' as 'auto',          // Enable horizontal scrolling for long lines
    fontSize: '0.9em',          // Slightly smaller font size
  };

  // Define style for normal paragraphs/lines
  const normalTextStyle = {
    marginBottom: '0.5rem', // Spacing between normal text lines/paragraphs
  };

  // The state to manage if we are inside a code block
  let inCodeBlock = false;
  let currentCodeContent = [];
  let language = ''; // To potentially display language, though not used for syntax highlighting here

  // Process the entire text to identify code blocks
  const processedContent = [];
  const lines = currentQuestion.question_text.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('```') && !inCodeBlock) {
      // Start of a code block
      inCodeBlock = true;
      language = line.trim().substring(3).trim(); // Extract language (e.g., 'javascript')
      currentCodeContent = []; // Reset for new code block
      continue; // Skip the fence line itself
    }

    if (line.trim() === '```' && inCodeBlock) {
      // End of a code block
      inCodeBlock = false;
      // Add the accumulated code content as a styled block
      processedContent.push(
        <pre key={`code-block-${i}`} style={codeBlockStyle}>
          {currentCodeContent.join('\n')}
        </pre>
      );
      currentCodeContent = []; // Clear for next block
      language = '';
      continue; // Skip the fence line itself
    }

    if (inCodeBlock) {
      // If we are inside a code block, accumulate lines
      currentCodeContent.push(line);
    } else {
      // If not in a code block, treat as normal text
      if (line.trim() !== '') { // Only add non-empty lines as paragraphs
        processedContent.push(
          <p key={`text-line-${i}`} style={normalTextStyle}>
            {line}
          </p>
        );
      } else {
        // Handle empty lines (potential paragraph breaks)
        processedContent.push(<br key={`empty-line-${i}`} />);
      }
    }
  }

  // Handle case where code block might be at the very end without a closing ```
  // Or if there's remaining code content if the closing fence was missing (unlikely if tutor follows rule)
  if (inCodeBlock && currentCodeContent.length > 0) {
    processedContent.push(
      <pre key={`code-block-final`} style={codeBlockStyle}>
        {currentCodeContent.join('\n')}
      </pre>
    );
  }

  return (
    <CardDescription>
      {processedContent}
    </CardDescription>
  );
}

export default YourTestComponent;