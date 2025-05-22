import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import p1 from '../assets/p1.png';

// DraggableItem: Represents a draggable item using dnd-kit
const DraggableItem = ({ id, image }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : 'none',
        transition: transform ? 'none' : 'transform 200ms ease',
        touchAction: 'none',
        zIndex: transform ? 100 : 'auto',
        userSelect: 'none',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className='select-none flex flex-col items-center justify-center w-full h-[90px] rounded-xl bg-gradient-to-b to-[#222327] from-[#62646a]'
        >
            <img src={image} alt='' className='h-20 pointer-events-none' />
        </div>
    );
};

// DroppableZone: Defines a droppable area where items can be dragged into
const DroppableZone = ({ id, children, className }) => {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`${className} ${isOver ? 'border-2 border-green-400' : ''}`}
        >
            {children}
        </div>
    );
};

// Main Table component with inventory and crafting table logic
export const Table = () => {
    // Initialize 9 inventory items with IDs like item-1, item-2, ...
    const initialInventory = Array.from({ length: 9 }, (_, i) => `item-${i + 1}`);

    const [inventoryItems, setInventoryItems] = useState(initialInventory);
    const [craftingItems, setCraftingItems] = useState(["items-99999", "items-99999"]);
    const [nextItemId, setNextItemId] = useState(10);

    // Add a new item to the inventory with a unique ID
    const addNewInventoryItem = () => {
        const newItemId = `item-${nextItemId}`;
        setInventoryItems(prev => [...prev, newItemId]);
        setNextItemId(prev => prev + 1);
    };

    // Handle drag end logic — move items between inventory and crafting table
    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        const sourceId = active.id;
        const targetZone = over.id;

        // Move from inventory → crafting table
        if (
            targetZone === 'crafting-dropzone' &&
            inventoryItems.includes(sourceId) &&
            !craftingItems.includes(sourceId)
        ) {
            setInventoryItems(prev => prev.filter(item => item !== sourceId));
            setCraftingItems(prev => [...prev, sourceId]);
        }

        // Move from crafting table → inventory
        if (
            targetZone === 'inventory-dropzone' &&
            craftingItems.includes(sourceId) &&
            !inventoryItems.includes(sourceId)
        ) {
            setCraftingItems(prev => prev.filter(item => item !== sourceId));
            setInventoryItems(prev => [...prev, sourceId]);
        }
    };

    return (
        <div className='mb:w-[40%] w-full'>

            {/* Inventory Header */}
            <div className='flex items-start sm:w-[80%] w-full rounded-lg'>
                <span>Inventory</span>
            </div>
            <div className='w-full h-[1px] bg-gradient-to-br to-[#040404] via-[#918d8d] from-[#0f0e0e] mt-4' />

            <DndContext onDragEnd={handleDragEnd}>
                {/* Inventory Grid or Empty State */}
                {inventoryItems.length !== 0 ? (
                    <div className='p-[1px] rounded-xl mt-4 bg-gradient-to-br w-full to-[#888585] via-[#1e1e1e] from-[#636363] text-white'>
                        <DroppableZone
                            id='inventory-dropzone'
                            className='grid grid-cols-3 gap-2 bg-gradient-to-br w-full to-[#0f0f0f] via-[#1e1e1e] from-[#2c2c2c] border-gray-700 rounded-xl p-2'
                        >
                            {inventoryItems.map(id => (
                                <DraggableItem key={id} id={id} image={p1} />
                            ))}
                        </DroppableZone>
                    </div>
                ) : (
                    // Show when inventory is empty
                    <div className='p-[1px] rounded-xl mt-4 bg-gradient-to-br to-[#888585] via-[#1e1e1e] from-[#636363] text-white'>
                        <div className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-br to-[#0f0f0f] via-[#1e1e1e] from-[#2c2c2c] border border-gray-700 p-6 min-h-[150px]">
                            <p className="text-gray-300 mb-4 text-sm">Your inventory is empty.</p>
                            <button
                                onClick={addNewInventoryItem}
                                className="px-4 py-2 text-sm font-medium text-white rounded-xl shadow-md transition-all duration-200"
                            >
                                Add Item
                            </button>
                        </div>
                    </div>
                )}

                {/* Crafting Table Header */}
                <div className='flex items-start w-[80%] rounded-lg mt-4'>
                    <span>Crafting Table</span>
                </div>
                <div className='w-full h-[1px] bg-gradient-to-br to-[#040404] via-[#918d8d] from-[#0f0e0e] mt-4' />

                {/* Crafting Grid */}
                <div className='p-[1px] rounded-xl mt-4 bg-gradient-to-br to-[#888585] via-[#1e1e1e] from-[#636363] text-white'>
                    <DroppableZone
                        id='crafting-dropzone'
                        className='grid grid-cols-3 gap-2 bg-gradient-to-br to-[#0f0f0f] via-[#1e1e1e] from-[#2c2c2c] border-gray-700 rounded-xl p-2'
                    >
                        {craftingItems.length === 0 ? (
                            <div className="flex items-center justify-center col-span-3 text-gray-400 italic select-none">
                                Drag from inventory
                            </div>
                        ) : (
                            craftingItems.map(id => (
                                <DraggableItem key={id} id={id} image={p1} />
                            ))
                        )}
                    </DroppableZone>
                </div>
            </DndContext>
        </div>
    );
};
