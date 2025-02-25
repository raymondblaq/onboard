import { Client } from '@notionhq/client';
import type { Documentation, Section, CodeBlock } from './types';
import { documentationData } from './documentation';

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
});

const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;

function isValidNotionKey(key: string | undefined): boolean {
  return typeof key === 'string' && key.startsWith('secret_') && key.length > 50;
}

function isValidDatabaseId(id: string | undefined): boolean {
  return typeof id === 'string' && /^[a-f0-9-]{32,}$/i.test(id);
}

export async function getDocumentation(): Promise<Documentation[]> {
  // Validate Notion credentials
  if (!isValidNotionKey(import.meta.env.VITE_NOTION_API_KEY)) {
    console.log('Invalid or missing Notion API key, using sample documentation data');
    return documentationData;
  }

  if (!isValidDatabaseId(import.meta.env.VITE_NOTION_DATABASE_ID)) {
    console.log('Invalid or missing Notion database ID, using sample documentation data');
    return documentationData;
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Title',
          direction: 'ascending',
        },
      ],
    });

    const docs = await Promise.all(
      response.results.map(async (page: any) => {
        try {
          // Get the page content (sections)
          const blocks = await notion.blocks.children.list({
            block_id: page.id,
          });

          // Process sections
          const sections: Section[] = [];
          let currentSection: Partial<Section> = {};

          for (const block of blocks.results) {
            try {
              if (block.type === 'heading_2' && block.heading_2.rich_text.length > 0) {
                if (currentSection.title) {
                  sections.push(currentSection as Section);
                }
                currentSection = {
                  title: block.heading_2.rich_text[0].plain_text,
                  content: '',
                  examples: [],
                };
              } else if (block.type === 'paragraph' && block.paragraph.rich_text.length > 0) {
                const text = block.paragraph.rich_text[0].plain_text;
                if (currentSection.title) {
                  currentSection.content = text;
                }
              } else if (block.type === 'code' && block.code.rich_text.length > 0) {
                const codeBlock: CodeBlock = {
                  language: block.code.language,
                  code: block.code.rich_text[0].plain_text,
                };
                currentSection.code = codeBlock;
              } else if (block.type === 'bulleted_list_item' && block.bulleted_list_item.rich_text.length > 0) {
                const example = block.bulleted_list_item.rich_text[0].plain_text;
                if (!currentSection.examples) {
                  currentSection.examples = [];
                }
                currentSection.examples.push(example);
              }
            } catch (blockError) {
              console.warn('Error processing block:', blockError);
              continue;
            }
          }

          if (currentSection.title) {
            sections.push(currentSection as Section);
          }

          // Handle potential missing properties gracefully
          const properties = page.properties;
          return {
            title: properties.Title?.title[0]?.plain_text || 'Untitled',
            slug: properties.Slug?.rich_text[0]?.plain_text || 
                  properties.Title?.title[0]?.plain_text?.toLowerCase().replace(/\s+/g, '-') || 
                  'untitled',
            category: properties.Category?.select?.name || 'basics',
            content: properties.Content?.rich_text[0]?.plain_text || '',
            sections: sections.length > 0 ? sections : [{
              title: 'Overview',
              content: 'No content available yet.',
              examples: []
            }],
          };
        } catch (pageError) {
          console.warn('Error processing page:', pageError);
          return null;
        }
      })
    );

    // Filter out any null results from failed page processing
    const validDocs = docs.filter((doc): doc is Documentation => doc !== null);

    if (validDocs.length === 0) {
      console.log('No valid documentation found in Notion, using sample data');
      return documentationData;
    }

    return validDocs;
  } catch (error) {
    console.error('Error fetching documentation from Notion:', error);
    console.log('Falling back to sample documentation data');
    return documentationData;
  }
}