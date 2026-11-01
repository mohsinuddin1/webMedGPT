import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const allPosts = await getCollection('blog');
  const posts = allPosts
    .filter(post => post.id.startsWith('en/'))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'MedGPT Health Blog — AI-Powered Health Insights',
    description: 'Expert health guides, medical report tips, and medication safety information from MedGPT. Learn how to read blood tests, understand side effects, and make informed health decisions.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id.replace('en/', '')}`,
      categories: post.data.tags,
      author: post.data.author || 'MedGPT Team',
    })),
    customData: `<language>en-us</language>
<copyright>© 2026 PureScan AI. All rights reserved.</copyright>
<managingEditor>contact@droploop.in (PureScan AI)</managingEditor>
<webMaster>contact@droploop.in (PureScan AI)</webMaster>
<image>
  <url>https://medgptai.droploop.in/appLogo.png</url>
  <title>MedGPT Health Blog</title>
  <link>https://medgptai.droploop.in/blog</link>
</image>`,
  });
}
