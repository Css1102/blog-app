import OpenAI from 'openai'
import env from 'dotenv'
const openai=new OpenAI({apiKey: String(import.meta.env.VITE_OPENAI_API_KEY),dangerouslyAllowBrowser: true})
const tags = [
  "Trading: buying and selling financial instruments",
  "ETF: exchange-traded funds, diversified baskets of securities",
  "Mutual Funds: pooled investment vehicles managed by professionals",
  "IPO: initial public offering of a company’s shares",
  "Stocks: equity shares representing ownership",
  "Business: corporate operations, entrepreneurship, management",
  "Personal Finance: budgeting, saving, investing for individuals"
];
const getEmbeddings=async(blogText)=>{
const response=await openai.embeddings.create({
model:'text-embedding-ada-002',
input:blogText,
})
console.log(response.data)
return response.data[0].embedding
}
let tagEmbeddingsCache = null;

async function getTagEmbeddings() {
  if (tagEmbeddingsCache) return tagEmbeddingsCache;
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: tags,
  });
  tagEmbeddingsCache = response.data.map(r => r.embedding);
  return tagEmbeddingsCache;
}
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '');
}

function cosineSimilarity(a,b){
const dot=a.reduce((sum,val,i)=>sum+val*b[i],0)
const normA=Math.sqrt(a.reduce((sum,val)=>sum+val*val,0))
const normB=Math.sqrt(b.reduce((sum,val)=>sum+val*val,0))
return dot/(normA*normB);
}

export async function classifyTag(blogContent){
const blogContentText=stripHtml(blogContent);
const blogEmbedding=await getEmbeddings(blogContentText);
const tagEmbeddings=await getTagEmbeddings()

const scores=tagEmbeddings.map((tagVec,i)=>({
tag:tags[i],
score:cosineSimilarity(blogEmbedding,tagVec),
}))
  return scores.sort((a, b) => b.score - a.score)[0].tag.split(':')[0];
}
