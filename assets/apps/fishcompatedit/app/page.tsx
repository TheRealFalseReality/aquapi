'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';

// --- TYPES ---
interface Fish {
  id: string;
  name: string;
  latinName?: string;
  imageURL?: string;
  compatible: string[];
  caution: string[];
  notCompatible: string[];
}

interface RawFish {
  name: string;
  latinName?: string;
  imageURL?: string;
  compatible?: string[];
  withCaution?: string[];
  notCompatible?: string[];
}

// --- ICONS ---
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);
const RightArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);
const LeftArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 4.293a1 1 0 010 1.414L5.414 10l4.293 4.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.07.022A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.022-1.07z" clipRule="evenodd" />
    </svg>
);
const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
    </svg>
);
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);
const ClipboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
    </svg>
);
const UpArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
);


// --- CONSTANTS ---
const DATA_URL = 'https://raw.githubusercontent.com/TheRealFalseReality/aquapi/refs/heads/main/assets/data/fishcompat.json';

// --- HELPER FUNCTIONS ---
const createId = (name: string): string => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- PROPS INTERFACES ---
interface AlphabetScrollerProps {
  letters: string[];
  onLetterClick: (letter: string) => void;
  onScrollToTop: () => void;
}
interface CustomModalProps {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  showConfirm?: boolean;
}
interface FishCardProps {
  fish: Fish;
  onEdit: (fish: Fish) => void;
  onDelete: (id: string, name: string) => void;
}
interface AddFishModalProps {
  onSave: (name: string, latinName: string, imageURL: string, waterType: string) => void;
  onClose: () => void;
  activeTab: string;
}
interface CompatibilityFormModalProps {
  fishData: Fish;
  freshwaterFish: Fish[];
  saltwaterFish: Fish[];
  activeTab: string;
  onSave: (originalFish: Fish, updatedFish: Fish) => void;
  onClose: () => void;
}
interface JsonViewerModalProps {
  jsonString: string;
  onClose: () => void;
  onDownload: () => void;
}
interface ListComponentProps {
    title: string;
    list: string[];
    listName: string;
    onClick: (item: string, listName: string) => void;
    isSelected: (item: string) => boolean;
    headerClass: string;
}

// --- UI COMPONENTS ---
const AlphabetScroller = ({ letters, onLetterClick, onScrollToTop }: AlphabetScrollerProps) => {
    return (
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 flex flex-col items-center bg-gray-900 bg-opacity-50 p-2 rounded-l-lg backdrop-blur-sm h-auto max-h-[80vh] justify-around">
            <button
                onClick={onScrollToTop}
                className="text-white text-xs font-bold p-1 w-6 h-6 flex items-center justify-center hover:bg-blue-600 rounded-full transition-colors duration-200 mb-1"
                title="Scroll to Top"
            >
                <UpArrowIcon />
            </button>
            {letters.map(letter => (
                <button
                    key={letter}
                    onClick={() => onLetterClick(letter)}
                    className="text-white text-xs font-bold p-1 w-6 h-6 flex items-center justify-center hover:bg-blue-600 rounded-full transition-colors duration-200"
                >
                    {letter}
                </button>
            ))}
        </div>
    );
};

const CustomModal = ({ title, message, onClose, onConfirm, showConfirm = false }: CustomModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-gray-800 text-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-auto animate-fade-in-down">
                <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2 text-yellow-300">{title}</h3>
                <p className="text-gray-300 mb-6">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md">Close</button>
                    {showConfirm && (
                        <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md">Confirm</button>
                    )}
                </div>
            </div>
        </div>
    );
};

const FishCard = ({ fish, onEdit, onDelete }: FishCardProps) => {
    const renderList = (items: string[]) => (
        <ul className="list-disc list-inside text-gray-300 text-sm mt-1 space-y-1">
            {items && items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    );

    return (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out">
            {fish.imageURL && (
                <img 
                    src={fish.imageURL} 
                    alt={fish.name} 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; 
                        target.src='https://placehold.co/600x400/1F2937/7C8A9E?text=Image+Not+Found'; 
                    }}
                />
            )}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-2xl font-bold text-yellow-400 mb-1">{fish.name}</h4>
                    {fish.latinName && <p className="text-sm italic text-gray-400 mr-2">{fish.latinName}</p>}
                </div>
                <div className="flex space-x-2">
                    <button onClick={() => onEdit(fish)} className="p-2 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 transition duration-300 ease-in-out transform hover:scale-110 shadow-md" title="Edit Fish"><EditIcon /></button>
                    <button onClick={() => onDelete(fish.id, fish.name)} className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-110 shadow-md" title="Delete"><DeleteIcon /></button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left flex-grow">
                <div><h5 className="font-semibold text-green-400 mb-1">Compatible</h5>{renderList(fish.compatible)}</div>
                <div><h5 className="font-semibold text-yellow-400 mb-1">With Caution</h5>{renderList(fish.caution)}</div>
                <div><h5 className="font-semibold text-red-400 mb-1">Not Compatible</h5>{renderList(fish.notCompatible)}</div>
            </div>
        </div>
    );
};

