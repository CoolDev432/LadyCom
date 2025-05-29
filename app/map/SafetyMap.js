'use client';

import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { databases, ID } from '../appwriteConf';
import 'leaflet/dist/leaflet.css';
import gsap from 'gsap';

const icons = {
  safe: new L.DivIcon({ className: 'text-green-500 text-xl', html: '🟢' }),
  unsafe: new L.DivIcon({ className: 'text-red-500 text-xl', html: '🔴' }),
  caution: new L.DivIcon({ className: 'text-yellow-500 text-xl', html: '🟡' }),
};

const SafetyMap = () => {
  const [markers, setMarkers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newMarkerPos, setNewMarkerPos] = useState(null);
  const [formData, setFormData] = useState({ type: 'safe', description: '' });
  const [error, setError] = useState('');

  const modalRef = useRef(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const res = await databases.listDocuments('SafetyMapDB', 'Markers');
        setMarkers(res.documents);
      } catch (err) {
        console.error('Error fetching markers:', err);
      }
    };
    fetchMarkers();
  }, []);

  // GSAP animation for modal
  useEffect(() => {
    if (showForm && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' }
      );
    }
  }, [showForm]);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setNewMarkerPos(e.latlng);
        setShowForm(true);
        setFormData({ type: 'safe', description: '' });
        setError('');
      },
    });
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      setError('Please enter a description.');
      return;
    }
    const newMarker = {
      lat: newMarkerPos.lat,
      lng: newMarkerPos.lng,
      type: formData.type,
      description: formData.description.trim(),
    };

    try {
      const saved = await databases.createDocument(
        'SafetyMapDB',
        'Markers',
        ID.unique(),
        newMarker
      );
      setMarkers((prev) => [...prev, saved]);
      // Animate modal out before closing
      if (modalRef.current) {
        gsap.to(modalRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.2,
          ease: 'power3.in',
          onComplete: () => {
            setShowForm(false);
            setNewMarkerPos(null);
          },
        });
      } else {
        setShowForm(false);
        setNewMarkerPos(null);
      }
    } catch (err) {
      console.error('Error saving marker:', err);
      setError('Failed to save marker. Please try again.');
    }
  };

  const handleCancel = () => {
    // Animate modal out before closing
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          setShowForm(false);
          setNewMarkerPos(null);
        },
      });
    } else {
      setShowForm(false);
      setNewMarkerPos(null);
    }
  };

  return (
    <>
      <MapContainer center={[28.61, 77.23]} zoom={13} className="h-[80vh] w-full rounded-xl z-0">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />
        {markers.map((m) => (
          <Marker key={m.$id} position={[m.lat, m.lng]} icon={icons[m.type]}>
            <Popup>
              <strong>{m.type.toUpperCase()} area</strong>
              <br />
              {m.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            ref={modalRef}
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-6 w-80 shadow-lg space-y-4 transform origin-center"
            style={{ opacity: 0, scale: 0.8 }} // initial state for GSAP fallback
          >
            <h2 className="text-xl font-semibold mb-2">Label this location</h2>

            <label className="block">
              Safety Type:
              <select
                className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="safe">Safe 🟢</option>
                <option value="unsafe">Unsafe 🔴</option>
                <option value="caution">Caution 🟡</option>
              </select>
            </label>

            <label className="block">
              Description:
              <textarea
                className="w-full border border-gray-300 rounded px-2 py-1 mt-1 resize-none"
                rows={3}
                placeholder="Add a description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </label>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SafetyMap;
