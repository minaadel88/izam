"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { fetchNavigation, updateNavigation, trackNavChange } from "@/lib/api";
import { toast } from "sonner";
import Image from "next/image";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  visible: boolean;
}

interface SortableItemProps {
  item: NavItem;
  isEditMode: boolean;
  onVisibilityToggle: (id: string) => void;
  onLabelChange: (id: string, newLabel: string) => void;
}

function SortableItem({ item, isEditMode, onVisibilityToggle, onLabelChange }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(item.label);

  const style = transform ? {
    transform: CSS.Transform.toString(transform),
    transition,
  } : undefined;

  useEffect(() => {
    setLabel(item.label);
  }, [item.label]);

  const handleDoubleClick = () => {
    if (isEditMode && !isEditing) {
      setIsEditing(true);
    }
  };

  const handleLabelSave = () => {
    if (label !== item.label) {
      onLabelChange(item.id, label);
    }
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "flex items-center gap-3 px-4 py-3 transition-colors",
        "hover:bg-gray-100",
        !item.visible && "opacity-50",
        "cursor-pointer"
      )}
      onDoubleClick={handleDoubleClick}
    >
      {isEditMode && (
        <div {...listeners} className="cursor-grab">
          <span className="text-gray-400">⋮⋮</span>
        </div>
      )}

      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="h-8 py-1"
            autoFocus
            onBlur={handleLabelSave}
            onKeyDown={(e) => e.key === 'Enter' && handleLabelSave()}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center gap-2">
          <span className="text-[15px]">{item.label}</span>
        </div>
      )}

      {isEditMode && !isEditing && (
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-gray-600"
          >
            <span>✎</span>
          </button>
          <button
            onClick={() => onVisibilityToggle(item.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            {item.visible ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
      )}
    </div>
  );
}

interface DashboardNavProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
}

export function DashboardNav({ isOpen, setIsOpen, isEditMode, setIsEditMode }: DashboardNavProps) {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [originalItems, setOriginalItems] = useState<NavItem[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const loadNavigation = async () => {
      const data = await fetchNavigation();
      if (data && typeof data === 'object' && 'items' in data) {
        setNavItems((data as { items: NavItem[] }).items);
        setOriginalItems((data as { items: NavItem[] }).items);
      }
    };
    loadNavigation();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = navItems.findIndex((item) => item.id === active.id);
      const newIndex = navItems.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(navItems, oldIndex, newIndex);
      setNavItems(newItems);

      await trackNavChange({
        id: active.id as string,
        from: oldIndex,
        to: newIndex,
      });
    }
  };

  const handleVisibilityToggle = (id: string) => {
    setNavItems(items =>
      items.map(item =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const handleLabelChange = (id: string, newLabel: string) => {
    setNavItems(items =>
      items.map(item =>
        item.id === id ? { ...item, label: newLabel } : item
      )
    );
  };

  const handleSave = async () => {
    try {
      await updateNavigation(navItems);
      setOriginalItems(navItems);
      setIsEditMode(false);
      toast.success("Navigation changes saved successfully");
    } catch (error) {
      toast.error("Failed to save navigation changes");
    }
  };

  const handleCancel = () => {
    setNavItems(originalItems);
    setIsEditMode(false);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static inset-y-0 right-0 z-50 w-full max-w-xs bg-white transform transition-transform duration-300 ease-in-out shadow-lg",
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-medium">Menu</h2>
          <div className="flex gap-2">
            {isEditMode ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  className="text-red-500 hover:text-red-600"
                >
                  ✕
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSave}
                  className="text-green-500 hover:text-green-600"
                >
                  ✓
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditMode(true)}
                className="text-gray-500 hover:text-gray-600"
              >
                ⚙️
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-65px)]">
          <div className="py-2">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={navItems}
                strategy={verticalListSortingStrategy}
              >
                {navItems.map((item) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    isEditMode={isEditMode}
                    onVisibilityToggle={handleVisibilityToggle}
                    onLabelChange={handleLabelChange}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </ScrollArea>
      </div>

      {/* Mobile Menu Button */}
      <div className="absolute top-60 right-4">
    <Button
      variant="outline"
      size="icon"
      onClick={() => setIsOpen(!isOpen)}
      className="bg-white text-gray-500 hover:text-gray-600 shadow-md"
    >
      ☰
    </Button>
</div>
     
     
    </>
  );
}
