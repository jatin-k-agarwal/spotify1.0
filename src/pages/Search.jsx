import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { songsData, albumsData, assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const { playWithId } = useContext(PlayerContext);

  // Define available genres
  const genres = ['All', 'Pop', 'Hip-Hop', 'Rock', 'Electronic', 'Jazz'];

  // Filter songs based on genre and search term
  const filteredSongs = songsData.filter((song) => {
    const matchesGenre = selectedGenre === 'All' || song.genre === selectedGenre;
    const matchesSearch = song.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <>
      <Navbar />

      <div className="p-6 text-white">
        <h1 className="text-3xl font-bold mb-6">Search Songs</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search songs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-6 rounded bg-[#121212] text-white outline-none border border-[#333]"
        />

        {/* Genre Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-1 rounded-full border transition-all duration-200 ${
                selectedGenre === genre
                  ? 'bg-white text-black font-semibold'
                  : 'bg-black text-white border-[#333]'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Header Row */}
        {filteredSongs.length > 0 && (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 mb-4 pl-2 text-[#a7a7a7]">
              <p><b className="mr-4">#</b>Title</p>
              <p>Album</p>
              <p className="hidden sm:block">Date Added</p>
              <img className="m-auto w-4" src={assets.clock_icon} alt="duration" />
            </div>
            <hr className="border-[#2a2a2a]" />
          </>
        )}

        {/* Song Results */}
        {filteredSongs.length > 0 ? (
          filteredSongs.map((item, index) => {
            const albumName = albumsData.find((album) =>
              album.songs?.includes(item.id)
            )?.name || 'Unknown Album';

            return (
              <div
                key={item.id}
                onClick={() => playWithId(item.id)}
                className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer rounded"
              >
                <p className="text-white">
                  <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                  <img className="inline w-10 mr-5 rounded" src={item.image} alt={item.name} />
                  {item.name}
                  <span className="block text-xs italic text-gray-400 ml-14 sm:ml-0">{item.genre}</span>
                </p>
                <p className="text-[15px]">{albumName}</p>
                <p className="text-[15px] hidden sm:block">Just now</p>
                <p className="text-[15px] text-center">{item.duration || '3:45'}</p>
              </div>
            );
          })
        ) : (
          <p className="text-[#888] text-center text-lg mt-10">No songs found.</p>
        )}
      </div>
    </>
  );
};

export default Search;
