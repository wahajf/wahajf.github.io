import StudioClient from './StudioClient';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  return <StudioClient />;
}
