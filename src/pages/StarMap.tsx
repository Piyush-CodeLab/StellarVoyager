import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Camera, ArrowLeft } from "lucide-react";
import Link from "@/components/Link";
import StarMapCanvas from "@/components/StarMapCanvas";
import { starData, constellationData } from "@/data/celestialData";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import ProtectedRoute from "@/components/ProtectedRoute";

const StarMap = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedObject, setSelectedObject] = useState(null);
  const [filteredStars, setFilteredStars] = useState(starData);
  const [isARMode, setIsARMode] = useState(false);
  const [locationError, setLocationError] = useState('');
  const { user } = useAuth();

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          console.log('Location obtained:', position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Location error:', error);
          setLocationError('Unable to get location. Using default view.');
          // Default to a mid-latitude location
          setLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    } else {
      setLocationError('Geolocation not supported');
      setLocation({ lat: 40.7128, lng: -74.0060 });
    }
  }, []);

  // Filter stars based on search
  useEffect(() => {
    if (searchTerm) {
      const filtered = starData.filter(star => 
        star.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStars(filtered);
    } else {
      setFilteredStars(starData);
    }
  }, [searchTerm]);

  const handleStarClick = async (star) => {
    setSelectedObject(star);
    
    if (!user) return;

    // Save to Supabase
    try {
      const { error } = await supabase
        .from('observations')
        .insert({
          user_id: user.id,
          name: star.name,
          type: 'star',
          magnitude: star.magnitude,
          distance: star.distance,
          ra: star.ra,
          dec: star.dec,
          description: star.description,
        });

      if (error) {
        console.error('Error saving observation:', error);
        toast({
          title: "Error",
          description: "Failed to save observation",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Observation Saved",
          description: `${star.name} has been added to your observation history`,
        });
      }
    } catch (error) {
      console.error('Error saving observation:', error);
    }
    
    console.log('Star clicked:', star.name);
  };

  const toggleARMode = () => {
    setIsARMode(!isARMode);
    console.log('AR Mode toggled:', !isARMode);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] to-[#0F0F1F] relative">
        {/* Starry background */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(200)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <nav className="relative z-10 p-4 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-[#00B7EB] transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-orbitron">Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-white font-orbitron">Interactive Star Map</h1>
            <div className="flex items-center space-x-4">
              {location.lat && (
                <div className="flex items-center text-sm text-gray-300">
                  <MapPin className="h-4 w-4 mr-1" />
                  {location.lat.toFixed(2)}°, {location.lng.toFixed(2)}°
                </div>
              )}
              <Button
                onClick={toggleARMode}
                className={`${isARMode ? 'bg-[#6B5B95]' : 'bg-black/30'} border border-[#00B7EB] hover:bg-[#00B7EB]/20`}
              >
                <Camera className="h-4 w-4 mr-2" />
                AR View
              </Button>
            </div>
          </div>
        </nav>

        <div className="relative z-10 p-6">
          <div className="max-w-7xl mx-auto">
            {locationError && (
              <div className="mb-4 p-3 bg-yellow-900/50 border border-yellow-500 rounded text-yellow-200 text-sm">
                {locationError}
              </div>
            )}

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search celestial objects (e.g., Sirius, Orion)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black/30 border-[#6B5B95] text-white placeholder-gray-400 focus:border-[#00B7EB] rounded-full"
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              {/* Star Map Canvas */}
              <div className="lg:col-span-3">
                <Card className="bg-black/40 border-[#6B5B95] backdrop-blur-sm h-[600px]">
                  <CardContent className="p-0 h-full">
                    <StarMapCanvas
                      stars={filteredStars}
                      constellations={constellationData}
                      onStarClick={handleStarClick}
                      userLocation={location}
                      isARMode={isARMode}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Object Details Panel */}
              <div className="space-y-4">
                {selectedObject ? (
                  <Card className="bg-black/40 border-[#6B5B95] backdrop-blur-sm border-2 shadow-lg shadow-[#6B5B95]/20">
                    <CardHeader>
                      <CardTitle className="text-white font-orbitron text-xl">
                        {selectedObject.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-300 space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-[#00B7EB] font-semibold">Magnitude:</span>
                          <div>{selectedObject.magnitude}</div>
                        </div>
                        <div>
                          <span className="text-[#00B7EB] font-semibold">Distance:</span>
                          <div>{selectedObject.distance} ly</div>
                        </div>
                        <div>
                          <span className="text-[#00B7EB] font-semibold">RA:</span>
                          <div>{selectedObject.ra}°</div>
                        </div>
                        <div>
                          <span className="text-[#00B7EB] font-semibold">Dec:</span>
                          <div>{selectedObject.dec}°</div>
                        </div>
                      </div>
                      <div>
                        <span className="text-[#00B7EB] font-semibold block mb-2">Description:</span>
                        <p className="text-sm leading-relaxed">{selectedObject.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-black/40 border-[#6B5B95] backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="text-gray-400 mb-4">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#6B5B95]/20 flex items-center justify-center">
                          <Search className="h-8 w-8" />
                        </div>
                        <p>Click on a star or constellation to learn more about it!</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Search Results */}
                {searchTerm && (
                  <Card className="bg-black/40 border-[#6B5B95] backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white font-orbitron text-lg">
                        Search Results ({filteredStars.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-48 overflow-y-auto">
                      {filteredStars.map((star, index) => (
                        <button
                          key={index}
                          onClick={() => handleStarClick(star)}
                          className="w-full text-left p-2 hover:bg-[#6B5B95]/20 rounded text-white text-sm"
                        >
                          {star.name} - Mag: {star.magnitude}
                        </button>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default StarMap;
