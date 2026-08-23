import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';
import { TrashIcon } from '@sanity/icons';
import { useDocumentOperation } from 'sanity';

function DeletePostAction(props) {
  const { delete: deleteOp } = useDocumentOperation(props.id, props.type);

  return {
    label: 'Delete Post',
    icon: TrashIcon,
    tone: 'critical',
    onHandle: () => {
      if (window.confirm('Are you sure you want to permanently delete this post?')) {
        deleteOp.execute();
        props.onComplete();
      }
    }
  };
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'y5ygdyls';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'Wahaj Farooq Portfolio CMS',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [structureTool()],

  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'post') {
        return [...prev, DeletePostAction];
      }
      return prev;
    }
  },

  schema: {
    types: schemaTypes
  }
});
