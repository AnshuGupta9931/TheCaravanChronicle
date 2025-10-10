import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { getComplaintsGeoJSON } from "../services/operations/compAPI.jsx";

const MAPTILER_KEY = "UDLwTzlFyOZ6hc78xOpV";

const ComplaintHeatmap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      const geoData = await getComplaintsGeoJSON();
      if (!geoData || !geoData.features?.length) {
        console.error("No GeoJSON data received");
        return;
      }

      // ✅ Ensure correct coordinate order (lon, lat)
      geoData.features = geoData.features.map((f) => {
        const [lng, lat] = f.geometry.coordinates;
        if (Math.abs(lat) > Math.abs(lng)) {
          f.geometry.coordinates = [lat, lng];
        }
        return f;
      });

      // 🗺️ Initialize map if not already initialized
      if (!map.current) {
        map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
          center: [78.9629, 20.5937],
          zoom: 4,
        });

        map.current.on("load", () => {
          addComplaintLayers(geoData);
        });
      } else if (map.current.isStyleLoaded()) {
        // 🔄 If map already exists, just update the data
        if (map.current.getSource("complaints")) {
          map.current.getSource("complaints").setData(geoData);
        } else {
          addComplaintLayers(geoData);
        }
      }
    };

    const addComplaintLayers = (geoData) => {
      // 🧩 Check if source already exists
      if (!map.current.getSource("complaints")) {
        map.current.addSource("complaints", {
          type: "geojson",
          data: geoData,
        });
      }

      // 🔥 Add heatmap layer if not already present
      if (!map.current.getLayer("complaint-heatmap")) {
        map.current.addLayer({
          id: "complaint-heatmap",
          type: "heatmap",
          source: "complaints",
          maxzoom: 15,
          paint: {
            "heatmap-radius": 25,
            "heatmap-opacity": 0.4,
            "heatmap-intensity": 1.2,
          },
        });
      }

      // 🔴 Add visible circle layer
      if (!map.current.getLayer("complaint-points")) {
        map.current.addLayer({
          id: "complaint-points",
          type: "circle",
          source: "complaints",
          paint: {
            "circle-radius": 8,
            "circle-color": "#ff0000",
            "circle-stroke-width": 2,
            "circle-stroke-color": "#fff",
            "circle-opacity": 1,
          },
        });
      }

      // 🎯 Fit map to complaint area
      const coordinates = geoData.features.map((f) => f.geometry.coordinates);
      const bounds = coordinates.reduce(
        (b, coord) => b.extend(coord),
        new maplibregl.LngLatBounds(coordinates[0], coordinates[0])
      );
      map.current.fitBounds(bounds, { padding: 80, maxZoom: 12 });

      // 📍 Add explicit red markers
      geoData.features.forEach((feature) => {
        const coords = feature.geometry.coordinates;
        const { address, type, status } = feature.properties;

        const el = document.createElement("div");
        el.style.backgroundColor = "red";
        el.style.width = "14px";
        el.style.height = "14px";
        el.style.borderRadius = "50%";
        el.style.border = "2px solid white";
        el.style.boxShadow = "0 0 6px rgba(0,0,0,0.5)";

        new maplibregl.Marker(el)
          .setLngLat(coords)
          .setPopup(
            new maplibregl.Popup({ offset: 25 }).setHTML(`
              <div style="font-size:13px">
                <strong>${type}</strong><br/>
                ${address}<br/>
                <em>Status:</em> ${status}
              </div>
            `)
          )
          .addTo(map.current);
      });
    };

    initMap();

    // Cleanup on unmount
    return () => map.current && map.current.remove();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div
        ref={mapContainer}
        className="w-full h-[80vh] max-h-[700px] rounded-2xl shadow-lg overflow-hidden"
        style={{ border: "3px solid #00c389" }}
      />
    </div>
  );
};

export default ComplaintHeatmap;
