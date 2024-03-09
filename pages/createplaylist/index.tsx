import Layout from '../../components/Layout';
import CreatePlaylist from '../../components/createplaylist';

export default function CreatePlaylistPage() {
  return (
  <Layout title={`HMusic - Create playlist`}>
    <div className="flex items-center justify-center h-full">
  <CreatePlaylist />
    </div>
  </Layout>
  );
}