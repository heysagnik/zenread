import { NextRequest, NextResponse } from 'next/server';
import { extract } from '@extractus/article-extractor';

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  console.log('Received URL:', url);

  if (!url) {
    return NextResponse.json({ message: 'URL is required' }, { status: 400 });
  }

  // Validate URL length
  if (url.length > 2048) {
    console.error('URL is too long:', url.length);
    return NextResponse.json({ message: 'URL is too long' }, { status: 431 });
  }

  try {
    // Extract article content using @extractus/article-extractor
    const article = await extract(url);

    if (!article) {
      throw new Error('Failed to extract article');
    }

    // Standardize Output
    const standardizedOutput = {
      title: article.title || 'Untitled',
      description: article.description || '',
      author: article.author || '',
      body: article.content || '',
      images: article.image || [],
    };

    console.log('Fetched article content:', {
      title: standardizedOutput.title,
      description: standardizedOutput.description,
      author: standardizedOutput.author,
      bodyLength: standardizedOutput.body.length,
      imagesCount: standardizedOutput.images.length,
    });

    return NextResponse.json(standardizedOutput);
  } catch (error) {
    console.error('Error extracting content:', error);
    return NextResponse.json({ message: 'Failed to extract content' }, { status: 500 });
  }
}