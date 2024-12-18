import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  SectionList, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Modal, 
  ActivityIndicator,
  RefreshControl,
  Switch 
} from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';

// Interfaces for TypeScript
interface Stock {
  code: string;
  lastValue: number;
  trend: 'up' | 'down' | 'neutral';
}

interface StockSection {
  title: string;
  data: Stock[];
}

const StockScreen: React.FC = () => {
  // State management
  const [sections, setSections] = useState<StockSection[]>([
    { title: 'Ações na Bolsa', data: [] }
  ]);
  const [newSectionName, setNewSectionName] = useState('');
  const [selectedSection, setSelectedSection] = useState('Todas');
  const [sectionSortDescending, setSectionSortDescending] = useState(false);
  const [stockSortDescending, setStockSortDescending] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal state for adding stocks
  const [isAddStockModalVisible, setIsAddStockModalVisible] = useState(false);
  const [stockSearchQuery, setStockSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [currentSectionForAddingStock, setCurrentSectionForAddingStock] = useState('');

  // Section Management
  const addSection = () => {
    if (newSectionName.trim()) {
      setSections(prevSections => [
        ...prevSections, 
        { title: newSectionName.trim(), data: [] }
      ]);
      setNewSectionName('');
    }
  };

  const removeSection = (sectionTitle: string) => {
    setSections(prevSections => 
      prevSections.filter(section => section.title !== sectionTitle)
    );
  };

  // Stock Management
  const addStockToSection = (stock: Stock, sectionTitle: string) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.title === sectionTitle 
          ? { ...section, data: [...section.data, stock] }
          : section
      )
    );
    setIsAddStockModalVisible(false);
  };

  const removeStockFromSection = (stock: Stock, sectionTitle: string) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.title === sectionTitle
          ? { 
              ...section, 
              data: section.data.filter(s => s.code !== stock.code) 
            }
          : section
      )
    );
  };

  // Search Stock
  const searchStock = async () => {
    setIsSearching(true);
    try {
      // Simulated backend search - replace with actual API call
      const result = {
        code: stockSearchQuery.toUpperCase(),
        lastValue: Math.random() * 100,
        trend: ['up', 'down', 'neutral'][Math.floor(Math.random() * 3)] as Stock['trend']
      };
      setSearchResults([result]);
    } catch (error) {
      console.error('Stock search error', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Refresh Stocks
  const refreshStocks = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Update stocks with latest values
      setSections(prevSections => 
        prevSections.map(section => ({
          ...section,
          data: section.data.map(stock => ({
            ...stock,
            lastValue: Math.random() * 100,
            trend: ['up', 'down', 'neutral'][Math.floor(Math.random() * 3)] as Stock['trend']
          }))
        }))
      );
    } catch (error) {
      console.error('Refresh stocks error', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Filtering and Sorting
  const filteredAndSortedSections = () => {
    let processedSections = selectedSection === 'Todas' 
      ? sections 
      : sections.filter(section => section.title === selectedSection);

    // Sort sections
    processedSections.sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sectionSortDescending ? -comparison : comparison;
    });

    // Sort stocks within sections
    return processedSections.map(section => ({
      ...section,
      data: section.data.sort((a, b) => {
        const comparison = a.code.localeCompare(b.code);
        return stockSortDescending ? -comparison : comparison;
      })
    }));
  };

  // Render Stock Item
  const renderStockItem = ({ item, section }: { item: Stock, section: StockSection }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      <Text>{item.code}</Text>
      <Text>{item.lastValue.toFixed(2)}</Text>
      <Text 
        style={{ 
          color: 
            item.trend === 'up' ? 'green' : 
            item.trend === 'down' ? 'red' : 'blue' 
        }}
      >
        {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '―'}
      </Text>
    </View>
  );

  // Render Section Header
  const renderSectionHeader = ({ section: { title } }: { section: StockSection }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      <Text>{title}</Text>
      <TouchableOpacity onPress={() => removeSection(title)}>
        <Text>🗑️</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setCurrentSectionForAddingStock(title);
        setIsAddStockModalVisible(true);
      }}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      {/* Section Name Input */}
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          placeholder="Nome da Seção"
          value={newSectionName}
          onChangeText={setNewSectionName}
        />
        <TouchableOpacity onPress={addSection}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Dropdown (Simplified) */}

      <View>
        <Text>Seção:</Text>
        <TouchableOpacity>
          <Text>{selectedSection}</Text>
        </TouchableOpacity>
      </View>

      {/* Sorting Switches */}
      <View>
        <Text>Ordenar Seções DESC</Text>
        <Switch 
          value={sectionSortDescending}
          onValueChange={setSectionSortDescending}
        />
        <Text>Ordenar Ações DESC</Text>
        <Switch 
          value={stockSortDescending}
          onValueChange={setStockSortDescending}
        />
      </View>

      {/* Stock List */}
      <SectionList
        sections={filteredAndSortedSections()}
        keyExtractor={(item) => item.code}
        renderItem={renderStockItem}
        renderSectionHeader={renderSectionHeader}
        refreshControl={
          <RefreshControl 
            refreshing={isRefreshing}
            onRefresh={refreshStocks}
          />
        }
      />

      {/* Add Stock Modal */}
      <Modal 
        visible={isAddStockModalVisible}
        animationType="slide"
      >
        <View>
          <TextInput
            placeholder="Nome da Ação"
            value={stockSearchQuery}
            onChangeText={setStockSearchQuery}
          />
          <TouchableOpacity onPress={searchStock}>
            <Text>🔍</Text>
          </TouchableOpacity>

          {isSearching && <ActivityIndicator />}

          {searchResults.map(stock => (
            <TouchableOpacity 
              key={stock.code}
              onPress={() => addStockToSection(stock, currentSectionForAddingStock)}
            >
              <Text>{stock.code}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

export default StockScreen;