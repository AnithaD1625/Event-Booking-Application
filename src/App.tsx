import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import EventCard from './components/EventCard';
import EventDetails from './components/EventDetails';
import EventFilters from './components/EventFilters';
import Footer from './components/Footer';
import { events } from './data/events';
import { Event } from './types/Event';

function App() {
  const [currentView, setCurrentView] = useState<string>('events');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const categories = useMemo(() => {
    return Array.from(new Set(events.map(event => event.category))).sort();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = !selectedCategory || event.category === selectedCategory;
      const matchesPrice = event.price >= priceRange[0] && event.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, priceRange]);

  const selectedEvent = selectedEventId ? events.find(event => event.id === selectedEventId) : null;

  const handleViewDetails = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentView('details');
  };

  const handleBackToEvents = () => {
    setSelectedEventId(null);
    setCurrentView('events');
  };

  const renderEventsByCategory = () => {
    const categorizedEvents = categories.reduce((acc, category) => {
      acc[category] = events.filter(event => event.category === category);
      return acc;
    }, {} as Record<string, Event[]>);

    return (
      <div className="space-y-12">
        {categories.map(category => (
          <div key={category}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorizedEvents[category].slice(0, 3).map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (currentView === 'details' && selectedEvent) {
    return <EventDetails event={selectedEvent} onBack={handleBackToEvents} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'events' && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Discover Amazing <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Events</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From tech conferences to culinary workshops, find the perfect event that matches your interests and create unforgettable memories.
              </p>
            </div>

            <EventFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />

            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or browse all events.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {currentView === 'categories' && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Browse by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Category</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore events organized by category to find exactly what you're looking for.
              </p>
            </div>

            {renderEventsByCategory()}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
