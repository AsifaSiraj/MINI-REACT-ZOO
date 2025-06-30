import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

const defaultImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUD3JdKPk9R9EjuDyh071O7e4XRt-j2gfvYg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd9I7XhTx573nrcmOGVMi8nmCxV0S2ZNBSHg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuQkuST8nQ9yLK6ZxxK2m3P2c9W4c5WzZSEw&s",
];

function ImagePlane({ textureUrl }) {
  const ref = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(textureUrl, setTexture);
  }, [textureUrl]);

  return texture ? (
    <mesh ref={ref}>
      <planeGeometry args={[4, 4]} />
      <meshStandardMaterial map={texture} toneMapped={false} />
    </mesh>
  ) : (
    <Html center>
      <div className="text-white text-sm animate-pulse">Loading…</div>
    </Html>
  );
}

export default function Gallery3D() {
  const [images, setImages] = useState(defaultImages.map(url => ({ url, uploaded: false })));
  const [selectedImg, setSelectedImg] = useState(null);
  const [view3D, setView3D] = useState(false);
  const fileRef = useRef();

  const addImages = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      setImages((prev) => [...prev, { url, uploaded: true }]);
    });
  };

  const deleteImage = (imgUrl) => {
    setImages((prev) => prev.filter((img) => img.url !== imgUrl));
    if (selectedImg === imgUrl) setSelectedImg(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-200 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">🌸 3D Image Gallery 🌸</h2>

      <button
        onClick={() => fileRef.current.click()}
        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg shadow mb-6"
      >
        Upload Images
      </button>

      <input
        type="file"
        ref={fileRef}
        accept="image/*"
        multiple
        className="hidden"
        onChange={addImages}
      />

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative group cursor-pointer bg-white/70 backdrop-blur-lg border border-rose-200 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={img.url}
              alt={`img-${index}`}
              className="w-full h-48 object-cover"
              onClick={() => {
                setSelectedImg(img.url);
                setView3D(false);
              }}
            />
            {img.uploaded && (
              <button
                onClick={() => deleteImage(img.url)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 text-xs flex items-center justify-center shadow hover:bg-red-600 transition-opacity opacity-0 group-hover:opacity-100"
                title="Delete Image"
              >
                🗑
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
          onClick={() => setSelectedImg(null)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-2xl max-w-3xl w-[90%] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Toggle View */}
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => setView3D(false)}
                className={`px-4 py-2 rounded ${!view3D ? "bg-pink-500 text-white" : "bg-gray-200"}`}
              >
                View Normally
              </button>
              <button
                onClick={() => setView3D(true)}
                className={`px-4 py-2 rounded ${view3D ? "bg-pink-500 text-white" : "bg-gray-200"}`}
              >
                View in 3D
              </button>
            </div>

            {/* View Content */}
            {view3D ? (
              <Canvas style={{ width: "100%", height: "400px" }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 5, 5]} />
                <ImagePlane textureUrl={selectedImg} />
                <OrbitControls />
              </Canvas>
            ) : (
              <img
                src={selectedImg}
                alt="Selected"
                className="w-full h-[400px] object-contain rounded"
              />
            )}

            <p className="text-center text-gray-500 mt-2">Click outside to close</p>
          </div>
        </div>
      )}
    </div>
  );
}
