import 'dotenv/config';


import {callModel} from './openrouter.ts';
import {runTui} from './tui/index.tsx';
import type {Message} from './types.ts';

async function respond(message: string): Promise<string> {
  // Build a fresh trace for this single model turn.
  const messages: Message[] = [
    {
      role: 'system',
      content:
        'You are a helpful AI coding assitant',
    },
    {role: 'user', content: message},
  ];

  // Keep this adapter test read-only by passing no tools.
  const assistant = await callModel(messages, []);
  return assistant.content ?? 'No text returned.';
}

runTui(respond);