const AddFishModal = ({ onSave, onClose, activeTab }: AddFishModalProps) => {
    const [name, setName] = useState('');
    const [latinName, setLatinName] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [waterType, setWaterType] = useState(activeTab);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name.trim()) {
            alert("Please fill out the fish name.");
            return;
        }
        onSave(name.trim(), latinName.trim(), imageURL.trim(), waterType);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-gray-800 text-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto">
                <div className="flex justify-between items-center mb-6 border-b border-gray-600 pb-3">
                    <h3 className="text-2xl font-bold text-yellow-300">Add a New Fish</h3>
                    <button onClick={onClose} className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition" title="Close"><CloseIcon /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Water Type</label>
                        <div className="flex space-x-2 p-1 bg-gray-900 rounded-full shadow-inner w-full">
                            <button type="button" onClick={() => setWaterType('freshwater')} className={`w-1/2 px-5 py-2 rounded-full font-semibold transition-all duration-300 ${waterType === 'freshwater' ? 'bg-blue-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:text-white'}`}>Freshwater</button>
                            <button type="button" onClick={() => setWaterType('saltwater')} className={`w-1/2 px-5 py-2 rounded-full font-semibold transition-all duration-300 ${waterType === 'saltwater' ? 'bg-blue-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:text-white'}`}>Saltwater</button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="fish-name" className="block text-sm font-medium text-gray-300 mb-2">Fish Name</label>
                        <input id="fish-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="e.g., Neon Tetra" required />
                    </div>
                    <div>
                        <label htmlFor="latin-name" className="block text-sm font-medium text-gray-300 mb-2">Latin Name (Optional)</label>
                        <input id="latin-name" type="text" value={latinName} onChange={(e) => setLatinName(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="e.g., Paracheirodon innesi" />
                    </div>
                     <div>
                        <label htmlFor="image-url" className="block text-sm font-medium text-gray-300 mb-2">Image URL (Optional)</label>
                        <input id="image-url" type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="https://example.com/image.jpg" />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition transform hover:scale-105 shadow-md">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-md">Save and Edit Compatibility</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const CompatibilityFormModal = ({ fishData, freshwaterFish, saltwaterFish, activeTab, onSave, onClose }: CompatibilityFormModalProps) => {
    const allCurrentWaterTypeFishNames = (activeTab === 'freshwater' ? freshwaterFish : saltwaterFish).map(f => f.name);
    const allOtherFish = allCurrentWaterTypeFishNames.filter(name => name !== fishData.name);
    
    const [name, setName] = useState(fishData?.name || '');
    const [latinName, setLatinName] = useState(fishData?.latinName || '');
    const [imageURL, setImageURL] = useState(fishData?.imageURL || '');
    const [lists, setLists] = useState(() => {
        const initialCompatible = new Set(fishData?.compatible || []);
        const initialCaution = new Set(fishData?.caution || []);
        const initialNotCompatible = new Set(fishData?.notCompatible || []);
        const available = allOtherFish.filter(name => !initialCompatible.has(name) && !initialCaution.has(name) && !initialNotCompatible.has(name)).sort();
        return { available, compatible: Array.from(initialCompatible).sort(), caution: Array.from(initialCaution).sort(), notCompatible: Array.from(initialNotCompatible).sort() };
    });

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectedList, setSelectedList] = useState<string | null>(null);
    const [modalInfo, setModalInfo] = useState({ title: '', message: '', show: false });

    const handleItemClick = (item: string, listName: string) => {
        setSelectedList(listName);
        if (listName === 'available') {
            setSelectedItems(prev => 
                prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
            );
        } else {
            setSelectedItems(prev => 
                prev.length === 1 && prev[0] === item ? [] : [item]
            );
        }
    };

    const handleMove = (fromList: string | null, toList: string) => {
        if (selectedItems.length === 0 || selectedList !== fromList) return;
        const newFromList = lists[fromList as keyof typeof lists].filter((item: string) => !selectedItems.includes(item));
        const newToList = [...lists[toList as keyof typeof lists], ...selectedItems].sort();
        setLists(prevLists => ({ ...prevLists, [fromList as string]: newFromList, [toList]: newToList }));
        setSelectedItems([]);
        setSelectedList(null);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name.trim()) {
            setModalInfo({ title: 'Invalid Name', message: 'Fish name cannot be empty.', show: true });
            return;
        }
        if (lists.available.length > 0) {
            setModalInfo({ title: 'Incomplete Assignment', message: 'Please assign all available fish to a compatibility category before saving.', show: true });
            return;
        }
        const updatedFish: Fish = { 
            ...fishData, 
            name: name.trim(),
            latinName: latinName.trim(),
            imageURL: imageURL.trim(),
            compatible: lists.compatible, 
            caution: lists.caution, 
            notCompatible: lists.notCompatible 
        };
        onSave(fishData, updatedFish);
        onClose();
    };

    const ListComponent = ({ title, list, listName, onClick, isSelected, headerClass }: ListComponentProps) => (
        <div className="bg-gray-700 rounded-lg p-4 shadow-inner flex flex-col h-full min-h-[300px]">
            <h4 className={`text-lg font-bold mb-2 pb-1 border-b ${headerClass}`}>{title}</h4>
            <ul className="flex-grow overflow-y-auto space-y-1 pr-2">
                {list.map(item => (
                    <li key={item} onClick={() => onClick(item, listName)} className={`p-2 rounded-lg cursor-pointer transition-colors duration-200 ease-in-out ${isSelected(item) ? 'bg-blue-600 text-white font-semibold shadow-md' : 'hover:bg-gray-600'}`}>{item}</li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-gray-800 text-white rounded-2xl shadow-2xl p-8 max-w-7xl w-full mx-auto overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6 border-b border-gray-600 pb-3">
                    <h3 className="text-3xl font-bold text-yellow-300">Edit Data for {fishData.name}</h3>
                    <button onClick={onClose} className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition" title="Close"><CloseIcon /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="edit-fish-name" className="block text-sm font-medium text-gray-300 mb-2">Fish Name</label>
                            <input id="edit-fish-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required />
                        </div>
                        <div>
                            <label htmlFor="edit-latin-name" className="block text-sm font-medium text-gray-300 mb-2">Latin Name</label>
                            <input id="edit-latin-name" type="text" value={latinName} onChange={(e) => setLatinName(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="Leave blank to remove" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="edit-image-url" className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                        <input id="edit-image-url" type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="Leave blank to remove" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        <div className="lg:col-span-3"><ListComponent title="Available Fish" list={lists.available} listName="available" onClick={handleItemClick} isSelected={(item) => selectedList === 'available' && selectedItems.includes(item)} headerClass="border-gray-500" /></div>
                        <div className="lg:col-span-1 flex flex-row lg:flex-col items-center justify-center gap-2">
                           <button type="button" onClick={() => handleMove(selectedList, 'available')} className="p-3 bg-gray-600 rounded-full text-white hover:bg-gray-700" title="Move to Available"><LeftArrowIcon /></button>
                           <button type="button" onClick={() => handleMove('available', 'compatible')} className="p-3 bg-green-600 rounded-full text-white hover:bg-green-700" title="Move to Compatible"><RightArrowIcon /></button>
                           <button type="button" onClick={() => handleMove('available', 'caution')} className="p-3 bg-yellow-600 rounded-full text-white hover:bg-yellow-700" title="Move to With Caution"><RightArrowIcon /></button>
                           <button type="button" onClick={() => handleMove('available', 'notCompatible')} className="p-3 bg-red-600 rounded-full text-white hover:bg-red-700" title="Move to Not Compatible"><RightArrowIcon /></button>
                        </div>
                        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <ListComponent title="Compatible" list={lists.compatible} listName="compatible" onClick={handleItemClick} isSelected={(item) => selectedList === 'compatible' && selectedItems.includes(item)} headerClass="text-green-400 border-green-800" />
                            <ListComponent title="With Caution" list={lists.caution} listName="caution" onClick={handleItemClick} isSelected={(item) => selectedList === 'caution' && selectedItems.includes(item)} headerClass="text-yellow-400 border-yellow-800" />
                            <ListComponent title="Not Compatible" list={lists.notCompatible} listName="notCompatible" onClick={handleItemClick} isSelected={(item) => selectedList === 'notCompatible' && selectedItems.includes(item)} headerClass="text-red-400 border-red-800" />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition transform hover:scale-105 shadow-md">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-md">Save Changes</button>
                    </div>
                </form>
            </div>
            {modalInfo.show && (<CustomModal title={modalInfo.title} message={modalInfo.message} onClose={() => setModalInfo({ ...modalInfo, show: false })} />)}
        </div>
    );
};

const JsonViewerModal = ({ jsonString, onClose, onDownload }: JsonViewerModalProps) => {
    const [copyStatus, setCopyStatus] = useState('Copy');

    const handleCopy = () => {
        const textArea = document.createElement('textarea');
        textArea.value = jsonString;
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setCopyStatus('Copied!');
            setTimeout(() => setCopyStatus('Copy'), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            setCopyStatus('Failed!');
            setTimeout(() => setCopyStatus('Copy'), 2000);
        }
        document.body.removeChild(textArea);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 animate-fade-in">
            <div className="bg-gray-800 text-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full mx-auto flex flex-col max-h-[85vh]">
                <div className="flex justify-between items-center mb-4 border-b border-gray-600 pb-3">
                    <h3 className="text-2xl font-bold text-yellow-300">Generated JSON Data</h3>
                    <button onClick={onClose} className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition" title="Close"><CloseIcon /></button>
                </div>
                <pre className="flex-grow bg-gray-900 p-4 rounded-lg overflow-auto text-sm">
                    <code>{jsonString}</code>
                </pre>
                <div className="flex justify-end space-x-3 mt-6">
                    <button onClick={onClose} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition transform hover:scale-105 shadow-md">Close</button>
                    <button onClick={handleCopy} className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-md">
                        <ClipboardIcon />
                        <span>{copyStatus}</span>
                    </button>
                    <button onClick={onDownload} className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition transform hover:scale-105 shadow-md">
                        <DownloadIcon />
                        <span>Download</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---
export default function App() {
    const [freshwaterFish, setFreshwaterFish] = useState<Fish[]>([]);
    const [saltwaterFish, setSaltwaterFish] = useState<Fish[]>([]);
    const [activeTab, setActiveTab] = useState('freshwater');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCompatibilityModal, setShowCompatibilityModal] = useState(false);
    const [showAddFishModal, setShowAddFishModal] = useState(false);
    const [showRefreshModal, setShowRefreshModal] = useState(false);
    const [showJsonViewer, setShowJsonViewer] = useState(false);
    const [generatedJson, setGeneratedJson] = useState('');
    const [currentFish, setCurrentFish] = useState<Fish | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [fishToDelete, setFishToDelete] = useState<{id: string, name: string} | null>(null);
    const [modalInfo, setModalInfo] = useState({ title: '', message: '', show: false });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const letterRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

    const processFishArray = (fishArray: RawFish[]): Fish[] => fishArray.map(fish => ({ id: createId(fish.name), name: fish.name, latinName: fish.latinName, imageURL: fish.imageURL, compatible: fish.compatible || [], caution: fish.withCaution || [], notCompatible: fish.notCompatible || [] }));

    useEffect(() => {
        const fetchFishData = async () => {
          try {
            const response = await fetch(DATA_URL);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setFreshwaterFish(processFishArray(data.freshwater || []).sort((a, b) => a.name.localeCompare(b.name)));
            setSaltwaterFish(processFishArray(data.marine || []).sort((a, b) => a.name.localeCompare(b.name)));
          } catch (e: any) {
            setError(`Failed to fetch fish data: ${e.message}`);
            console.error("Failed to fetch fish data:", e);
          } finally {
            setLoading(false);
          }
        };
    
        fetchFishData();
      }, []);

    // --- DATA HANDLING ---
    const handleSaveNewFish = (name: string, latinName: string, imageURL: string, waterType: string) => {
        const newFish: Fish = { 
            id: createId(name), 
            name, 
            latinName,
            imageURL,
            compatible: [], 
            caution: [], 
            notCompatible: [] 
        };

        const updateList = (list: Fish[]) => [...list, newFish].sort((a, b) => a.name.localeCompare(b.name));

        if (waterType === 'freshwater') {
            setFreshwaterFish(updateList);
        } else {
            setSaltwaterFish(updateList);
        }

        setShowAddFishModal(false);
        setActiveTab(waterType);
        setCurrentFish(newFish);
        setShowCompatibilityModal(true);
    };

    const handleSaveCompatibility = (originalFish: Fish, updatedFishData: Fish) => {
        const oldName = originalFish.name;
        const newName = updatedFishData.name;
        
        const updateFishList = (fishList: Fish[]) => {
            let list = fishList.filter(f => f.id !== originalFish.id);
            list.push(updatedFishData);

            if (oldName !== newName) {
                list = list.map(fish => {
                    const newCompatible = fish.compatible.map(name => name === oldName ? newName : name).sort();
                    const newCaution = fish.caution.map(name => name === oldName ? newName : name).sort();
                    const newNotCompatible = fish.notCompatible.map(name => name === oldName ? newName : name).sort();
                    return { ...fish, compatible: newCompatible, caution: newCaution, notCompatible: newNotCompatible };
                });
            }
            return list.sort((a, b) => a.name.localeCompare(b.name));
        };

        if (activeTab === 'freshwater') {
            setFreshwaterFish(updateFishList);
        } else {
            setSaltwaterFish(updateFishList);
        }
        setShowCompatibilityModal(false);
    };

    const handleDeleteClick = (fishId: string, fishName: string) => { setFishToDelete({ id: fishId, name: fishName }); setShowDeleteModal(true); };
    
    const confirmDelete = () => {
        if (!fishToDelete) return;

        const updateFishList = (fishList: Fish[]) => {
            let list = fishList.filter(f => f.id !== fishToDelete.id);
            list = list.map(fish => ({
                ...fish,
                compatible: fish.compatible.filter(name => name !== fishToDelete.name),
                caution: fish.caution.filter(name => name !== fishToDelete.name),
                notCompatible: fish.notCompatible.filter(name => name !== fishToDelete.name),
            }));
            return list;
        };
        
        if (activeTab === 'freshwater') {
            setFreshwaterFish(updateFishList);
        } else {
            setSaltwaterFish(updateFishList);
        }

        setShowDeleteModal(false);
        setFishToDelete(null);
    };
    
    const handleRefreshFromUrl = async () => {
        setLoading(true);
        try {
            const response = await fetch(DATA_URL);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setFreshwaterFish(processFishArray(data.freshwater || []).sort((a, b) => a.name.localeCompare(b.name)));
            setSaltwaterFish(processFishArray(data.marine || []).sort((a, b) => a.name.localeCompare(b.name)));
            setModalInfo({ title: 'Success', message: 'Data refreshed from URL!', show: true });
        } catch (error: any) {
            setError(`Failed to refresh data: ${error.message}`);
            console.error("Failed to refresh data:", error);
        } finally {
            setLoading(false);
            setShowRefreshModal(false);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const data = JSON.parse(text);
                setFreshwaterFish(processFishArray(data.freshwater || []).sort((a, b) => a.name.localeCompare(b.name)));
                setSaltwaterFish(processFishArray(data.marine || []).sort((a, b) => a.name.localeCompare(b.name)));
                setModalInfo({ title: 'Success', message: 'Data loaded from file!', show: true });
            } catch (error: any) {
                setError(`Failed to parse file: ${error.message}`);
                console.error("Failed to parse file:", error);
            }
        };
        reader.readAsText(file);
    };

    const handleViewJson = () => {
        const formatForExport = (fishArray: Fish[]) => {
            return fishArray.map(fish => {
                const { id, caution, ...rest } = fish;
                const newFish: any = { ...rest, withCaution: caution };
                if (!newFish.latinName) delete newFish.latinName;
                if (!newFish.imageURL) delete newFish.imageURL;
                return newFish;
            });
        };
        const jsonData = { freshwater: formatForExport(freshwaterFish), marine: formatForExport(saltwaterFish) };
        setGeneratedJson(JSON.stringify(jsonData, null, 2));
        setShowJsonViewer(true);
    };

    const handleDownloadJson = () => {
        const blob = new Blob([generatedJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'fishcompat.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleLetterClick = (letter: string) => {
        letterRefs.current[letter]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };
    
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const availableLetters = useMemo(() => {
        const currentList = activeTab === 'freshwater' ? freshwaterFish : saltwaterFish;
        const letters = new Set(currentList.map(fish => fish.name.charAt(0).toUpperCase()));
        return Array.from(letters).sort();
    }, [activeTab, freshwaterFish, saltwaterFish]);

    const renderFishList = (fishList: Fish[]) => {
        if (error) return <div className="text-center text-red-400 text-lg py-10">{error}</div>;
        if (fishList.length === 0 && !loading) return <div className="text-center text-gray-400 text-lg py-10">No fish data available.</div>;
        
        let lastLetter = '';

        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {fishList.map(fish => {
                    const firstLetter = fish.name.charAt(0).toUpperCase();
                    const isNewLetter = firstLetter !== lastLetter;
                    if (isNewLetter) {
                        lastLetter = firstLetter;
                    }
                    return (
                        <div key={fish.id} ref={isNewLetter ? (el) => { letterRefs.current[firstLetter] = el; } : null}>
                            <FishCard
                                fish={fish}
                                onEdit={(fish) => { setCurrentFish(fish); setShowCompatibilityModal(true); }}
                                onDelete={handleDeleteClick}
                            />
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans p-6 lg:p-10 pr-12 lg:pr-16">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap'); body { font-family: 'Inter', sans-serif; } .animate-fade-in-down { animation: fadeInDown 0.5s ease-out; } .animate-fade-in { animation: fadeIn 0.3s ease-out; } @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
            
            <AlphabetScroller letters={availableLetters} onLetterClick={handleLetterClick} onScrollToTop={handleScrollToTop} />

            <div className="container mx-auto">
                <header className="text-center mb-6">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-2">Aquarium Compatibility Guide</h1>
                    <p className="text-lg text-gray-400">Manage your fish compatibility data.</p>
                </header>

                <div className="bg-gray-800 rounded-3xl p-4 lg:p-6 shadow-2xl mb-8 border border-gray-700">
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                        <div className="flex space-x-2 p-1 bg-gray-900 rounded-full shadow-inner">
                            <button onClick={() => setActiveTab('freshwater')} className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${activeTab === 'freshwater' ? 'bg-blue-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:text-white'}`}>Freshwater Fish</button>
                            <button onClick={() => setActiveTab('saltwater')} className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${activeTab === 'saltwater' ? 'bg-blue-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:text-white'}`}>Saltwater Fish</button>
                        </div>
                        <div className="flex items-center flex-wrap gap-2">
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
                            <button onClick={() => fileInputRef.current?.click()} className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"><UploadIcon /><span>Load from File</span></button>
                            <button onClick={handleViewJson} className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white font-semibold rounded-full shadow-lg hover:bg-teal-700 transition transform hover:scale-105"><EyeIcon /><span>View/Export JSON</span></button>
                            <button onClick={() => setShowRefreshModal(true)} className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 transition transform hover:scale-105"><RefreshIcon /><span>Refresh from URL</span></button>
                            <button onClick={() => setShowAddFishModal(true)} className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition transform hover:scale-105"><PlusIcon /><span>Add New Fish</span></button>
                        </div>
                    </div>
                    {loading ? <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div></div> : renderFishList(activeTab === 'freshwater' ? freshwaterFish : saltwaterFish)}
                </div>
            </div>

            <footer className="text-center text-gray-600 text-xs py-4">
                <p>Version 25.8.1</p>
            </footer>

            {/* Modals */}
            {showAddFishModal && <AddFishModal onSave={handleSaveNewFish} onClose={() => setShowAddFishModal(false)} activeTab={activeTab} />}
            {showCompatibilityModal && currentFish && <CompatibilityFormModal fishData={currentFish} onSave={handleSaveCompatibility} onClose={() => setShowCompatibilityModal(false)} freshwaterFish={freshwaterFish} saltwaterFish={saltwaterFish} activeTab={activeTab} />}
            {showDeleteModal && fishToDelete && <CustomModal title="Confirm Deletion" message={`Are you sure you want to delete "${fishToDelete.name}"? This action and all its references cannot be undone.`} onClose={() => setShowDeleteModal(false)} onConfirm={confirmDelete} showConfirm={true} />}
            {showRefreshModal && <CustomModal title="Confirm Refresh" message="Are you sure you want to refresh the data from the source URL? This will overwrite all local changes." onClose={() => setShowRefreshModal(false)} onConfirm={handleRefreshFromUrl} showConfirm={true} />}
            {modalInfo.show && <CustomModal title={modalInfo.title} message={modalInfo.message} onClose={() => setModalInfo({ ...modalInfo, show: false })} />}
            {showJsonViewer && <JsonViewerModal jsonString={generatedJson} onClose={() => setShowJsonViewer(false)} onDownload={handleDownloadJson} />}
        </div>
    );
}
