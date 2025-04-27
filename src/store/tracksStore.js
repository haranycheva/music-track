import { create } from 'zustand';

const useTrackStore = create(set => ({
  tracks: null,
  loading: true,
  setTracks: (tracks) => set({tracks}),
  setLoading: (loading) => set({loading})
}));

export default useTrackStore;
