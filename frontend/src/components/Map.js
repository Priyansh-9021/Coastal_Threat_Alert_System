import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

const Map = ({ location }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapboxgl.accessToken) {
      // token missing: still render container with empty content
      console.warn("Mapbox token missing (REACT_APP_MAPBOX_TOKEN). Map will not load tiles.");
      return;
    }

    const center = [location?.lng || 69.63, location?.lat || 21.64];

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center,
        zoom: 8,
      });
    } else {
      mapRef.current.flyTo({ center, zoom: 8, essential: true });
    }

    if (markerRef.current) markerRef.current.remove();
    markerRef.current = new mapboxgl.Marker().setLngLat(center).addTo(mapRef.current);

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      // keep mapRef to preserve instance across renders
    };
  }, [location]);

  return <div ref={mapContainer} className="map" />;
};

export default Map;
